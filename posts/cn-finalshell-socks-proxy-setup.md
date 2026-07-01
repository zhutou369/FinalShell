---
title: "通过 Socks5/HTTP 代理连接海外 VPS"
description: "FinalShell 会话级代理设置字段说明，以及配合本地 Clash/V2Ray 出站连接海外服务器的示例。"
date: 2026-06-24
tags: ["代理配置","SSH连接"]
layout: layout.njk
permalink: /posts/cn-finalshell-socks-proxy-setup/index.html
featured: true
---

## 何时需要代理

公司网络屏蔽 22 端口或海外线路不稳定时，可走本地 SOCKS 代理再连 SSH。

![通过 Socks5/HTTP 代理连接海外 VPS配图](/static/images/photo-1581091226825-a6a2a5aee158.jpg)

## 填写代理参数

在连接高级设置中指定代理类型、地址与端口。确保代理本身允许 CONNECT 到目标 SSH 端口。

## 验证连通

代理生效后连接日志应显示经代理握手。若失败，先用 curl 测代理是否可用。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
