<div align="center">

# 🐻 布布主题 · dsh-skin-bubu

**给 DeepSeek Harness 的可爱小熊「布布」液态玻璃皮肤**<br/>
浅色 / 深色 · 背景自由自定义 · 一键换配色

![version](https://img.shields.io/github/v/release/ruirui0701/dsh-skin-bubu?color=ff8a4c&label=version&style=flat-square)
![platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-4c9aff?style=flat-square)
![dsh](https://img.shields.io/badge/DeepSeek-Harness-7c5cff?style=flat-square)
![downloads](https://img.shields.io/github/downloads/ruirui0701/dsh-skin-bubu/total?color=22c55e&label=downloads&style=flat-square)
![license](https://img.shields.io/github/license/ruirui0701/dsh-skin-bubu?color=9b7fd4&label=license&style=flat-square)

🌐 **中文** ｜ [English](README.en.md)

[⬇️ 下载](https://github.com/ruirui0701/dsh-skin-bubu/releases/latest) ·
[🚀 快速开始](#-快速开始) ·
[✨ 功能](#-功能) ·
[❓ 常见问题](#-常见问题) ·
[📖 使用说明](#-使用说明)

</div>

---

<div align="center">
<img src="./preview-shot.png" width="880" alt="布布主题 · 浅色预览" />
<br/>
<img src="./preview-dark.png" width="880" alt="布布主题 · 深色预览" />
</div>

---

## ✨ 功能

- 🐻 **布布配色** — 奶油 / 焦糖 / 可可色系，浅色 + 深色，通过官方 `--dsw-alias-*` 主题层注入，不破坏原有组件。
- 🧊 **液态玻璃** — 整窗一层均匀磨砂；侧栏、主区、气泡、菜单、输入框都是半透亚克力，带极细淡光描边、大圆角、轻薄弥散阴影。
- 🐳→🐻 **鲸鱼变布布** — 品牌鲸鱼 Logo、侧栏小图标、新会话鲸鱼、生成中鲸鱼尾巴，全部换成布布头像。
- 🎨 **自定义背景** — 8 套渐变 + 纯色 + **上传自己的图片**（填满 / 完整 / 平铺，可调模糊 / 压暗）。
- 🎨 **主题色** — 焦糖 / 抹茶 / 樱花 / 海盐 / 葡萄。
- 🌗 **明暗** — 跟随系统 / 浅色 / 深色。
- 🐾 **布布水印** — 可开关、可调透明度。
- 💾 **自动记忆** — 设置保存在浏览器本地，刷新后依然生效。

## 🚀 快速开始

### 方式一：下载 Release（推荐）

1. 打开 [最新 Release](https://github.com/ruirui0701/dsh-skin-bubu/releases/latest) 下载 `dsh-skin-bubu-1.7.0.zip` 并解压；
2. 在 DeepSeek Harness 里把解压目录作为本地 bundle 安装：

```
plugin_manager install_bundle  target = <解压目录的绝对路径>
```

3. **刷新页面**（`Ctrl+R`，没变化用 `Ctrl+Shift+R`），右下角出现「布布主题」即成功。

### 方式二：npm（发布后）

```
dsh plugin --profile <profile> add @ruirui0701/dsh-skin-bubu
```

## 📖 使用说明

点右下角 **「布布主题」** 按钮打开面板：

| 分区 | 能做什么 |
| --- | --- |
| 背景 | 8 套渐变 / 纯色取色 / 上传自己的图片（填满·完整·平铺 + 模糊 + 压暗） |
| 主题色 | 焦糖 / 抹茶 / 樱花 / 海盐 / 葡萄，实时切换强调色 |
| 玻璃 | 通透度、磨砂强度，自由调节玻璃质感 |
| 明暗 | 跟随系统 / 浅色 / 深色 |
| 水印 | 布布水印开关 + 透明度 |
| 底部 | 恢复默认（设置自动保存） |

## ❓ 常见问题

- **安装后没变化？** 刷新页面；仍有缓存就 `Ctrl+Shift+R` 强制刷新。
- **玻璃不够透 / 太白？** 在面板「玻璃」里把「通透」调高、「磨砂」调低。
- **想用桌面壁纸？** 面板「背景 → 上传图片」选你喜欢的壁纸即可。
- **卸载？** 对 `dsh-skin-bubu` 执行 `remove_bundle`，或删除对应目录。

## 🧩 目录结构

```
client/client.js    浏览器端：配色 token 覆盖 + 玻璃层 + 选择面板
lib/index.js        Host 端（空实现）
cordis.patch.yml    插入 profile 的 bundle patch
assets/bubu.png     布布原图（client.js 内联）
```

## 📄 许可证

[MIT](./LICENSE)

<div align="center"><sub>Made with 🐻 for DeepSeek Harness</sub></div>
