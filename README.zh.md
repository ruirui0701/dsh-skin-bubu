# 布布主题 · dsh-skin-bubu

给 **DeepSeek Harness** 换上可爱小熊「布布」的**液态玻璃**皮肤，浅色 / 深色双版本，可自定义背景。

![预览](./preview-shot.png)

## 功能

- 🐻 **布布配色**：奶油 / 焦糖 / 可可色系，浅色 + 深色，通过官方 `--dsw-alias-*` 主题层注入，不破坏组件。
- 🧊 **液态玻璃**：整窗一层均匀磨砂，侧栏 / 主区 / 气泡 / 菜单 / 输入框半透亚克力，极细淡光描边、大圆角、轻薄弥散阴影。
- 🐳→🐻 **鲸鱼变布布**：品牌鲸鱼 Logo、侧栏小图标、新会话鲸鱼、生成中鲸鱼尾巴全部换成布布头像。
- 🎨 **自定义背景**：8 套渐变 + 纯色 + **上传自己的图片**（填满 / 完整 / 平铺，可调模糊 / 压暗）。
- 🎨 **主题色**：焦糖 / 抹茶 / 樱花 / 海盐 / 葡萄。
- 🌗 **明暗**：跟随系统 / 浅色 / 深色。
- 🐾 **布布水印**（可调透明度）。
- 💾 设置自动保存。

## 安装

### 通过 DeepSeek Harness 插件管理器
把本仓库作为本地 bundle 安装：

```
plugin_manager install_bundle  target = <本目录绝对路径>
```

或发布到 npm 后：

```
dsh plugin --profile <profile> add @ruirui0701/dsh-skin-bubu
```

安装后刷新页面即可，右下角出现「布布主题」。

## 使用

点右下角「布布主题」打开面板：换背景 / 主题色 / 通透度 / 磨砂 / 明暗 / 水印。

## 结构

```
client/client.js    浏览器端：配色 token 覆盖 + 玻璃层 + 选择面板
lib/index.js        Host 端（空实现）
cordis.patch.yml    插入 profile 的 bundle patch
assets/bubu.png     布布原图（client.js 内联）
```

## License

MIT
