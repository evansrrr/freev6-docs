# 下载与安装

下载后直接运行安装即可

<DownloadPanel />

## 1. 下载安装包

- 点击上方“加速下载”，使用 gh-proxy 下载 Github 仓库文件，大陆网络较稳定
- 更多版本参见 [Releases 页面](https://github.com/evansrrr/free-v6/releases)
- 文件名形如 `FreeV6_0.4.5_x64-setup.exe`，版本号随发布更新

## 2. 校验文件（可选）

安装包的 SHA256 显示在上方卡片中，在 PowerShell 中计算实际文件哈希进行比对：

```powershell
Get-FileHash .\FreeV6_0.4.5_x64-setup.exe -Algorithm SHA256
```

安装包附带构建来源证明，可用 GitHub CLI 验证是否由官方工作流构建：

```bash
gh attestation verify FreeV6_0.4.5_x64-setup.exe -o evansrrr
```

::: tip
命令中文件名以实际下载版本为准
:::

## 3. 运行安装

1. 双击安装包文件进行安装
2. 由于软件未签名，若被 Windows 拦截（“Windows 已保护你的电脑”），展开详细信息选择**仍要运行 / 仍要继续**
3. 按安装向导完成安装并启动 FreeV6

## 4. 首次启动免流

1. 确认校园网条件符合，见 [FreeV6 介绍](/guide/introduction)
2. 点击“**启动免流**”，首次会提示下载运行核心（约 21 MB），点击“**下载**”，程序将自动完成下载安装
3. 再次点击“**启动免流**”，看到状态变为“停止免流”即已启动

::: info 核心下载加速
运行核心来自 GitHub Release，客户端内置的下载地址经过 gh-proxy 加速，无需额外处理
:::

安装完成后，继续阅读[使用说明](/guide/usage)了解接入点、白名单与热点共享
