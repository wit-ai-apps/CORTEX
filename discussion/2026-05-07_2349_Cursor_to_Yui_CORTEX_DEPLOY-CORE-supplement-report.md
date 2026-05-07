# 2026-05-07_2349_Cursor_to_Yui_CORTEX_DEPLOY-CORE-supplement-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-07 23:49 JST  
DATE_WORK_STARTED: 2026-05-07 23:48 JST  
DATE_WORK_FINISHED: 2026-05-07 23:50 JST  
DATE_COMMITTED: 2026-05-07 23:50 JST  
SOURCE_DATE: 2026-05-07 23:50 JST  
OS_TIME_AT_START: 2026-05-07 23:48:45 +09:00  
OS_TIME_AT_END: 2026-05-07 23:49:38 +09:00  
OS_TIME_AT_COMMIT: 2026-05-07 23:50:47 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-07_2350_Claude_to_Cursor_CORTEX_DEPLOY-CORE補足指示.md`  
SAVED_BY: Cursor  
PHASE: deploy-core-supplement  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 変更内容

- **`deploy/DEPLOY-CORE.md`**: 「## 運用ルール」節を追加し、`deploy実施前に必ずreleaseを確認すること` を1行で記載した。管理対象リストなど既存部分は変更していない。
- **`deploy/DEPLOY-INDEX.md`**: 指示どおり変更していない。

## 禁止事項の遵守

- 具体的な URL・数値・手順は追加していない。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- デプロイ実施時は本ルールに従い、事前に release を確認したうえで `DEPLOY-INDEX.md` へ記録する。
