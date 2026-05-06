#!/usr/bin/env node
/**
 * CORTEX — INDEX.md の LATEST_* 表を各フォルダの最新 .md から半自動更新する。
 * `node scripts/update-index.mjs`（リポジトリルート想定、外部通信なし）
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

function formatDateFromPrefix(d, hhmm) {
  return `${d} ${hhmm.slice(0, 2)}:${hhmm.slice(2, 4)} JST`;
}

function formatMtimeJST(ms) {
  const d = new Date(ms);
  const s = d.toLocaleString("sv-SE", {
    timeZone: "Asia/Tokyo",
    hour12: false,
  });
  const [date, time] = s.split(" ");
  const [hh, mm] = time.split(":");
  return `${date} ${hh}:${mm} JST`;
}

function parseSortEntry(basename, stat) {
  const m = basename.match(PREFIX_RE);
  if (m) {
    return {
      primary: 1,
      sortKey: `${m[1]}_${m[2]}`,
      displayDate: formatDateFromPrefix(m[1], m[2]),
    };
  }
  return {
    primary: 0,
    sortKey: String(stat.mtimeMs).padStart(20, "0"),
    displayDate: formatMtimeJST(stat.mtimeMs),
  };
}

function listLatestMd(repoRoot, relDir, limit) {
  const dir = path.join(repoRoot, relDir);
  if (!fs.existsSync(dir)) return [];
  const items = [];
  for (const name of fs.readdirSync(dir)) {
    if (!name.endsWith(".md") || name === "_template.md" || name === "INDEX.md") continue;
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (!st.isFile()) continue;
    const pe = parseSortEntry(name, st);
    items.push({ name, path: fp, ...pe });
  }
  items.sort((a, b) => {
    if (a.primary !== b.primary) return a.primary ? -1 : 1;
    return b.sortKey.localeCompare(a.sortKey);
  });
  return items.slice(0, limit);
}

function readFileLimited(fp, max = 96_000) {
  try {
    const buf = fs.readFileSync(fp);
    const t = buf.toString("utf8");
    return t.length > max ? t.slice(0, max) : t;
  } catch (e) {
    throw new Error(`read failed: ${fp}: ${e.message}`);
  }
}

function metaValue(text, key) {
  const re = new RegExp(`^${key}:\\s*(.*)$`, "m");
  const m = text.match(re);
  if (!m) return null;
  const v = m[1].trim();
  return v || null;
}

function firstHeading(text) {
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}

function textAfterHeading(text, heading) {
  const lines = text.split(/\r?\n/);
  const idx = lines.findIndex((l) => l.trim() === `# ${heading}`);
  if (idx === -1) return null;
  for (let i = idx + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    if (t.startsWith("#")) return null;
    return t;
  }
  return null;
}

function escCell(s) {
  if (s == null || s === "") return "-";
  return String(s)
    .replace(/\r?\n/g, " ")
    .replace(/\|/g, "\\|")
    .slice(0, 240);
}

function row(cells) {
  return "| " + cells.map(escCell).join(" | ") + " |";
}

function contextIdFromFilename(name) {
  const m = name.match(/(CTX-\d+|CLOCK-\d+)/i);
  return m ? m[1].toUpperCase() : "-";
}

function buildDiscussionRows(files) {
  return files.map((f) => {
    const text = readFileLimited(f.path);
    const topic = metaValue(text, "TOPIC") || firstHeading(text) || "-";
    const status = metaValue(text, "STATUS") || "-";
    return row([f.displayDate, f.name, topic, status]);
  });
}

function buildDecisionRows(files) {
  return files.map((f) => {
    const text = readFileLimited(f.path);
    const dec =
      metaValue(text, "DECISION") || textAfterHeading(text, "DECISION") || metaValue(text, "ISSUE") || "-";
    const status = metaValue(text, "STATUS") || "-";
    return row([f.displayDate, f.name, dec, status]);
  });
}

function buildHistoryRows(files) {
  return files.map((f) => {
    const text = readFileLimited(f.path);
    const sum =
      metaValue(text, "SUMMARY") || textAfterHeading(text, "SUMMARY") || firstHeading(text) || "-";
    const status = metaValue(text, "STATUS") || "-";
    return row([f.displayDate, f.name, sum, status]);
  });
}

function buildContextRows(files) {
  return files.map((f) => {
    const text = readFileLimited(f.path);
    const id = contextIdFromFilename(f.name);
    const sum = metaValue(text, "SUMMARY") || firstHeading(text) || "-";
    const status = metaValue(text, "STATUS") || "-";
    return row([id, f.name, sum, status]);
  });
}

function buildCodeRows(files) {
  return files.map((f) => {
    const text = readFileLimited(f.path);
    const cn = metaValue(text, "CODE_NAME") || firstHeading(text) || "-";
    const status = metaValue(text, "STATUS") || "-";
    return row([f.displayDate, f.name, cn, status]);
  });
}

/** @param {string[]} lines @param {string} section @param {string[]} newDataRows */
function injectTableDataRows(lines, section, newDataRows) {
  const h = `# ${section}`;
  const startIdx = lines.findIndex((l) => l.trim() === h);
  if (startIdx === -1) throw new Error(`INDEX.md にセクションが見つかりません: ${section}`);

  let i = startIdx + 1;
  while (i < lines.length && lines[i].trim() === "") i++;
  if (i >= lines.length || !lines[i].trimStart().startsWith("|")) {
    throw new Error(`INDEX.md「${section}」直下に表がありません`);
  }
  const headerLineIdx = i++;
  if (i >= lines.length || !lines[i].includes("---")) {
    throw new Error(`INDEX.md「${section}」の表区切り行がありません`);
  }
  const sepLineIdx = i++;
  const dataStart = i;
  while (i < lines.length && lines[i].trimStart().startsWith("|")) {
    const t = lines[i].trim();
    if (/^\|[\s\-:|]+\|\s*$/.test(t)) break;
    i++;
  }
  const dataEnd = i;
  const out = [...lines.slice(0, dataStart), ...newDataRows, ...lines.slice(dataEnd)];
  return out;
}

function main() {
  const repoRoot = findRepoRoot();
  const indexPath = path.join(repoRoot, "INDEX.md");
  if (!fs.existsSync(indexPath)) {
    console.error("update-index: INDEX.md が見つかりません（リポジトリルートに配置してください）");
    process.exit(1);
  }

  const limit = 5;
  const disc = listLatestMd(repoRoot, "discussion", limit);
  const decs = listLatestMd(repoRoot, "decisions", limit);
  const hist = listLatestMd(repoRoot, "history", limit);
  const ctx = listLatestMd(repoRoot, "context", limit);
  const code = listLatestMd(repoRoot, "code", limit);

  let lines = fs.readFileSync(indexPath, "utf8").split(/\r?\n/);

  lines = injectTableDataRows(lines, "LATEST DISCUSSION", buildDiscussionRows(disc));
  lines = injectTableDataRows(lines, "LATEST DECISION", buildDecisionRows(decs));
  lines = injectTableDataRows(lines, "LATEST HISTORY", buildHistoryRows(hist));
  lines = injectTableDataRows(lines, "LATEST CONTEXT", buildContextRows(ctx));
  lines = injectTableDataRows(lines, "LATEST CODE", buildCodeRows(code));

  const next = lines.join("\n");
  fs.writeFileSync(indexPath, next, "utf8");
  console.log(
    `update-index: 完了（discussion ${disc.length}, decisions ${decs.length}, history ${hist.length}, context ${ctx.length}, code ${code.length} 件を反映）`,
  );
}

main();
