/**
 * dsh-skin-bubu — host half.
 *
 * The Bubu skin is a browser-side theme: all of its work (palette overrides,
 * the background wallpaper, and the background picker) happens in the client
 * entry (`client/client.js`). The host entry therefore only needs to exist so
 * the loader entry resolves; it has no configuration and does nothing.
 */
export const name = 'dsh-skin-bubu';

export function apply() {
  // Intentionally empty — the skin is applied entirely on the client.
}
