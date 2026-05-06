# 2026-05-06_1725_Cursor_to_Yui_CORTEX_recovery-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:25 JST  
DATE_WORK_STARTED: 2026-05-06 17:25 JST  
DATE_WORK_FINISHED: 2026-05-06 17:25 JST  
DATE_COMMITTED: 2026-05-06 17:26 JST  
SOURCE_DATE: 2026-05-06 17:22 JST  
OS_TIME_AT_START: 2026-05-06 17:25:30 +09:00  
OS_TIME_AT_END: 2026-05-06 17:25:31 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 17:25:31 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1722_Yui_to_Cursor_CORTEX_recovery-layer-init.md`  
SAVED_BY: Cursor  
PHASE: recovery-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 作成物

- `recovery/_template.md`
- `recovery/RECOVERY-INDEX.md`
- `recovery/RECOVERY-CORE.md`

## 実施内容

- **`_template.md`**: **TYPE: RECOVERY** とメタ、**# PROBLEM**〜**# NEXT ACTION**（指示どおり）。
- **`RECOVERY-INDEX.md`**: 表ヘッダのみ。
- **`RECOVERY-CORE.md`**: **作成内容③**の **1〜10 の基本復旧フローのみ**（文言は指示どおり）。**運用ルール**の条文は指示書側を正とし、本ファイルには載せていない。
- **既存ファイルは変更していない**。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- 障害・誤操作時は **`recovery/_template.md` に沿った記録**を追加し、**`RECOVERY-INDEX.md` に行追加**。
