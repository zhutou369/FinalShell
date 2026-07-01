---
title: "终端中文乱码、GBK 与 UTF-8 编码怎么设置"
description: "FinalShell 终端显示中文乱码时的会话编码、服务器 locale 与文件编码统一方法。"
date: 2026-06-24
tags: ["终端设置","编码"]
layout: layout.njk
permalink: /posts/cn-finalshell-terminal-encoding/index.html
featured: true
---

## 先确认服务器 locale

在服务器执行 locale，建议为 en_US.UTF-8 或 zh_CN.UTF-8。

![终端中文乱码、GBK 与 UTF-8 编码怎么设置配图](/static/images/photo-1518770660439-4636190af475.jpg)

## 客户端编码

会话属性中将终端编码设为 UTF-8。连接 CentOS 7 等老系统时若仍乱码，可临时试 GBK。

## 文件编辑

用内置编辑器打开中文配置文件时，保存前确认编码与系统一致，避免写坏配置。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
