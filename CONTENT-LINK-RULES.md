# finalshell-cn.com 正文链接规则

手工写文章与 `autobot.js` 自动生成时均遵守本规则。

## 数量

| 类型 | 每篇建议 |
|------|----------|
| 站内内链 | **2～5 条** |
| 外链（官方） | **0～2 条** |
| 同一关键词精确匹配链接 | **最多 1 次** |

## 锚文本

- 用自然描述：`Windows 安装与运行环境`、`SFTP 拖拽上传技巧`
- 不要每段都把「FinalShell 下载」链到首页
- 不要全篇 exact match 堆砌

## 可链站内 pillar（优先）

| 主题 | 路径 |
|------|------|
| 官方下载渠道 | `/posts/cn-finalshell-official-download-channel/` |
| Windows 安装 | `/posts/cn-finalshell-windows-install-setup/` |
| macOS 权限修复 | `/posts/cn-finalshell-macos-permission-fix/` |
| 首次连接云服务器 | `/posts/cn-finalshell-first-server-connection/` |
| SSH 密钥免密 | `/posts/cn-finalshell-ssh-keypair-login/` |
| SFTP 拖拽上传 | `/posts/cn-finalshell-sftp-drag-upload/` |
| 连接超时排查 | `/posts/cn-finalshell-connect-timeout-fix/` |
| 内存/JVM 调优 | `/posts/cn-finalshell-memory-jvm-tuning/` |
| SSH 隧道入门 | `/posts/cn-finalshell-ssh-tunnel-intro/` |
| 配置备份迁移 | `/posts/cn-finalshell-config-backup-migrate/` |
| 与 Xshell 对比 | `/posts/cn-finalshell-vs-xshell-compare/` |
| 站点首页 | `/` |
| 下载页 | `/dows.html` |

## 可链官方外链（同一域名每篇最多 1 次）

- https://www.hostbuf.com

## 禁止

- 每个「FinalShell」都加链接
- 链到 `finalshell-ssh.com` 等同主题站群
- 为 SEO 硬塞无关内链

## 写法示例

```markdown
安装前建议先看 [官方下载渠道与安全校验](/posts/cn-finalshell-official-download-channel/)。
若连接超时，见 [五步排查清单](/posts/cn-finalshell-connect-timeout-fix/)。
```

## 主题对照（新文章选 2～3 条相关内链）

- **下载 / 安装 / 卸载** → official-download-channel、windows-install-setup、clean-uninstall
- **macOS** → macos-permission-fix、windows-install-setup
- **连接 / 超时 / 认证** → first-server-connection、connect-timeout-fix、ssh-keypair-login
- **SFTP / 文件** → sftp-drag-upload、config-backup-migrate
- **隧道 / 代理** → ssh-tunnel-intro、socks-proxy-setup
- **对比 / 选型** → vs-xshell-compare、free-pro-difference
