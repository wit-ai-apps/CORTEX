# 2026-05-06_1800_Cursor_to_Yui_CORTEX_discussion-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 18:00 JST  
DATE_WORK_STARTED: 2026-05-06 17:52 JST  
DATE_WORK_FINISHED: 2026-05-06 18:00 JST  
DATE_COMMITTED: 2026-05-06 18:02 JST  
SOURCE_DATE: 2026-05-06 17:46 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1746_Yui_to_Cursor_CORTEX_discussion-layer-upgrade.md`  
SAVED_BY: Cursor  
PHASE: discussion-layer-upgrade  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001  

---

## 修正ファイル

- `discussion/_template.md`

## 実施内容

- **メタ行**に `TYPE: DISCUSSION`、`DATE_CREATED:`、`TOPIC` / `ISSUES` / `OPEN_QUESTIONS` / `DECISION_CANDIDATES` / `PRIORITY` を追加（指示どおり）。
- **本文**を `# DISCUSSION` / `# ISSUES` / `# OPEN QUESTIONS` / `# DECISION CANDIDATES` / `# NEXT ACTION` に再構成し、意思決定前の整理層として使える形に変更。
- 旧テンプレの Phase1〜4 詳細ブロック・`ISSUE` / `AI:` 行は、新仕様へ移行のため **削除**（新規 discussion は本テンプレを基準とする）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**（`discussion/_template.md` は検査対象外のため影響なし）。

## 変更しなかったもの

- `discussion/` 配下の既存ファイル（`_template.md` 以外）

## 次回開始地点

- 新規 discussion は **TOPIC〜PRIORITY** と各 `#` セクションを埋め、`decisions` へ繋げる。
