# 2026-05-06_1735_Cursor_to_Yui_CORTEX_release-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:35 JST  
DATE_WORK_STARTED: 2026-05-06 17:35 JST  
DATE_WORK_FINISHED: 2026-05-06 17:35 JST  
DATE_COMMITTED: 2026-05-06 17:36 JST  
SOURCE_DATE: 2026-05-06 17:34 JST  
OS_TIME_AT_START: 2026-05-06 17:35:33 +09:00  
OS_TIME_AT_END: 2026-05-06 17:35:34 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 17:35:34 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1734_Yui_to_Cursor_CORTEX_release-layer-init.md`  
SAVED_BY: Cursor  
PHASE: release-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 作成物

- `release/_template.md`
- `release/RELEASE-INDEX.md`
- `release/RELEASE-CORE.md`

## 実施内容

- **`_template.md`**: **TYPE: RELEASE**、**RELEASE_NAME** / **VERSION** / **STATUS** / **TARGET**、**# SUMMARY**〜**# RESULT**（指示どおり）。
- **`RELEASE-INDEX.md`**: **VERSION** 列付きの表ヘッダのみ。
- **`RELEASE-CORE.md`**: **作成内容③**の **管理対象**リストのみ。**運用ルール**（リリース時は必ず release 記録作成）は指示書を正とし CORE には未記載。
- **既存ファイルは変更していない**。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- リリースのたびに **`release/_template.md` ベースの記録**を追加し、**`RELEASE-INDEX.md` に行追加**。
