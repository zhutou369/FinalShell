---
title: "SSH 本地转发、远程转发与动态代理入门"
description: "FinalShell 隧道功能中本地端口转发、远程转发与动态 SOCKS 代理的典型场景与配置字段说明。"
date: 2026-06-26
tags: ["端口转发","SSH隧道"]
layout: layout.njk
permalink: /posts/cn-finalshell-ssh-tunnel-intro/index.html
featured: true
---

## 本地转发

把本机某端口映射到远程内网服务，适合本地浏览器访问远程 MySQL 或 Redis。

![SSH 本地转发、远程转发与动态代理入门配图](/static/images/photo-1518770660439-4636190af475.jpg)

## 远程转发

让远程机器访问你本机服务，调试 Webhook 或内网穿透场景偶尔用到。

## 动态代理

建立 SOCKS 代理后，浏览器或其他工具可走 SSH 加密通道访问外网资源。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
