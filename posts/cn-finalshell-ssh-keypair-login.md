---
title: "用 SSH 密钥对实现免密登录的完整流程"
description: "本地生成密钥对、上传公钥到服务器、在 FinalShell 中指定私钥路径并完成免密登录的操作顺序。"
date: 2026-06-27
tags: ["SSH连接","密钥登录"]
layout: layout.njk
permalink: /posts/cn-finalshell-ssh-keypair-login/index.html
featured: true
---

## 生成密钥对

可使用 ssh-keygen 在本地生成 RSA 或 Ed25519 密钥。私钥文件权限应限制为仅当前用户可读。

![用 SSH 密钥对实现免密登录的完整流程配图](/static/images/photo-1581091226825-a6a2a5aee158.jpg)

## 部署公钥

将 .pub 内容追加到服务器 ~/.ssh/authorized_keys，并确认目录权限为 700、文件权限为 600。

## 客户端配置

在会话属性中选择密钥认证，指向私钥路径。若仍提示密码，检查服务器 sshd_config 是否允许 PubkeyAuthentication。

## 常见问题

- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。
- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。
