#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(__dirname, "..", "posts");

for (const file of fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
  if (!/\d{4}-\d{2}-\d{2}-post-\d+-\d+\.md$/i.test(file)) continue;
  const fp = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(fp, "utf-8");
  if (/^generated:\s*true/m.test(raw)) continue;
  if (!raw.startsWith("---")) continue;
  const end = raw.indexOf("\n---", 3);
  const fm = raw.slice(0, end + 4);
  const body = raw.slice(end + 4);
  fs.writeFileSync(fp, fm.replace(/\n---$/, "\ngenerated: true\n---") + body, "utf-8");
}
console.log("marked generated on auto posts");
