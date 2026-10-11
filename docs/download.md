# 下载 FreeV6

<DownloadPanel />

## 大陆网络加速（gh-proxy）

FreeV6 的安装包托管在 GitHub Releases。直连 GitHub 较慢或无法访问时，在任意 GitHub 地址前加上前缀：

```text
https://gh-proxy.com/
```

例如安装包的加速地址就是：

```text
https://gh-proxy.com/https://github.com/evansrrr/free-v6/releases/download/v0.4.5/FreeV6_0.4.5_x64-setup.exe
```

这个规则适用于任何 GitHub 仓库的 release、文件与页面地址。FreeV6 客户端的运行核心下载、更新检测与内置的 GeoData 地址，走的都是同一条 gh-proxy 加速通道。

## 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 11 x64 |
| 网络 | 连接校园网，且本机 IPv6 正常 |
| 磁盘空间 | 约 100 MB（含运行核心） |
| 端口 | 本地接口 `13335` 未被占用 |
| 首次使用 | 需联网下载运行核心（约 21 MB） |

## 校验下载的文件

安装包的 SHA256 显示在上方卡片中。下载完成后可在 PowerShell 中计算比对：

```powershell
Get-FileHash .\FreeV6_0.4.5_x64-setup.exe -Algorithm SHA256
```

构建来源证明（attestation）的验证方法见[下载与安装](/guide/install)。

## 接下来

- 安装步骤与首次启动：[下载与安装](/guide/install)
- 界面与功能：[使用说明](/guide/usage)
- 启动失败等排查：[常见问题](/guide/faq)
