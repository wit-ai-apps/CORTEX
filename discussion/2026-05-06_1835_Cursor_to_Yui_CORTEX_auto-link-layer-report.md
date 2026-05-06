# 2026-05-06_1835_Cursor_to_Yui_CORTEX_auto-link-layer-report

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 18:35 JST  
DATE_WORK_STARTED: 2026-05-06 18:25 JST  
DATE_WORK_FINISHED: 2026-05-06 18:35 JST  
DATE_COMMITTED: 2026-05-06 18:37 JST  
SOURCE_DATE: 2026-05-06 16:20 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1620_Yui_to_Cursor_CORTEX_auto-link-layer-init.md`  
SAVED_BY: Cursor  
PHASE: auto-link-layer-init  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001  

---

## 修正ファイル

- 新規: `scripts/update-index.mjs`
- 動作確認のため更新: `INDEX.md`（`LATEST_*` の表データ行のみ）

## 実施内容

- **`node scripts/update-index.mjs`** で `discussion/` / `decisions/` / `history/` / `context/` / `code/` の **`.md` を走査**（**`_template.md`・`INDEX.md` 除外**）。
- 先頭 **`YYYY-MM-DD_HHMM_`** があるファイル名を **ソートキー優先**、無い場合は **mtime（ Asia/Tokyo 表記）** で補助。各層 **最大5件**。
- メタ行 **`TOPIC:` / `DECISION:` / `SUMMARY:` / `CODE_NAME:` / `STATUS:`** があれば表に反映、無ければ `-` または見出し1行目を補助。context はファイル名から **`CTX-*` / `CLOCK-*`** を ID 列に抽出。
- **`INDEX.md` のセクション見出し・`CURRENT STATUS` / `NEXT_*` は保持**し、**各 `LATEST_*` 表のデータ行だけ差し替え**。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**

## 変更しなかったもの

- 各層の **テンプレート以外の MD 本文**（スクリプトは読み取りのみ）
- **`README`・`check-md.mjs` 等**（本指示の範囲外）

## 次回開始地点

- 記録を追加したあと **`node scripts/update-index.mjs`** を実行して **Master Index を再同期**する。
