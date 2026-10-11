# 开发与贡献

FreeV6 与本文档站均开源在 GitHub，欢迎提 issue 和 PR。

## 主项目（free-v6）

### 环境要求

- Go 1.25+
- Rust stable
- 平台对应的 Tauri 系统依赖；Windows 还需要 Visual Studio C++ Build Tools

### 常用命令

```bash
# 构建 Go 辅助程序并启动开发模式（Tauri）
cargo tauri dev

# 打包安装包（与 CI 构建一致）
cargo tauri build
```

构建前会自动执行 `beforeBuildCommand`：编译 `freev6-helper` 并准备 GeoData（`GeoSite.dat`）。

### 发布流程

发布由 tag 触发，全流程在 [`.github/workflows/release.yml`](https://github.com/evansrrr/free-v6/blob/main/.github/workflows/release.yml) 中完成：

1. 递增 `src-tauri/tauri.conf.json` 与 `Cargo.toml` 的版本号；
2. 在 `CHANGELOG.md` 中新增对应版本小节（缺失会导致构建失败）；
3. 打 tag 并推送：`git tag vX.Y.Z && git push origin vX.Y.Z`；
4. 工作流构建安装包、写入 `version.json`、生成 SHA256 与构建来源证明，创建草稿 Release，人工确认后发布。

带 `-beta` / `-alpha` 后缀的 tag 会自动标记为 Pre-release。

## 文档站（本仓库）

基于 [VitePress](https://vitepress.dev/) 构建，内容全部为 Markdown。

```bash
npm install   # 安装依赖
npm run dev   # 本地预览（热更新）
npm run build # 构建到 docs/.vitepress/dist
npm run preview # 预览构建产物
```

### 目录结构

```text
docs/
├── .vitepress/
│   ├── config.mts        # 站点导航、侧边栏、搜索、版本信息
│   └── theme/            # 主题扩展（组件与样式）
├── guide/                # 使用指南
├── about/                # 协议、隐私政策、更新日志
├── download.md           # 下载页
└── index.md              # 首页
```

### 版本信息从哪来

构建时会通过 gh-proxy 抓取最新 Release 的 `version.json`（与客户端更新检测同一地址），用于下载页和首页的版本号、下载链接与 SHA256。抓取失败时回退到 `config.mts` 中的兜底值，**构建不依赖网络**。发版后建议顺手核对兜底值。

### 部署到 Vercel

1. 将仓库推送到 GitHub；
2. 在 [Vercel](https://vercel.com/new) 导入仓库，框架会被识别为 VitePress（`vercel.json` 已固定构建命令与输出目录）；
3. 之后每次推送 main 分支都会自动构建部署。

### 反馈

- 产品问题与建议：[free-v6 Issues](https://github.com/evansrrr/free-v6/issues)
- 文档错误：欢迎直接提 PR 修正

## 许可证

本项目采用 [MIT 许可](https://github.com/evansrrr/free-v6/blob/main/LICENSE)，第三方组件许可见主仓库的 `THIRD-PARTY.txt` 与 `LICENSES/`。
