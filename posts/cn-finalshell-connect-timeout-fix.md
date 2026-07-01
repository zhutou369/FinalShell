---
title: "一直显示「正在连接」时的五步排查清单"
description: "FinalShell 连接卡住或 Socket timeout 时，从网络、端口、防火墙、DNS 与 SSH 服务五方面逐项排查。"
date: 2026-06-26
tags: ["故障排查","SSH连接"]
layout: layout.njk
permalink: /posts/cn-finalshell-connect-timeout-fix/index.html
featured: true
---

## 第一步：本机网络

确认本机能 ping 通目标 IP（若禁 ping 则用 telnc 或 Test-NetConnection 测端口）。

![一直显示「正在连接」时的五步排查清单配图](/static/images/photo-1486406146926-c627a92ad1ab.jpg)

## 第二步：安全组与防火墙

云服务器安全组需放行 SSH 端口；服务器内 iptables/firewalld 亦需允许。

## 第三步：服务与端口

在控制台 VNC 登录服务器，执行 systemctl status sshd 确认服务运行且监听正确端口。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
