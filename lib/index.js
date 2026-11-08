/**
 * dsh-skin-bubu — host half.
 *
 * The skin itself is browser-side (see `client/client.js`). This host entry
 * adds one small housekeeping job for the recycle bin:
 *
 *   On application start, sessions that were archived (moved to the recycle
 *   bin) more than 7 days ago are removed for real — their session directory
 *   under `$DSH_HOME/sessions/<workspace>/<session-id>/` is deleted and the
 *   id is dropped from `$DSH_HOME/storages/workspace.json`.
 *
 * The first time an archived session is seen, its "archived at" date is
 * recorded in `$DSH_HOME/storages/bubu-recycle.json`; only that record is
 * used for the 7-day clock, so nothing can be deleted before it has lived in
 * the recycle bin for a full 7 days.
 *
 * If anything goes wrong the job logs and gives up; it never throws into the
 * loader and never touches non-archived sessions.
 */
import { readFileSync, writeFileSync, renameSync, existsSync, readdirSync, rmSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export const name = "dsh-skin-bubu";

const RETENTION_MS = 7 * 24 * 60 * 60 * 1000;
/** Wait for the session/workspace layers to finish their own startup reads. */
const START_DELAY_MS = (() => {
  const override = Number(process.env.DSH_BUBU_PURGE_DELAY);
  return Number.isFinite(override) ? override : 8000;
})();

function dshHome() {
  return process.env.DSH_HOME || join(homedir(), ".dsh");
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

function writeJsonAtomic(path, value) {
  const tmp = `${path}.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`;
  writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  renameSync(tmp, path);
}

function purge() {
  const home = dshHome();
  const workspaceFile = join(home, "storages", "workspace.json");
  const indexFile = join(home, "storages", "bubu-recycle.json");
  const sessionsRoot = join(home, "sessions");

  const workspace = readJson(workspaceFile);
  if (!workspace || typeof workspace !== "object") return;
  if (!workspace.global || typeof workspace.global !== "object") return;

  const archived = Array.isArray(workspace.global.archivedSessionIds)
    ? workspace.global.archivedSessionIds.filter((id) => typeof id === "string" && id)
    : [];
  if (archived.length === 0) return;

  const index = readJson(indexFile) || {};
  const now = Date.now();
  let indexChanged = false;

  // First sighting starts this session's 7-day recycle clock.
  for (const id of archived) {
    if (typeof index[id] !== "number") {
      index[id] = now;
      indexChanged = true;
    }
  }
  // Restored sessions leave the clock behind.
  for (const id of Object.keys(index)) {
    if (!archived.includes(id)) {
      delete index[id];
      indexChanged = true;
    }
  }

  const doomed = archived.filter((id) => now - (index[id] || now) >= RETENTION_MS);
  if (doomed.length === 0) {
    if (indexChanged) {
      try { mkdirSync(join(home, "storages"), { recursive: true }); writeJsonAtomic(indexFile, index); } catch {}
    }
    return;
  }

  // Snapshot the registry before rewriting it.
  try { copyFileSync(workspaceFile, `${workspaceFile}.bak-${now}`); } catch {}

  let dirsDeleted = 0;
  try {
    const workspaceDirs = existsSync(sessionsRoot)
      ? readdirSync(sessionsRoot, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => join(sessionsRoot, d.name))
      : [];
    for (const id of doomed) {
      for (const dir of workspaceDirs) {
        const target = join(dir, id);
        if (existsSync(target)) {
          try {
            rmSync(target, { recursive: true, force: true });
            dirsDeleted += 1;
          } catch (error) {
            console.warn(`[bubu-skin] could not delete ${target}:`, error?.message ?? error);
          }
        }
      }
      const at = workspace.global.archivedSessionIds.indexOf(id);
      if (at >= 0) workspace.global.archivedSessionIds.splice(at, 1);
      const tables = workspace.tables && workspace.tables.workspaces;
      if (tables) {
        for (const key of Object.keys(tables)) {
          const ids = tables[key] && tables[key].sessionIds;
          if (Array.isArray(ids)) {
            const at2 = ids.indexOf(id);
            if (at2 >= 0) ids.splice(at2, 1);
          }
        }
      }
      delete index[id];
    }
    writeJsonAtomic(workspaceFile, workspace);
    writeJsonAtomic(indexFile, index);
    console.log(`[bubu-skin] recycle bin: removed ${doomed.length} expired session(s), ${dirsDeleted} directory(ies)`);
  } catch (error) {
    console.warn("[bubu-skin] recycle purge failed:", error?.message ?? error);
  }
}

export function apply(ctx) {
  try {
    const timer = setTimeout(() => {
      try { purge(); } catch (error) { console.warn("[bubu-skin] purge error:", error?.message ?? error); }
    }, START_DELAY_MS);
    if (timer && typeof timer.unref === "function") timer.unref();
    if (ctx && typeof ctx.effect === "function") {
      ctx.effect(() => () => { try { clearTimeout(timer); } catch {} });
    }
  } catch (error) {
    console.warn("[bubu-skin] host init failed:", error?.message ?? error);
  }
}
