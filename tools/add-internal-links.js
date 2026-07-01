#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "posts");
const DRY_RUN = process.argv.includes("--dry-run");

const PILLARS = [
  { path: "/posts/cn-finalshell-official-download-channel/", label: "官方下载渠道与安全校验", keywords: ["下载", "官网", "镜像", "安装包", "hostbuf"] },
  { path: "/posts/cn-finalshell-windows-install-setup/", label: "Windows 版下载安装", keywords: ["windows", "win10", "win11", "安装", "运行环境"] },
  { path: "/posts/cn-finalshell-macos-permission-fix/", label: "macOS 权限修复", keywords: ["macos", "mac", "损坏", "权限", "gatekeeper"] },
  { path: "/posts/cn-finalshell-first-server-connection/", label: "零基础连接云服务器", keywords: ["新建", "连接", "云服务器", "端口", "用户名"] },
  { path: "/posts/cn-finalshell-ssh-keypair-login/", label: "SSH 密钥对免密登录", keywords: ["密钥", "key", "私钥", "公钥", "免密"] },
  { path: "/posts/cn-finalshell-sftp-drag-upload/", label: "SFTP 拖拽上传", keywords: ["sftp", "上传", "下载", "拖拽", "文件"] },
  { path: "/posts/cn-finalshell-connect-timeout-fix/", label: "连接超时五步排查", keywords: ["超时", "正在连接", "timeout", "连不上", "拒绝"] },
  { path: "/posts/cn-finalshell-memory-jvm-tuning/", label: "内存与 JVM 调优", keywords: ["内存", "jvm", "卡顿", "占用", "闪退"] },
  { path: "/posts/cn-finalshell-ssh-tunnel-intro/", label: "SSH 隧道入门", keywords: ["隧道", "转发", "本地", "远程", "动态"] },
  { path: "/posts/cn-finalshell-config-backup-migrate/", label: "配置备份与迁移", keywords: ["备份", "迁移", "导出", "同步", "换电脑"] },
  { path: "/posts/cn-finalshell-vs-xshell-compare/", label: "与 Xshell 对比", keywords: ["xshell", "对比", "选型", "mobaxterm", "putty"] },
  { path: "/posts/cn-finalshell-cloud-sync-usage/", label: "云端同步用法", keywords: ["云端", "同步", "多设备", "账号"] },
  { path: "/posts/cn-finalshell-batch-shell-commands/", label: "批量命令执行", keywords: ["批量", "命令", "脚本", "快捷"] },
  { path: "/posts/cn-finalshell-terminal-encoding/", label: "终端编码设置", keywords: ["乱码", "utf-8", "gbk", "编码", "中文"] },
  { path: "/posts/cn-finalshell-socks-proxy-setup/", label: "代理连接配置", keywords: ["代理", "socks", "http", "海外"] },
  { path: "/posts/cn-finalshell-monitor-dashboard/", label: "监控面板解读", keywords: ["监控", "cpu", "内存", "网络", "曲线"] },
  { path: "/posts/cn-finalshell-clean-uninstall/", label: "完整卸载清理", keywords: ["卸载", "残留", "清理", "缓存"] },
  { path: "/posts/cn-finalshell-free-pro-difference/", label: "免费版与专业版差异", keywords: ["免费", "专业版", "pro", "功能限制"] },
  { path: "/posts/cn-finalshell-aliyun-light-server/", label: "连接阿里云/腾讯云", keywords: ["阿里云", "腾讯云", "轻量", "安全组"] },
  { path: "/posts/cn-finalshell-security-trust-faq/", label: "安全性常见疑问", keywords: ["安全", "后门", "信任", "隐私", "日志"] },
];

const DEFAULT_PILLARS = [PILLARS[0], PILLARS[3], PILLARS[5]];
const SECTION_HEADER = "## 延伸阅读";
const PILLAR_SKIP = new Set(PILLARS.map((p) => p.path.replace(/^\/posts\/|\//g, "") + ".md"));

function splitFrontMatter(raw) {
  if (!raw.startsWith("---")) return { fm: "", body: raw };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { fm: "", body: raw };
  return { fm: raw.slice(0, end + 4), body: raw.slice(end + 4).replace(/^\s+/, "") };
}

function parseTitle(fm) {
  const m = fm.match(/^title:\s*(.*)$/m);
  return m ? m[1].replace(/^["']|["']$/g, "") : "";
}

function parseDescription(fm) {
  const m = fm.match(/^description:\s*(.*)$/m);
  return m ? m[1].replace(/^["']|["']$/g, "") : "";
}

function scorePillars(text) {
  const lower = text.toLowerCase();
  return PILLARS.map((p) => {
    let score = 0;
    for (const kw of p.keywords) {
      const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      if (re.test(lower)) score += 1;
    }
    return { pillar: p, score };
  }).sort((a, b) => b.score - a.score);
}

function pickPillars(title, description, body, fileName) {
  const haystack = `${title}\n${description}\n${body.slice(0, 2000)}`;
  const ranked = scorePillars(haystack).filter((x) => x.score > 0);
  const chosen = [];
  for (const { pillar } of ranked) {
    if (chosen.length >= 3) break;
    const slug = pillar.path.replace(/^\/posts\/|\//g, "");
    if (fileName.includes(slug)) continue;
    if (!chosen.some((c) => c.path === pillar.path)) chosen.push(pillar);
  }
  if (chosen.length < 2) {
    for (const p of DEFAULT_PILLARS) {
      if (chosen.length >= 3) break;
      if (!chosen.some((c) => c.path === p.path)) chosen.push(p);
    }
  }
  return chosen.slice(0, 3);
}

function buildSection(pillars) {
  const lines = pillars.map((p) => `- [${p.label}](${p.path})`);
  return `\n${SECTION_HEADER}\n\n若需进一步查阅，可先看本站以下教程：\n\n${lines.join("\n")}\n`;
}

function processFile(filePath) {
  const fileName = path.basename(filePath);
  if ([...PILLAR_SKIP].some((skip) => fileName === skip)) return { fileName, status: "skip-pillar" };
  const raw = fs.readFileSync(filePath, "utf-8");
  const { fm, body } = splitFrontMatter(raw);
  if (body.includes(SECTION_HEADER)) return { fileName, status: "skip-has-section" };
  const pillars = pickPillars(parseTitle(fm), parseDescription(fm), body, fileName);
  if (!pillars.length) return { fileName, status: "skip-no-pillars" };
  const newBody = body.trimEnd() + buildSection(pillars);
  const updated = `${fm}\n\n${newBody.replace(/^\n+/, "")}`;
  if (!DRY_RUN) fs.writeFileSync(filePath, updated.endsWith("\n") ? updated : `${updated}\n`, "utf-8");
  return { fileName, status: "updated" };
}

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
const results = files.map((f) => processFile(path.join(POSTS_DIR, f)));
console.log(`更新 ${results.filter((r) => r.status === "updated").length} 篇, 跳过 ${results.filter((r) => r.status !== "updated").length} 篇`);
