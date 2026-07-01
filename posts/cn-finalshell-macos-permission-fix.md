---
title: "macOS 安装后「已损坏」提示与权限修复步骤"
description: "解决 macOS 打开 FinalShell 时提示「已损坏，无法打开」或 Gatekeeper 拦截的常用命令与系统设置方法。"
date: 2026-06-28
tags: ["macOS客户端","权限修复"]
layout: layout.njk
permalink: /posts/cn-finalshell-macos-permission-fix/index.html
featured: true
---

## 典型报错表现

从非 App Store 渠道下载后，双击图标可能提示「已损坏，应移到废纸篓」。这通常是 Gatekeeper 隔离属性导致，不一定是文件真损坏。

![macOS 安装后「已损坏」提示与权限修复步骤配图](/static/images/photo-1558494949-ef010cbdcc31.jpg)

## 移除隔离属性

在终端对 .app 执行 xattr -cr 命令清除 quarantine 属性后重试。Apple Silicon 与 Intel 芯片均适用，路径以你实际安装位置为准。

## 系统隐私设置

若仍被拦截，可在「系统设置 → 隐私与安全性」中允许此应用一次。后续更新版本若再次下载，可能需要重复清除隔离属性。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
