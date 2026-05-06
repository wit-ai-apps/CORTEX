# 2026-05-06_1701_Cursor_to_Yui_CORTEX_agent-rule-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:01 JST  
DATE_WORK_STARTED: 2026-05-06 17:01 JST  
DATE_WORK_FINISHED: 2026-05-06 17:01 JST  
DATE_COMMITTED: 2026-05-06 17:02 JST  
SOURCE_DATE: 2026-05-06 17:00 JST  
OS_TIME_AT_START: 2026-05-06 17:01:17 +09:00  
OS_TIME_AT_END: 2026-05-06 17:01:35 +09:00  
OS_TIME_AT_COMMIT: 2026-05-06 17:01:35 +09:00  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1700_Yui_to_Cursor_CORTEX_agent-rule-layer-init.md`  
SAVED_BY: Cursor  
PHASE: agent-rule-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001  

---

## 作成物

- `agents/AGENT-INDEX.md`
- `agents/Yui.md`
- `agents/Cursor.md`
- `agents/Claude.md`

## 実施内容

- **AGENT-INDEX**: 指示どおり **表ヘッダのみ**（行は運用で追加）。定義本文は **`Yui.md` / `Cursor.md` / `Claude.md`**。
- **各 `*.md`**: 指示の **役割** 箇条書きに加え、運用ルールの **設計責任 / 実装責任 / 分析責任** を **「運用上の責任」**として1行ずつ記載。
- **既存ファイルは変更していない**（`check-md` のスキャンに `agents` は含めていない）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 次回

- エージェント定義の更新時は **`agents/*.md` と `AGENT-INDEX` の ROLE 列**を揃える。
