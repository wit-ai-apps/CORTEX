#!/usr/bin/env node
/**
 * CORTEX — 新規案件用の discussion / history / decisions / runbook 下書きをテンプレから生成する
 * 使い方: リポジトリルート相当で `node scripts/bootstrap-case.mjs CASE_NAME`
 * Node標準のみ。外部パッケージなし。
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function findRepoRoot() {
  let dir = path.resolve(__dirname, "..");
  for (;;) {
    if (fs.existsSync(path.join(dir, ".git"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return path.resolve(__dirname, "..");
    dir = parent;
  }
}

function slugify(caseName) {
  const s = caseName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || null;
}

/** @returns {{ date: string, hhmm: string }} */
function jstDateHhmm() {
  const d = new Date();
  const s = d.toLocaleString("sv-SE", { timeZone: "Asia/Tokyo", hour12: false });
  const [datePart, timePart] = s.split(" ");
  const [hh, mm] = timePart.split(":");
  return { date: datePart, hhmm: `${hh.padStart(2, "0")}${mm.padStart(2, "0")}` };
}

function copyTemplate(repoRoot, templateRel, destRel) {
  const src = path.join(repoRoot, ...templateRel.split("/"));
  const dest = path.join(repoRoot, ...destRel.split("/"));
  if (!fs.existsSync(src)) {
    throw new Error(`テンプレが見つかりません: ${templateRel}`);
  }
  if (fs.existsSync(dest)) {
    throw new Error(`既に存在します（中止）: ${destRel}`);
  }
  fs.copyFileSync(src, dest);
}

function main() {
  const raw = process.argv.slice(2).join("-").trim();
  if (!raw) {
    console.error(
      "bootstrap-case: CASE_NAME が必要です。\n例: node scripts/bootstrap-case.mjs smart-price-fix",
    );
    process.exit(1);
  }
  const slug = slugify(raw);
  if (!slug) {
    console.error("bootstrap-case: CASE_NAME から有効なスラッグを作れませんでした。");
    process.exit(1);
  }

  let repoRoot;
  try {
    repoRoot = findRepoRoot();
  } catch (e) {
    console.error(`bootstrap-case: ${e.message}`);
    process.exit(1);
  }

  const { date, hhmm } = jstDateHhmm();
  const stamp = `${date}_${hhmm}`;
  const base = `${stamp}_Yui_to_Cursor_CORTEX`;

  const plan = [
    ["discussion/_template.md", `discussion/${base}_discussion_${slug}.md`],
    ["history/_template.md", `history/${base}_history_${slug}.md`],
    ["decisions/_template.md", `decisions/${base}_decision_${slug}.md`],
    ["runbook/_template.md", `runbook/${base}_runbook_${slug}.md`],
  ];

  try {
    for (const [tpl, dest] of plan) {
      copyTemplate(repoRoot, tpl, dest);
      console.log(`bootstrap-case: 作成 ${dest}`);
    }
  } catch (e) {
    console.error(`bootstrap-case: ${e.message}`);
    process.exit(1);
  }

  const upd = spawnSync(process.execPath, [path.join(repoRoot, "scripts", "update-index.mjs")], {
    cwd: repoRoot,
    stdio: "inherit",
  });
  if (upd.status !== 0) {
    console.error("bootstrap-case: update-index.mjs が失敗しました（手動で実行してください）");
    process.exit(upd.status ?? 1);
  }

  console.log("bootstrap-case: 完了（INDEX 更新済み）");
}

main();
