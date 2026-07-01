#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const POSTS = [
  {
    slug: "cn-finalshell-official-download-channel",
    title: "官方下载渠道与安全校验：如何避免下到捆绑包",
    description: "说明 FinalShell 官方与常见镜像下载入口、安装包校验方法，以及识别非官方捆绑安装包的要点。",
    tags: ["下载指南", "安全校验"],
    sections: [
      ["优先使用的下载入口", "建议从 FinalShell 官网 hostbuf.com 获取安装包。若官网暂时无法访问，可使用你信任的镜像，但务必核对文件大小与数字签名信息（如有）。不要在来历不明的论坛帖子里直接点「绿色版」「破解版」链接。"],
      ["安装包校验习惯", "下载完成后，可先查看文件名与版本号是否与官网说明一致。Windows 安装包体积通常在几十 MB 量级；若只有几 MB 且要求额外下载「运行库插件」，需要提高警惕。"],
      ["常见风险场景", "搜索引擎结果页里偶尔会出现仿站域名。注意核对 URL 拼写，避免把 o 看成 0、把 .com 换成 .cn 仿站。企业环境建议统一由 IT 分发安装包。"],
    ],
  },
  {
    slug: "cn-finalshell-windows-install-setup",
    title: "Windows 版下载安装与运行环境配置说明",
    description: "Windows 10/11 下 FinalShell 安装步骤、Java 运行库提示处理，以及首次启动前的磁盘与权限检查。",
    tags: ["Windows客户端", "安装配置"],
    sections: [
      ["安装前检查", "确认系统为 64 位 Windows 10 或更高版本，系统盘预留至少 500MB 空间。若公司电脑有软件白名单策略，需提前申请放行。"],
      ["安装流程", "双击安装包后按向导下一步即可。建议安装路径使用英文目录，减少个别环境下路径编码问题。安装完成后可从开始菜单启动。"],
      ["运行库与首次启动", "若提示缺少 Java 或 Runtime，按安装向导补装官方组件，不要从不明站点单独下载 JRE。首次启动若防火墙弹窗，选择允许专用网络即可。"],
    ],
  },
  {
    slug: "cn-finalshell-macos-permission-fix",
    title: "macOS 安装后「已损坏」提示与权限修复步骤",
    description: "解决 macOS 打开 FinalShell 时提示「已损坏，无法打开」或 Gatekeeper 拦截的常用命令与系统设置方法。",
    tags: ["macOS客户端", "权限修复"],
    sections: [
      ["典型报错表现", "从非 App Store 渠道下载后，双击图标可能提示「已损坏，应移到废纸篓」。这通常是 Gatekeeper 隔离属性导致，不一定是文件真损坏。"],
      ["移除隔离属性", "在终端对 .app 执行 xattr -cr 命令清除 quarantine 属性后重试。Apple Silicon 与 Intel 芯片均适用，路径以你实际安装位置为准。"],
      ["系统隐私设置", "若仍被拦截，可在「系统设置 → 隐私与安全性」中允许此应用一次。后续更新版本若再次下载，可能需要重复清除隔离属性。"],
    ],
  },
  {
    slug: "cn-finalshell-first-server-connection",
    title: "零基础：从新建会话到连接第一台云服务器",
    description: "新建 SSH 会话时主机、端口、用户名与密码怎么填，并以阿里云/腾讯云轻量服务器为例完成首次连接。",
    tags: ["SSH连接", "新手上路"],
    sections: [
      ["准备连接信息", "向云厂商控制台获取公网 IP、SSH 端口（默认 22）、用户名（Linux 常见 root 或 ubuntu）及密码或密钥。"],
      ["新建会话", "在 FinalShell 中点击新建 SSH 连接，填写名称、主机、端口与认证方式。名称可自定，便于后续在左侧树中识别。"],
      ["首次连通验证", "连接成功后执行 whoami 与 pwd 确认身份与目录。若失败，先查安全组是否放行 22 端口，再查用户名密码是否正确。"],
    ],
  },
  {
    slug: "cn-finalshell-ssh-keypair-login",
    title: "用 SSH 密钥对实现免密登录的完整流程",
    description: "本地生成密钥对、上传公钥到服务器、在 FinalShell 中指定私钥路径并完成免密登录的操作顺序。",
    tags: ["SSH连接", "密钥登录"],
    sections: [
      ["生成密钥对", "可使用 ssh-keygen 在本地生成 RSA 或 Ed25519 密钥。私钥文件权限应限制为仅当前用户可读。"],
      ["部署公钥", "将 .pub 内容追加到服务器 ~/.ssh/authorized_keys，并确认目录权限为 700、文件权限为 600。"],
      ["客户端配置", "在会话属性中选择密钥认证，指向私钥路径。若仍提示密码，检查服务器 sshd_config 是否允许 PubkeyAuthentication。"],
    ],
  },
  {
    slug: "cn-finalshell-sftp-drag-upload",
    title: "SFTP 面板拖拽上传与大文件传输注意事项",
    description: "FinalShell 内置 SFTP 文件管理器的拖拽上传、目录同步与传输失败时的重试思路。",
    tags: ["SFTP传输", "文件管理"],
    sections: [
      ["打开 SFTP 面板", "SSH 连接成功后，界面下方或侧边会出现文件浏览器，左侧本地、右侧远程目录。"],
      ["拖拽与批量操作", "选中本地文件拖到远程目录即可上传。大文件夹建议先压缩再传，或在网络稳定时段操作。"],
      ["失败时怎么处理", "若长时间「等待中」，检查磁盘空间与目录写权限。海外线路可尝试关闭实时杀毒对传输目录的扫描。"],
    ],
  },
  {
    slug: "cn-finalshell-connect-timeout-fix",
    title: "一直显示「正在连接」时的五步排查清单",
    description: "FinalShell 连接卡住或 Socket timeout 时，从网络、端口、防火墙、DNS 与 SSH 服务五方面逐项排查。",
    tags: ["故障排查", "SSH连接"],
    sections: [
      ["第一步：本机网络", "确认本机能 ping 通目标 IP（若禁 ping 则用 telnc 或 Test-NetConnection 测端口）。"],
      ["第二步：安全组与防火墙", "云服务器安全组需放行 SSH 端口；服务器内 iptables/firewalld 亦需允许。"],
      ["第三步：服务与端口", "在控制台 VNC 登录服务器，执行 systemctl status sshd 确认服务运行且监听正确端口。"],
    ],
  },
  {
    slug: "cn-finalshell-memory-jvm-tuning",
    title: "内存占用过高时如何调整 JVM 启动参数",
    description: "FinalShell 基于 Java 运行时，多开标签或长时间运行时内存偏高的调整思路与 JVM 参数示例。",
    tags: ["性能优化", "JVM"],
    sections: [
      ["为何会占内存", "每个 SSH 会话、监控面板与文件传输都会占用堆内存。标签开太多时曲线会明显上升。"],
      ["可调参数思路", "可在启动脚本或配置中为 -Xms/-Xmx 设定上限。具体入口因版本而异，改前建议备份配置。"],
      ["使用习惯", "不用的会话及时断开，监控面板不需要时可折叠。定期重启客户端可释放泄漏的堆内存。"],
    ],
  },
  {
    slug: "cn-finalshell-ssh-tunnel-intro",
    title: "SSH 本地转发、远程转发与动态代理入门",
    description: "FinalShell 隧道功能中本地端口转发、远程转发与动态 SOCKS 代理的典型场景与配置字段说明。",
    tags: ["端口转发", "SSH隧道"],
    sections: [
      ["本地转发", "把本机某端口映射到远程内网服务，适合本地浏览器访问远程 MySQL 或 Redis。"],
      ["远程转发", "让远程机器访问你本机服务，调试 Webhook 或内网穿透场景偶尔用到。"],
      ["动态代理", "建立 SOCKS 代理后，浏览器或其他工具可走 SSH 加密通道访问外网资源。"],
    ],
  },
  {
    slug: "cn-finalshell-config-backup-migrate",
    title: "换电脑后如何备份并迁移会话与密钥配置",
    description: "FinalShell 会话列表、分组与密钥路径的导出备份方式，以及迁移到新电脑时的恢复步骤。",
    tags: ["会话管理", "备份迁移"],
    sections: [
      ["备份什么", "会话树结构、连接参数、自定义命令与主题。私钥文件需单独安全拷贝，不要上传到公开网盘。"],
      ["导出方式", "使用客户端内置导入导出（若版本提供），或复制配置目录到新机器相同路径。"],
      ["迁移后验证", "逐台测试连接，密钥路径因盘符变化需重新指向。云端同步功能可减轻手动拷贝工作量。"],
    ],
  },
  {
    slug: "cn-finalshell-vs-xshell-compare",
    title: "FinalShell 与 Xshell 怎么选？功能与上手成本对比",
    description: "从价格、内置 SFTP、监控面板、多标签与中文支持等维度对比 FinalShell 与 Xshell 的适用人群。",
    tags: ["工具对比", "选型参考"],
    sections: [
      ["价格与授权", "FinalShell 个人版免费功能较全；Xshell 个人免费版有标签与会话数量限制，商业环境需购买授权。"],
      ["一体化能力", "FinalShell 自带 SFTP 与基础监控；Xshell 需配合 xftp 或第三方工具传文件。"],
      ["适合谁", "个人站长与中小团队常选 FinalShell 省成本；已有 Xshell 企业授权的团队可继续沿用现有流程。"],
    ],
  },
  {
    slug: "cn-finalshell-cloud-sync-usage",
    title: "云端同步功能怎么用？多设备切换注意事项",
    description: "FinalShell 云端同步会话配置的开启方式、账号安全建议与多电脑同时使用的注意点。",
    tags: ["会话管理", "云端同步"],
    sections: [
      ["开启同步", "在设置中登录同步账号后，会话变更会上传云端。首次同步前建议本地先导出一份备份。"],
      ["安全建议", "同步内容含连接信息，务必使用强密码并开启二次验证（若提供）。公共电脑不要勾选长期保持登录。"],
      ["冲突处理", "两台电脑同时改同一会话时，以最后上传为准。大改动后手动点一次同步确认。"],
    ],
  },
  {
    slug: "cn-finalshell-batch-shell-commands",
    title: "命令输入框与快捷命令：批量执行运维脚本",
    description: "利用 FinalShell 命令输入框向多台主机发送相同命令，以及保存常用脚本为快捷命令的方法。",
    tags: ["运维效率", "批量操作"],
    sections: [
      ["命令输入框位置", "界面底部或工具栏有批量命令入口，选中多台已连接主机后可统一发送。"],
      ["适用场景", "批量查磁盘 df -h、重启 nginx、拉取 git 更新等重复性操作。危险命令执行前务必二次确认。"],
      ["快捷命令库", "把常用运维脚本保存为模板，减少复制粘贴错误。配合会话分组按环境（测试/生产）使用。"],
    ],
  },
  {
    slug: "cn-finalshell-terminal-encoding",
    title: "终端中文乱码、GBK 与 UTF-8 编码怎么设置",
    description: "FinalShell 终端显示中文乱码时的会话编码、服务器 locale 与文件编码统一方法。",
    tags: ["终端设置", "编码"],
    sections: [
      ["先确认服务器 locale", "在服务器执行 locale，建议为 en_US.UTF-8 或 zh_CN.UTF-8。"],
      ["客户端编码", "会话属性中将终端编码设为 UTF-8。连接 CentOS 7 等老系统时若仍乱码，可临时试 GBK。"],
      ["文件编辑", "用内置编辑器打开中文配置文件时，保存前确认编码与系统一致，避免写坏配置。"],
    ],
  },
  {
    slug: "cn-finalshell-socks-proxy-setup",
    title: "通过 Socks5/HTTP 代理连接海外 VPS",
    description: "FinalShell 会话级代理设置字段说明，以及配合本地 Clash/V2Ray 出站连接海外服务器的示例。",
    tags: ["代理配置", "SSH连接"],
    sections: [
      ["何时需要代理", "公司网络屏蔽 22 端口或海外线路不稳定时，可走本地 SOCKS 代理再连 SSH。"],
      ["填写代理参数", "在连接高级设置中指定代理类型、地址与端口。确保代理本身允许 CONNECT 到目标 SSH 端口。"],
      ["验证连通", "代理生效后连接日志应显示经代理握手。若失败，先用 curl 测代理是否可用。"],
    ],
  },
  {
    slug: "cn-finalshell-monitor-dashboard",
    title: "底部监控面板：CPU、内存与网络曲线怎么看",
    description: "FinalShell 实时硬件监控各指标含义，以及如何结合曲线判断服务器负载异常。",
    tags: ["服务器监控", "运维"],
    sections: [
      ["CPU 曲线", "多核环境下若单核打满而整体不高，可能是单线程程序瓶颈。持续 100% 需查 top 进程。"],
      ["内存与交换", "内存缓慢上升可能是正常缓存；急剧上涨伴随 swap 使用则需排查泄漏。"],
      ["网络 IO", "突发流量对应备份、同步或大文件下载。带宽打满时 SFTP 会变慢属正常现象。"],
    ],
  },
  {
    slug: "cn-finalshell-clean-uninstall",
    title: "完整卸载：清掉缓存、配置与残留文件",
    description: "Windows 与 macOS 卸载 FinalShell 后清理配置目录与缓存，避免重装时继承旧会话或冲突。",
    tags: ["卸载清理", "维护"],
    sections: [
      ["Windows 卸载", "控制面板卸载程序后，检查用户目录下 FinalShell 相关文件夹是否仍存在。"],
      ["macOS 卸载", "将应用拖入废纸篓后，清理 ~/Library 下对应配置与缓存。"],
      ["重装建议", "彻底删除旧配置再重装，可解决升级后闪退或会话损坏问题。重要会话请先导出。"],
    ],
  },
  {
    slug: "cn-finalshell-free-pro-difference",
    title: "个人免费版与专业版功能差异一览",
    description: "FinalShell 免费版与专业版在会话数量、网络加速、同步与高级功能上的差异，帮助判断是否值得升级。",
    tags: ["版本对比", "功能说明"],
    sections: [
      ["免费版够用场景", "个人几台 VPS、日常 SSH 与 SFTP，免费版通常足够。"],
      ["专业版增值点", "可能包含网络加速、更多同步配额或企业特性，以官网当前说明为准。"],
      ["升级前建议", "先试用免费版确认 workflow，再评估是否真需要加速或多设备高级同步。"],
    ],
  },
  {
    slug: "cn-finalshell-aliyun-light-server",
    title: "连接阿里云/腾讯云轻量服务器的端口与安全组设置",
    description: "轻量应用服务器控制台中放行 SSH、修改默认端口后在 FinalShell 中的对应填法。",
    tags: ["云服务器", "SSH连接"],
    sections: [
      ["安全组放行", "在云控制台防火墙规则中添加 TCP 22（或自定义 SSH 端口）入站，来源可设为本机 IP 或 0.0.0.0/0（生产环境建议收窄）。"],
      ["获取登录信息", "创建实例时设置的 root 密码或密钥对需妥善保存。Ubuntu 镜像默认用户可能是 ubuntu 而非 root。"],
      ["FinalShell 对应配置", "主机填公网 IP，端口与安全组一致，认证方式与控制台提供的方式匹配。"],
    ],
  },
  {
    slug: "cn-finalshell-security-trust-faq",
    title: "安全性常见疑问：后门、日志与密钥存储说明",
    description: "针对 FinalShell 是否上传密码、密钥存放位置与如何降低远程管理风险的客观说明。",
    tags: ["安全说明", "FAQ"],
    sections: [
      ["密码存哪", "记住密码功能通常加密保存在本机配置目录。公共电脑不要勾选记住密码。"],
      ["后门争议", "选择官方渠道安装、关注社区与版本更新说明。敏感环境可用密钥登录并限制 root 直登。"],
      ["降低风险", "开启服务器 fail2ban、改默认端口、定期轮换密钥，比单纯换客户端更能提升安全。"],
    ],
  },
];

