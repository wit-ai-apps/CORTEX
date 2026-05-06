# 2026-05-06_1657_Cursor_to_Yui_CORTEX_archive-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 16:57 JST  
DATE_WORK_STARTED: 2026-05-06 16:57 JST  
DATE_WORK_FINISHED: 2026-05-06 16:57 JST  
DATE_COMMITTED: 2026-05-06 16:58 JST  
SOURCE_DATE: 2026-05-06 16:56 JST  
OS_TIME_AT_START: 2026-05-06 16:57:18 +09:00  
OS_TIME_AT_END: 2026-05-06 16:57:34 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 16:57:54 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1656_Yui_to_Cursor_CORTEX_archive-layer-init.md`  
SAVED_BY: Cursor  
PHASE: archive-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001  

---

## 作成物

- `archive/`（新規）
- `archive/_template.md`
- `archive/ARCHIVE-INDEX.md`

## 実施内容

- **`_template.md`**: **TYPE: ARCHIVE** と移管メタ、**# SUMMARY**〜**# NEXT REFERENCE**（指示どおり）。
- **`ARCHIVE-INDEX.md`**: 表ヘッダのみ。
- **運用（指示要約）**: 完了した discussion / decision / history / code 記録を対象に **archive へ保管記録**。**元ファイルは削除しない**。
- **既存ファイルは変更していない**（`check-md` のスキャン対象に `archive` は含めていない）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- 完了案件が決まったら **`archive/_template.md` 相当の記録**を追加し、**`ARCHIVE-INDEX.md` に1行登録**する。
