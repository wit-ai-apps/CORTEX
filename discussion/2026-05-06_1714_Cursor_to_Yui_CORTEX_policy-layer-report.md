# 2026-05-06_1714_Cursor_to_Yui_CORTEX_policy-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:14 JST  
DATE_WORK_STARTED: 2026-05-06 17:14 JST  
DATE_WORK_FINISHED: 2026-05-06 17:14 JST  
DATE_COMMITTED: 2026-05-06 17:15 JST  
SOURCE_DATE: 2026-05-06 17:13 JST  
OS_TIME_AT_START: 2026-05-06 17:14:51 +09:00  
OS_TIME_AT_END: 2026-05-06 17:14:52 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 17:14:53 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1713_Yui_to_Cursor_CORTEX_policy-layer-init.md`  
SAVED_BY: Cursor  
PHASE: policy-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001  

---

## 作成物

- `policy/POLICY-CORE.md`
- `policy/POLICY-INDEX.md`

## 実施内容

- **POLICY-CORE**: 指示の **命名 / Clock / Clock Sync / Archive / Workflow / Agent / 過去ファイル / UI** をセクション化し、**違反時フロー**（作業停止→discussion→decision）を末尾に記載。既存規約・各層ファイルへの参照は**パス・要点のみ**（本文の全面複製はしない）。
- **POLICY-INDEX**: 表ヘッダのみ。
- **既存ファイルは変更していない**。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- ポリシー追加・改定は **`POLICY-CORE.md` を更新**し、必要なら **`POLICY-INDEX.md` に行追加**。
