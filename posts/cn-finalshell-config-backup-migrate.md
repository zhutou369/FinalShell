---
title: "换电脑后如何备份并迁移会话与密钥配置"
description: "FinalShell 会话列表、分组与密钥路径的导出备份方式，以及迁移到新电脑时的恢复步骤。"
date: 2026-06-25
tags: ["会话管理","备份迁移"]
layout: layout.njk
permalink: /posts/cn-finalshell-config-backup-migrate/index.html
featured: true
---

## 备份什么

会话树结构、连接参数、自定义命令与主题。私钥文件需单独安全拷贝，不要上传到公开网盘。

![换电脑后如何备份并迁移会话与密钥配置配图](/static/images/photo-1581091226825-a6a2a5aee158.jpg)

## 导出方式

使用客户端内置导入导出（若版本提供），或复制配置目录到新机器相同路径。

## 迁移后验证

逐台测试连接，密钥路径因盘符变化需重新指向。云端同步功能可减轻手动拷贝工作量。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
