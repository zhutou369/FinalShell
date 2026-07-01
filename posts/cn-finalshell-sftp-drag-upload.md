---
title: "SFTP 面板拖拽上传与大文件传输注意事项"
description: "FinalShell 内置 SFTP 文件管理器的拖拽上传、目录同步与传输失败时的重试思路。"
date: 2026-06-27
tags: ["SFTP传输","文件管理"]
layout: layout.njk
permalink: /posts/cn-finalshell-sftp-drag-upload/index.html
featured: true
---

## 打开 SFTP 面板

SSH 连接成功后，界面下方或侧边会出现文件浏览器，左侧本地、右侧远程目录。

![SFTP 面板拖拽上传与大文件传输注意事项配图](/static/images/photo-1581092795360-fd1ca04f0952.jpg)

## 拖拽与批量操作

选中本地文件拖到远程目录即可上传。大文件夹建议先压缩再传，或在网络稳定时段操作。

## 失败时怎么处理

若长时间「等待中」，检查磁盘空间与目录写权限。海外线路可尝试关闭实时杀毒对传输目录的扫描。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
