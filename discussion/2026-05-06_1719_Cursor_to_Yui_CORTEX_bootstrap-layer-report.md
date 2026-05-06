# 2026-05-06_1719_Cursor_to_Yui_CORTEX_bootstrap-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:19 JST  
DATE_WORK_STARTED: 2026-05-06 17:19 JST  
DATE_WORK_FINISHED: 2026-05-06 17:19 JST  
DATE_COMMITTED: 2026-05-06 17:20 JST  
SOURCE_DATE: 2026-05-06 17:17 JST  
OS_TIME_AT_START: 2026-05-06 17:19:36 +09:00  
OS_TIME_AT_END: 2026-05-06 17:19:37 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 17:19:38 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1717_Yui_to_Cursor_CORTEX_bootstrap-layer-init.md`  
SAVED_BY: Cursor  
PHASE: bootstrap-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 作成ファイル

- `scripts/bootstrap-case.mjs`

## 実施内容

- **引数 `CASE_NAME`**（スラッグ化）を受け取り、**JST の `YYYY-MM-DD_HHMM`** を先頭に付けた以下を **テンプレ複製（`copyFileSync`）**で生成する。  
  - `discussion/_template.md` → `…_Yui_to_Cursor_CORTEX_discussion_{slug}.md`  
  - `history/_template.md` → `…_history_{slug}.md`  
  - `decisions/_template.md` → `…_decision_{slug}.md`  
  - `runbook/_template.md` → `…_runbook_{slug}.md`  
- 成功後 **`node scripts/update-index.mjs`** を **同一プロセスから `spawnSync` で実行**（失敗時は非ゼロ終了）。
- **実行確認**: `node scripts/bootstrap-case.mjs bootstrap-layer-e2e` を実行し、**4 ファイル生成と `update-index` 完了**を確認したうえで、**テストファイルは削除**。**`INDEX.md` は「既存ファイル変更禁止」に従い `git restore` で元に戻した**（手元の最新化が必要なら別途 `update-index` を実行）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- 新案件開始時: `node scripts/bootstrap-case.mjs <CASE_NAME>` のあと内容を編集する。
