#!/usr/bin/env node
/**
 * CORTEX Status Layer — 各層の件数・最新 .md とコアスクリプトの存在を表示する（読み取り専用）
 * 使い方: リポジトリルートで `node scripts/cortex-status.mjs`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREFIX_RE = /^(\d{4}-\d{2}-\d{2})_(\d{4})_/;

function findRepoRoot() {
  let dir = path.resolve(__dirname, "..");
  for (;;) {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(__dirname, "..");
    dir = parent;
  }
}

function parseSortEntry(basename, stat) {
  const m = basename.match(PREFIX_RE);
  if (m) {
    return {
      primary: 1,
      sortKey: `${m[1]}_${m[2]}`,
    };
  }
  return {
    primary: 0,
    sortKey: String(stat.mtimeMs).padStart(20, "0"),
  };
}

/** @param {string} relDir 例: discussion */
function listMdSorted(repoRoot, relDir) {
  const dir = path.join(repoRoot, relDir);
  if (!fs.existsSync(dir)) return [];
  const items = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".md") || name === "_template.md" || name === "INDEX.md") continue;
    const fp = path.join(dir, name);
    let st;
    try {
      st = fs.statSync(fp);
    } catch {
      continue;
    }
    if (!st.isFile()) continue;
    items.push({ name, ...parseSortEntry(name, st) });
  }
  items.sort((a, b) => {
    if (a.primary !== b.primary) return a.primary ? -1 : 1;
    return b.sortKey.localeCompare(a.sortKey);
  });
  return items;
}

function posixRel(relDir, name) {
  return `${relDir.replace(/\\/g, "/")}/${name}`;
}

function exists(repoRoot, relPath) {
  const p = path.join(repoRoot, ...relPath.split("/"));
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function main() {
  let repoRoot;
  try {
    repoRoot = findRepoRoot();
  } catch (e) {
    console.error(`cortex-status: リポジトリルートを特定できません: ${e.message}`);
    process.exit(1);
  }

  const layers = ["discussion", "decisions", "history", "context", "code"];
  /** @type {Record<string, ReturnType<typeof listMdSorted>>} */
  const byLayer = {};
  for (const L of layers) {
    try {
      byLayer[L] = listMdSorted(repoRoot, L);
    } catch (e) {
      console.error(`cortex-status: ${L}/ の読み取りに失敗: ${e.message}`);
      process.exit(1);
    }
  }

  console.log("CORTEX STATUS");
  console.log("");
  console.log("PROJECT: CORTEX");
  console.log("TIMEZONE: Asia/Tokyo");
  console.log("");
  console.log("[FILES]");
  for (const L of layers) {
    console.log(`${L}: ${byLayer[L].length}`);
  }
  console.log("");
  console.log("[LATEST]");
  for (const L of layers) {
    const first = byLayer[L][0];
    const label =
      L === "decisions" ? "decision" : L === "context" ? "context" : L === "code" ? "code" : L;
    if (!first) {
      console.log(`${label}: -`);
    } else {
      console.log(`${label}: ${posixRel(L, first.name)}`);
    }
  }
  console.log("");
  console.log("[CORE]");
  const core = [
    ["INDEX.md", "INDEX.md"],
    ["scripts/check-md.mjs", "scripts/check-md.mjs"],
    ["scripts/update-index.mjs", "scripts/update-index.mjs"],
    ["scripts/cortex-status.mjs", "scripts/cortex-status.mjs"],
  ];
  for (const [label, rel] of core) {
    console.log(`${label}: ${exists(repoRoot, rel) ? "OK" : "MISSING"}`);
  }
  console.log("");
  console.log("[NEXT COMMANDS]");
  console.log("1. node scripts/check-md.mjs");
  console.log("2. node scripts/update-index.mjs");
  console.log("3. node scripts/cortex-status.mjs");
}

try {
  main();
} catch (e) {
  console.error(`cortex-status: ${e.message}`);
  process.exit(1);
}
