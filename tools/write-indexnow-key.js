#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const key = (process.env.INDEXNOW_KEY || "").trim();

if (!key) {
  console.log("INDEXNOW_KEY not set, skip key file.");
  process.exit(0);
}

const rootFile = path.join(ROOT, `${key}.txt`);
fs.writeFileSync(rootFile, key, "utf8");
console.log(`Wrote ${key}.txt`);

const siteDir = path.join(ROOT, "_site");
if (fs.existsSync(siteDir)) {
  fs.writeFileSync(path.join(siteDir, `${key}.txt`), key, "utf8");
  console.log(`Wrote _site/${key}.txt`);
}
