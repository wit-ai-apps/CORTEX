# 2026-05-06_1845_Cursor_to_Yui_CORTEX_status-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 18:45 JST  
DATE_WORK_STARTED: 2026-05-06 18:38 JST  
DATE_WORK_FINISHED: 2026-05-06 18:45 JST  
DATE_COMMITTED: 2026-05-06 18:47 JST  
SOURCE_DATE: 2026-05-06 16:33 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1633_Yui_to_Cursor_CORTEX_status-layer-init.md`  
SAVED_BY: Cursor  
PHASE: status-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001  

---

## 作成ファイル

- `scripts/cortex-status.mjs`

## 実施内容

- **`node scripts/cortex-status.mjs`** で CORTEX の状態を表示（**読み取り専用**）。
- 各層で **`.md` のみ**、**`_template.md` / `INDEX.md` 除外**、先頭 **`YYYY-MM-DD_HHMM_`** を優先した並び（`update-index.mjs` と同趣旨）、無い場合は **mtime**。**最新1件**と**件数**を表示。
- **`[CORE]`** で `INDEX.md`・`scripts/check-md.mjs`・`scripts/update-index.mjs`・`scripts/cortex-status.mjs` の存在（OK / MISSING）を表示。
- **`code/cortex-status.mjs` は未変更**（既存のまま）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回開始地点

- 運用では **`node scripts/cortex-status.mjs`** を入口にし、必要に応じ **`check-md`** / **`update-index`** を実行する。
