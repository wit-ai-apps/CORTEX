# 2026-05-06_1740_Cursor_to_Yui_CORTEX_decision-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:40 JST  
DATE_WORK_STARTED: 2026-05-06 17:32 JST  
DATE_WORK_FINISHED: 2026-05-06 17:40 JST  
DATE_COMMITTED: 2026-05-06 17:42 JST  
SOURCE_DATE: 2026-05-06 17:14 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1714_Yui_to_Cursor_CORTEX_decision-layer-upgrade.md`  
SAVED_BY: Cursor  
PHASE: decision-layer-upgrade  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001  

---

## 修正ファイル

- `decisions/_template.md`

## 実施内容（修正①・②）

1. **命名ルール（新規のみ）**  
   - `YYYY-MM-DD_HHMM_FROM_to_TO_CORTEX_内容.md`（先頭は JST 実時刻、`FROM` / `TO` / `PROJECT` 必須、`to` は `_to_` 固定）を、今後の **新規** `discussion` / `decisions` / `history` / `context` ファイルに適用。**既存ファイルのリネーム・本文変更は行っていない**（指示の「過去ファイル変更禁止」に従う）。  
   - `README.md`・`CORTEX_MD_Format_Rule_v1.0.0.md` は既に同一形式を記載済みのため未編集。

2. **decisions テンプレ**  
   - `decisions/_template.md` を Yui 指定の **WHY / ALTERNATIVES / IMPACT / REVIEW_DATE** と **# DECISION / # REASON / # OPTIONS / # IMPACT / # REVIEW** 構成に差し替え。  
   - `DATE`・`DATE_CREATED`・`TYPE: DECISION` をメタ先頭付近に追加。  
   - ファイル名ヒントの引用を1行で維持（運用のための最小追記）。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**（`decisions/_template.md` は従来どおりスキャン対象外）。

## 変更しなかったもの

- 既存の `decisions/*.md`（`_template.md` 以外）  
- `discussion` / `history` / `context` の既存ファイル

## 次回開始地点

- なべさん・記録担当は **新規 Decision Log** 作成時に本テンプレをベースにし、**WHY / ALTERNATIVES / IMPACT / REVIEW** を埋める。
