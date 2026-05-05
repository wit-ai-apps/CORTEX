#!/usr/bin/env node
/**
 * CORTEX — Markdown ヘッダ MVP 検査（Step3 の Actions から `node scripts/check-md.mjs` で再利用可能）
 * ローカルのみ。外部通信なし。
 *
 * MVP ルール（指示書との差分）:
 * - `discussion/_template.md` と `decisions/_template.md` は対象外。
 * - `DATE:` は先頭行でなくてもよい。欠落のみ error、先頭以外は warn。
 * - `FROM:` はファイル名が `_to_*_YYYY-MM-DD_HHMM_*` 形式のとき必須（欠落は error）。それ以外は warn。
 * - `PHASE:` は discussion のみ warn で検査。
 * - 代理: `AI:` 行の「代理」、本文の「（代理）」「代理として」を warn。
 * - ファイル名に `_saved-by_` が含まれる場合は warn（2026-05-06 命名ルールで撤回済み。旧ファイルは段階的に除去可）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @typedef {{ level: "error" | "warn"; file: string; msg: string }} Issue */

/**
 * @param {string} repoRoot
 * @returns {{ issues: Issue[] }}
 */
export function runMdChecks(repoRoot) {
  /** @type {Issue[]} */
  const issues = [];

  const scanDirs = [
    { rel: "discussion", requirePhase: true },
    { rel: "decisions", requirePhase: false },
  ];

  for (const { rel, requirePhase } of scanDirs) {
    const dir = path.join(repoRoot, rel);
    if (!fs.existsSync(dir)) continue;

    const names = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of names) {
      if (!ent.isFile() || !ent.name.endsWith(".md")) continue;
      if (ent.name === "_template.md") continue;

      const filePath = path.join(dir, ent.name);
      const relFile = path.join(rel, ent.name).replace(/\\/g, "/");
      if (ent.name.includes("_saved-by_")) {
        issues.push({
          level: "warn",
          file: relFile,
          msg: "ファイル名に _saved-by_（命名ルール撤回済み 2026-05-06）。新規は付けず、旧ファイルは段階的にリネーム可",
        });
      }
      let text;
      try {
        text = fs.readFileSync(filePath, "utf8");
      } catch {
        issues.push({ level: "error", file: relFile, msg: "read failed" });
        continue;
      }

      const lines = text.split(/\r?\n/);

      // DATE: 仕様は「1行目」だが CORTEX 実ファイルは # タイトル先頭が多い → 先頭ブロック内を検査
      const dateLineIndex = lines.findIndex((l) => /^DATE:\s*\S/.test(l.trim()));
      if (dateLineIndex === -1) {
        issues.push({ level: "error", file: relFile, msg: "DATE: が見つからない（先頭付近に必須）" });
      } else if (dateLineIndex !== 0) {
        issues.push({
          level: "warn",
          file: relFile,
          msg: `DATE: が1行目にない（現在 ${dateLineIndex + 1} 行目）。MVP 推奨は先頭かメタ直後`,
        });
      }

      const strictHandoff = /_to_.+_\d{4}-\d{2}-\d{2}_\d{4}_/.test(ent.name);
      const requireFromError = strictHandoff;

      const hasFrom = lines.slice(0, 45).some((l) => /^FROM:\s*\S/.test(l.trim()));
      if (!hasFrom) {
        if (requireFromError) {
          issues.push({ level: "error", file: relFile, msg: "FROM: が見つからない（命名規約ファイルでは必須）" });
        } else {
          issues.push({ level: "warn", file: relFile, msg: "FROM: 推奨" });
        }
      }

      if (requirePhase) {
        const hasPhase = lines.slice(0, 45).some((l) => /^PHASE:\s*\S/.test(l.trim()));
        if (!hasPhase) {
          issues.push({ level: "warn", file: relFile, msg: "PHASE: なし（discussion では推奨）" });
        }
      }

      // AI: 行に「代理」
      for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (/^AI:\s/.test(t) && /代理/.test(t)) {
          issues.push({ level: "warn", file: relFile, msg: `L${i + 1}: AI: 行に「代理」を検知` });
        }
      }
      if (/（代理）/.test(text)) {
        issues.push({ level: "warn", file: relFile, msg: "本文に「（代理）」を検知" });
      }
      if (/代理として/.test(text)) {
        issues.push({ level: "warn", file: relFile, msg: "本文に「代理として」を検知" });
      }
    }
  }

  return { issues };
}

function printIssues(issues) {
  if (issues.length === 0) {
    console.log("check-md: 指摘なし（MVP）");
    return;
  }
  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");
  console.log(`check-md: error ${errors.length}, warn ${warns.length}`);
  for (const i of issues) {
    console.log(`  [${i.level}] ${i.file}: ${i.msg}`);
  }
}

function findRepoRootFromScripts() {
  let dir = path.resolve(__dirname, "..");
  for (;;) {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(__dirname, "..");
    dir = parent;
  }
}

function isMain() {
  const a = process.argv[1];
  if (!a) return false;
  try {
    return path.resolve(a) === path.resolve(__filename);
  } catch {
    return false;
  }
}

if (isMain()) {
  const repoRoot = findRepoRootFromScripts();
  const { issues } = runMdChecks(repoRoot);
  printIssues(issues);
  const hasError = issues.some((i) => i.level === "error");
  process.exit(hasError ? 1 : 0);
}
