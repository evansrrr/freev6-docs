# 下载与安装

FreeV6 是单个安装包（NSIS），下载后直接运行即可。

<DownloadPanel />

## 1. 下载安装包

- **推荐**：点击上方“加速下载”，走 gh-proxy 加速通道，大陆网络更稳定；
- 直连较慢时，也可以打开 [Releases 页面](https://github.com/evansrrr/free-v6/releases)手动下载；
- 文件名形如 `FreeV6_0.4.5_x64-setup.exe`，版本号随发布更新。

## 2. 校验文件（可选）

安装包的 SHA256 显示在上方下载卡片中，也写在每个 [Release](https://github.com/evansrrr/free-v6/releases) 的说明里。在PowerShell 中计算实际文件的哈希进行比对：

```powershell
Get-FileHash .\FreeV6_0.4.5_x64-setup.exe -Algorithm SHA256
```

每个安装包都附带构建来源证明，可用 GitHub CLI 验证它确实由官方工作流构建：

```bash
gh attestation verify FreeV6_0.4.5_x64-setup.exe -o evansrrr
```

::: tip
上面两条命令中的文件名以你实际下载到的版本为准。
:::

## 3. 运行安装

1. 双击安装包；
2. 软件未签名，若被 Windows 拦截（“Windows 已保护你的电脑”），展开详细信息选择**仍要运行 / 仍要继续**；
3. 按安装向导完成安装并启动 FreeV6。

## 4. 首次启动免流

1. 确认已连接校园网；
2. 点击“**启动免流**”，首次会提示下载运行核心（约 21 MB），按提示点击“**下载**”，程序自动完成下载安装；
3. 再次点击“**启动免流**”，看到状态变为免流中即已连上。

::: info 核心下载也走加速
运行核心来自 GitHub Release，客户端内置的下载地址同样经过 gh-proxy 加速，无需手动处理。
:::

安装完成后，继续阅读[使用说明](/guide/usage)了解接入点、白名单与热点共享。
