# 开发与贡献

FreeV6 与文档站均开源在 GitHub，欢迎提 issue 和 PR。

## free-v6

### 环境要求

- Go 1.25+
- Rust stable
- 平台对应的 Tauri 系统依赖；Windows 还需要 Visual Studio C++ Build Tools

### 常用命令

```bash
# 构建 go-helper 并启动 Tauri 开发模式
cargo tauri dev

# 打包安装包
cargo tauri build
```

构建前自动执行 `beforeBuildCommand`：编译 `freev6-helper` 并准备 GeoData（`GeoSite.dat`）

### 发布流程

发布由 push tag 触发，全流程在 [`.github/workflows/release.yml`](https://github.com/evansrrr/free-v6/blob/main/.github/workflows/release.yml) 中完成：

1. 递增 `src-tauri/tauri.conf.json` 与 `Cargo.toml` 的版本号
2. 在 `CHANGELOG.md` 中新增对应版本小节（缺失会导致构建失败）
3. 打 tag 并推送：`git tag vX.Y.Z && git push origin vX.Y.Z`
4. 工作流构建安装包、写入 `version.json`、生成 SHA256 与构建来源证明，创建 Draft Release，手动确认发布

带 `-beta` / `-alpha` 后缀的 tag 会自动标记为 Pre-release

## freev6-docs

基于 [VitePress](https://vitepress.dev/) 构建，内容为 Markdown 格式

```bash
npm install   # 安装依赖
npm run dev   # 本地预览（热更新）
npm run build # 构建到 docs/.vitepress/dist
npm run preview # 预览构建产物
npm run sync  # 手动从 free-v6 拉取 about 文档（构建时自动执行）
```

### 目录结构

```text
scripts/
└── sync-about.mjs      # 构建时从 free-v6 拉取 about 文档
docs/
├── .vitepress/
│   ├── config.mts        # 站点导航、侧边栏、搜索、版本信息
│   └── theme/            # 主题扩展（组件与样式）
├── guide/                # 使用指南
├── about/                # 协议、隐私政策、更新日志
├── download.md           # 下载页
└── index.md              # 首页
```

## 版本信息

构建时通过抓取最新 Release 的 `version.json`，生成下载按钮、版本号与 SHA256。
抓取失败回退 `config.mts` 中 `fallback`

更新日志、用户协议、隐私政策（`docs/about/`）同样在每次构建时自动从 free-v6 仓库
`main` 分支拉取（`scripts/sync-about.mjs`），无需手动同步；拉取失败时保留仓库内
现有文件，构建不会中断。

## 部署到 Vercel

- 构建命令: `npm run build`
- 输出目录: `docs/.vitepress/dist`

`main` 分支推送会自动触发构建部署

### 反馈

- 问题与建议：[free-v6 Issues](https://github.com/evansrrr/free-v6/issues)
- 文档错误补充：直接提 PR

## 许可证

采用 [MIT 许可](https://github.com/evansrrr/free-v6/blob/main/LICENSE)，第三方组件许可见 free-v6  `THIRD-PARTY.txt` 与 `LICENSES/`。
