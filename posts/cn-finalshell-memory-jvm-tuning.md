---
title: "内存占用过高时如何调整 JVM 启动参数"
description: "FinalShell 基于 Java 运行时，多开标签或长时间运行时内存偏高的调整思路与 JVM 参数示例。"
date: 2026-06-26
tags: ["性能优化","JVM"]
layout: layout.njk
permalink: /posts/cn-finalshell-memory-jvm-tuning/index.html
featured: true
---

## 为何会占内存

每个 SSH 会话、监控面板与文件传输都会占用堆内存。标签开太多时曲线会明显上升。

![内存占用过高时如何调整 JVM 启动参数配图](/static/images/photo-1558494949-ef010cbdcc31.jpg)

## 可调参数思路

可在启动脚本或配置中为 -Xms/-Xmx 设定上限。具体入口因版本而异，改前建议备份配置。

## 使用习惯

不用的会话及时断开，监控面板不需要时可折叠。定期重启客户端可释放泄漏的堆内存。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
