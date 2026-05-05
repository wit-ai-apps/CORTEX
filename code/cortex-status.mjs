#!/usr/bin/env node
/**
 * cortex-status — CORTEX リポジトリのスナップショットを表示する（案 B / Step1）
 * 使い方: リポジトリルートで `node code/cortex-status.mjs`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

function listMarkdownStats(dir) {
  if (!fs.existsSync(dir)) {
    return { count: 0, files: [], latest: null };
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

  return {
    count: files.length,
    files: files.map((f) => f.name),
    latest: files[0] ?? null,
  };
}

const repoRoot = findRepoRoot(__dirname);
const discussionDir = path.join(repoRoot, "discussion");
const decisionsDir = path.join(repoRoot, "decisions");
const historyDir = path.join(repoRoot, "history");
const codeDir = path.join(repoRoot, "code");

const disc = listMarkdownStats(discussionDir);
const dec = listMarkdownStats(decisionsDir);
const hist = listMarkdownStats(historyDir);

console.log("CORTEX status");
console.log("─".repeat(40));
console.log(`repo:     ${repoRoot}`);
console.log(`branch:   ${tryGitBranch(repoRoot)}`);
console.log("");
console.log(`discussion/  .md files: ${disc.count}`);
if (disc.latest) console.log(`  latest:   ${disc.latest.name}`);
console.log(`decisions/   .md files: ${dec.count}`);
if (dec.latest) console.log(`  latest:   ${dec.latest.name}`);
console.log(`history/     .md files: ${hist.count}`);
if (hist.latest) console.log(`  latest:   ${hist.latest.name}`);
console.log("");
console.log(`code/        cortex-status.mjs: ${fs.existsSync(path.join(codeDir, "cortex-status.mjs")) ? "yes" : "no"}`);
console.log("─".repeat(40));
console.log("Run from repo root: node code/cortex-status.mjs");

function tryGitBranch(root) {
  const head = path.join(root, ".git", "HEAD");
  try {
    const raw = fs.readFileSync(head, "utf8").trim();
    const m = raw.match(/^ref: refs\/heads\/(.+)$/);
    return m ? m[1] : raw.slice(0, 7) || "(detached)";
  } catch {
    return "(unknown)";
  }
}
