# FreeV6 Docs

FreeV6 官方文档网站，基于 [VitePress](https://vitepress.dev/) 构建，部署在 Vercel。

- FreeV6 仓库：[evansrrr/free-v6](https://github.com/evansrrr/free-v6)

## 本地开发

```bash
npm install      # 安装依赖
npm run dev      # 开发预览（热更新），默认端口 5173
npm run build    # 静态构建（先自动从 free-v6 拉取 about 文档）
npm run preview  # 预览构建，默认端口 4173
npm run sync     # 手动执行 about 文档拉取
```

构建同时会检查死链，链接失效会导致构建失败。

## 版本信息

构建时通过抓取最新 Release 的 `version.json`，生成下载按钮、版本号与 SHA256。
抓取失败回退 [config.mts](./docs/.vitepress/config.mts) 中 `fallback`

## 部署到 Vercel

- 构建命令: `npm run build`
- 输出目录: `docs/.vitepress/dist`

`main` 分支推送会自动触发构建部署

free-v6 每次发布 Release 后，会经 Vercel Deploy Hook 自动触发本项目重建部署，
下载链接与版本号随最新版本自动更新（见 free-v6 仓库 `.github/workflows/docs-deploy.yml`，
需在 Vercel 面板创建 Deploy Hook 并存入该仓库的 `DOCS_DEPLOY_HOOK` secret）。

## 维护提示

- 新增/调整页面时，同步更新 `docs/.vitepress/config.mts` 中的 `nav` 与 `sidebar`
- 主项目发版后，核对 `config.mts` 里的 `fallback` 版本信息
- 更新日志、用户协议、隐私政策每次构建时自动从 free-v6 仓库 `main` 分支拉取（`npm run sync` 可手动执行），无需手动同步

## 许可证

[MIT](./LICENSE)
