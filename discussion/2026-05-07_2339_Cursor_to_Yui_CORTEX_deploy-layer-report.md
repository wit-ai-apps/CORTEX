# 2026-05-07_2339_Cursor_to_Yui_CORTEX_deploy-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-07 23:39 JST  
DATE_WORK_STARTED: 2026-05-07 23:38 JST  
DATE_WORK_FINISHED: 2026-05-07 23:40 JST  
DATE_COMMITTED: 2026-05-07 23:40 JST  
SOURCE_DATE: 2026-05-06 17:45 JST  
OS_TIME_AT_START: 2026-05-07 23:38:15 +09:00  
OS_TIME_AT_END: 2026-05-07 23:39:11 +09:00  
OS_TIME_AT_COMMIT: 2026-05-07 23:40:06 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1745_Yui_to_Cursor_CORTEX_deploy-layer-init.md`  
SAVED_BY: Cursor  
PHASE: deploy-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 作成物

- `deploy/DEPLOY-CORE.md`
- `deploy/DEPLOY-INDEX.md`

## 実施内容

- **`DEPLOY-CORE.md`**: 管理対象として production deploy／test deploy／rollback deploy／deploy URL／deploy target の列挙のみ。具体 URL や数値は記載していない。
- **`DEPLOY-INDEX.md`**: 表ヘッダ（DATE／FILE／DEPLOY_NAME／STATUS）のみ。データ行は運用で追加する想定。
- **運用ルール**（deploy 前の release 確認必須）は指示書を正とし、CORE には未記載。本報告で言及する。
- **既存ファイルは変更していない**（本件は `deploy/` 新規および本報告のみ）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- デプロイ実施時に **`DEPLOY-INDEX.md` に1行追加**し、名前・状態・日付を蓄積する。実施前に release の確認を行う。
