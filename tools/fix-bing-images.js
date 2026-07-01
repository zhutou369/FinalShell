#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMAGES_TXT = path.join(ROOT, "images.txt");
const POSTS_DIR = path.join(ROOT, "posts");

const REMOTE_IMAGE =
  /https?:\/\/(?:tse-mm\.bing\.com\/th\?q=[^\s)\]"']+|(?:i\.ytimg\.com|www\.hostbuf\.com|dummyimage\.com|encrypted-tbn0\.gstatic\.com|pc\d+\.gtimg\.com|cdn\.blog\.ctzpj\.com)[^\s)\]"']+)/gi;

function loadImagePool() {
  if (!fs.existsSync(IMAGES_TXT)) return [];
  return fs
    .readFileSync(IMAGES_TXT, "utf-8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith("/static/images/"));
}

function hashPick(seed, pool) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[hash % pool.length];
}

function replaceRemote(text, pool, cache) {
  return text.replace(REMOTE_IMAGE, (url) => {
    let seed = url;
    const m = url.match(/[?&]q=([^&]+)/i);
    if (m) {
      try {
        seed = decodeURIComponent(m[1].replace(/\+/g, " "));
      } catch {
        seed = m[1];
      }
    }
    if (cache.has(seed)) return cache.get(seed);
    const local = hashPick(seed, pool);
    cache.set(seed, local);
    return local;
  });
}

const pool = loadImagePool();
if (!pool.length) {
  console.error("images.txt 无本地路径");
  process.exit(1);
}
const cache = new Map();
let changed = 0;
for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
  const fp = path.join(POSTS_DIR, file);
  const original = fs.readFileSync(fp, "utf-8");
  const updated = replaceRemote(original, pool, cache);
  if (updated !== original) {
    fs.writeFileSync(fp, updated, "utf-8");
    changed++;
  }
}
console.log(`Updated ${changed} posts`);
