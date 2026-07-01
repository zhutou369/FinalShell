---
title: "零基础：从新建会话到连接第一台云服务器"
description: "新建 SSH 会话时主机、端口、用户名与密码怎么填，并以阿里云/腾讯云轻量服务器为例完成首次连接。"
date: 2026-06-27
tags: ["SSH连接","新手上路"]
layout: layout.njk
permalink: /posts/cn-finalshell-first-server-connection/index.html
featured: true
---

## 准备连接信息

向云厂商控制台获取公网 IP、SSH 端口（默认 22）、用户名（Linux 常见 root 或 ubuntu）及密码或密钥。

![零基础：从新建会话到连接第一台云服务器配图](/static/images/photo-1518770660439-4636190af475.jpg)

## 新建会话

在 FinalShell 中点击新建 SSH 连接，填写名称、主机、端口与认证方式。名称可自定，便于后续在左侧树中识别。

## 首次连通验证

连接成功后执行 whoami 与 pwd 确认身份与目录。若失败，先查安全组是否放行 22 端口，再查用户名密码是否正确。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
