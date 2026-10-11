# FreeV6 文档站

FreeV6 官方文档网站，基于 [VitePress](https://vitepress.dev/) 构建，部署在 Vercel。

- 产品仓库：[evansrrr/free-v6](https://github.com/evansrrr/free-v6)
- 站点内容：[docs/](./docs)，全部为 Markdown

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 开发预览（热更新），默认 http://localhost:5173
npm run build    # 静态构建到 docs/.vitepress/dist
npm run preview  # 预览构建产物，默认 http://localhost:4173
```

构建同时会检查死链，链接失效会导致构建失败。

## 目录结构

```text
docs/
├── .vitepress/
│   ├── config.mts        # 导航、侧边栏、搜索、版本信息（含 gh-proxy 抓取）
│   └── theme/            # 主题扩展
│       ├── custom.css    # 设计令牌（对齐客户端 web/styles.css）
│       └── components/   # DownloadPanel（下载卡片）与版本数据 composable
├── guide/                # 指南：简介、下载安装、使用说明、常见问题
├── about/                # 用户协议、隐私政策、更新日志（来自主仓库）
├── download.md           # 下载页（加速链接 + SHA256）
├── develop.md            # 开发与贡献
└── public/               # logo 与 favicon
```

## 版本信息从哪来

构建时通过 `https://gh-proxy.com/` 抓取最新 Release 的 `version.json`
（与客户端更新检测同一地址），生成下载按钮、版本号与 SHA256。
抓取失败（离线、代理不可用）时回退到 [config.mts](./docs/.vitepress/config.mts)
中的 `fallback` 值，**构建不依赖网络**。主项目发版后建议顺手核对兜底值。

## 下载链接约定

大陆网络直连 GitHub Releases 较慢，站内所有安装包下载按钮统一使用加速前缀：

```text
https://gh-proxy.com/ + 任意 GitHub 地址
```

这也是 FreeV6 客户端内置的核心下载与更新通道，新增下载链接时请保持一致。

## 部署到 Vercel

1. 将本仓库推送到 GitHub；
2. 在 [Vercel](https://vercel.com/new) 导入仓库，[vercel.json](./vercel.json) 已固定
   framework、构建命令（`npm run build`）与输出目录（`docs/.vitepress/dist`）；
3. 之后每次推送 `main` 分支都会自动构建部署。

## 维护提示

- 新增/调整页面时，同步更新 `docs/.vitepress/config.mts` 中的 `nav` 与 `sidebar`；
- 主项目发版后，核对 `config.mts` 里的 `fallback` 版本信息；
- 更新日志、用户协议、隐私政策的正本来自主仓库，改版时同步拷贝到 `docs/about/`。

## 许可证

[MIT](./LICENSE)
