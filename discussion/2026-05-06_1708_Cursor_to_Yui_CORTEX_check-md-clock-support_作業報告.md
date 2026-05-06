# CORTEX check-md CLOCK対応 作業報告

FROM: Cursor  
TO: Yui  
DATE_CREATED: 2026-05-06 17:08 JST  
DATE_WORK_STARTED: 2026-05-06 17:02 JST  
DATE_WORK_FINISHED: 2026-05-06 17:08 JST  
DATE_COMMITTED: 2026-05-06 17:10 JST  
SOURCE_DATE: 2026-05-06 15:46 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-06_1546_Yui_CORTEX_check-md-clock-support_cursor-instruction.md`  
SAVED_BY: Cursor  
PHASE: check-md-clock-support  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001  

---

## 修正ファイル

- `scripts/check-md.mjs`

## 実施内容

- 日時必須チェックを **`DATE:` または `DATE_CREATED:` のどちらか一方（または両方）**が先頭20行以内にあれば満たすよう変更。
- どちらもファイル内に存在しない場合は **error**。どちらかはあるが **いずれも20行目より後**だけにある場合は **warn**（従来の `DATE` 後置と同等の扱いに `DATE_CREATED` を含めた）。
- ファイル先頭コメントを上記仕様に1行追記。

## check-md結果

- `node scripts/check-md.mjs` → **error 0**（既存どおり warn のみ）。

## 変更しなかったもの

- `context/CLOCK-001.md`、`history/_template.md`、`history/HISTORY-INDEX.md` の本文（確認のみ）。
- `FROM:` / `PHASE:` / 代理警告 / `_saved-by_` 警告などその他の判定ロジック。

## 次回開始地点

- Clock 運用に沿った報告 MD では **`SOURCE_DATE`（指示書時刻）と `DATE_CREATED`（本稿作成時刻）を分ける**。