const IMAGES = [
  "/static/images/photo-1581092795360-fd1ca04f0952.jpg",
  "/static/images/photo-1486406146926-c627a92ad1ab.jpg",
  "/static/images/photo-1558494949-ef010cbdcc31.jpg",
  "/static/images/photo-1518770660439-4636190af475.jpg",
  "/static/images/photo-1581091226825-a6a2a5aee158.jpg",
];

const dir = path.join(__dirname, "..", "posts");
let n = 0;
for (let i = 0; i < POSTS.length; i++) {
  const p = POSTS[i];
  const fp = path.join(dir, `${p.slug}.md`);
  if (fs.existsSync(fp)) continue;
  const img = IMAGES[i % IMAGES.length];
  let body = "";
  p.sections.forEach(([h, text], j) => {
    body += `## ${h}\n\n${text}\n\n`;
    if (j === 0) body += `![${p.title}配图](${img})\n\n`;
  });
  body += `## 常见问题\n\n`;
  body += `- **问：本篇步骤适用于哪个版本？** 答：以你当前安装的 FinalShell 界面为准，菜单名称可能随版本微调。\n`;
  body += `- **问：还是解决不了怎么办？** 答：可先查阅本站 [连接超时排查](/posts/cn-finalshell-connect-timeout-fix/) 或 [官方下载渠道说明](/posts/cn-finalshell-official-download-channel/)。\n`;

  const fm = `---
title: "${p.title}"
description: "${p.description}"
date: 2026-06-${String(28 - Math.floor(i / 3)).padStart(2, "0")}
tags: ${JSON.stringify(p.tags)}
layout: layout.njk
permalink: /posts/${p.slug}/index.html
featured: true
---

`;
  fs.writeFileSync(fp, fm + body, "utf-8");
  n++;
}
console.log(`Created ${n} pillar posts`);
