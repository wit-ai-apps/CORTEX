#!/usr/bin/env node
/**
 * cortex-status — CORTEX CLI MVP（案 B）
 * 使い方: リポジトリルートで `node code/cortex-status.mjs`
 * 検査: `scripts/check-md.mjs` を import（Actions では同スクリプトを直接実行可能）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runMdChecks } from "../scripts/check-md.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);
  for (;;) {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(startDir, "..");
    dir = parent;
  }
}

function listMarkdownStats(dir, options = {}) {
  const { excludeNamesFromLatest = [] } = options;
  if (!fs.existsSync(dir)) {
    return { count: 0, latest: null };
  }
  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => {
      const full = path.join(dir, e.name);
      const st = fs.statSync(full);
      return { name: e.name, mtime: st.mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);

  const latest =
    files.find((f) => !excludeNamesFromLatest.includes(f.name)) ?? null;

  return {
    count: files.length,
    latest,
  };
}

function countFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return 0;
  let n = 0;
  const stack = [dir];
  while (stack.length) {
    const d = stack.pop();
    const ents = fs.readdirSync(d, { withFileTypes: true });
    for (const e of ents) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile()) n += 1;
    }
  }
  return n;
}

const repoRoot = findRepoRoot(__dirname);
const discussionDir = path.join(repoRoot, "discussion");
const decisionsDir = path.join(repoRoot, "decisions");
const historyDir = path.join(repoRoot, "history");
const codeDir = path.join(repoRoot, "code");

const disc = listMarkdownStats(discussionDir);
const dec = listMarkdownStats(decisionsDir, { excludeNamesFromLatest: ["_template.md"] });
const hist = listMarkdownStats(historyDir);
const codeCount = countFilesRecursive(codeDir);

console.log("CORTEX STATUS");
console.log("");
console.log(`discussion files: ${disc.count}`);
console.log(`decisions files: ${dec.count}`);
console.log(`history files: ${hist.count}`);
console.log(`code files: ${codeCount}`);
console.log("");
console.log(`latest discussion: ${disc.latest ? disc.latest.name : "none"}`);
console.log(`latest decision: ${dec.latest ? dec.latest.name : "none"}`);
console.log("");
console.log("─".repeat(40));
const { issues } = runMdChecks(repoRoot);
if (issues.length === 0) {
  console.log("check-md: 指摘なし（MVP）");
} else {
  const errN = issues.filter((i) => i.level === "error").length;
  const warnN = issues.filter((i) => i.level === "warn").length;
  console.log(`check-md: error ${errN}, warn ${warnN}`);
  for (const i of issues) {
    console.log(`  [${i.level}] ${i.file}: ${i.msg}`);
  }
}
