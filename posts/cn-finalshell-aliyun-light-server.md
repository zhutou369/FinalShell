---
title: "连接阿里云/腾讯云轻量服务器的端口与安全组设置"
description: "轻量应用服务器控制台中放行 SSH、修改默认端口后在 FinalShell 中的对应填法。"
date: 2026-06-22
tags: ["云服务器","SSH连接"]
layout: layout.njk
permalink: /posts/cn-finalshell-aliyun-light-server/index.html
featured: true
---

## 安全组放行

在云控制台防火墙规则中添加 TCP 22（或自定义 SSH 端口）入站，来源可设为本机 IP 或 0.0.0.0/0（生产环境建议收窄）。

![连接阿里云/腾讯云轻量服务器的端口与安全组设置配图](/static/images/photo-1518770660439-4636190af475.jpg)

## 获取登录信息

创建实例时设置的 root 密码或密钥对需妥善保存。Ubuntu 镜像默认用户可能是 ubuntu 而非 root。

## FinalShell 对应配置

主机填公网 IP，端口与安全组一致，认证方式与控制台提供的方式匹配。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
