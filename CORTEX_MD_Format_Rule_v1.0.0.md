# CORTEX MD命名・送信フォーマット規約 v1.0.0

DATE: 2026-05-05 12:40 JST  
AUTHOR: Yui  
追記: SOURCE / SAVED_BY を必須ヘッダに追加（Yui）  
追記: ファイル名末尾 `_saved-by_保存者`、ヘッダに PHASE 必須、Cursor の作業完了時は報告 MD 必須（Yui 2026-05-05 23:46）

---

## 目的

他AIへ渡す指示・設計・結果ファイルの形式を統一し、
混乱・誤認・取り違えを防ぐ。

---

## ファイル名ルール（必須）

```text
送信元_to_送信先_YYYY-MM-DD_HHMM_プロジェクト名_内容_saved-by_保存者.md
```

`保存者` はリポジトリに書き込んだ者（AI 名または人名）。英数字推奨（例: `Cursor`, `Yui`, `Claude`）。

### レガシー互換

既存の `_saved-by_` なしファイルは当面リポジトリに残りうる。**新規作成・新規追補は必ず上記形式**とする。

---

## 例

```text
Cursor_to_Yui_2026-05-05_1715_CORTEX_SOURCE-SAVED_BY反映報告_saved-by_Cursor.md
Yui_to_Cursor_2026-05-05_2346_CORTEX_自動返却ロジック改善指示_saved-by_Cursor.md
Claude_to_Cursor_2026-05-05_1740_CORTEX_設計補足_saved-by_Claude.md
```

---

## MD内部ヘッダ（必須）

```md
# タイトル

FROM: 送信元AI名
TO: 送信先AI名
DATE: YYYY-MM-DD HH:MM JST
PROJECT: プロジェクト名
SOURCE: 内容の出所・根拠（例: 貼付元ファイル名、チャット、口頭、URL）
SAVED_BY: このファイルをリポジトリに保存した者（人名または AI 名）
PHASE: フェーズ名（例: 1 / 2 / 記録 / 報告 / 運用改善指示）

---

## 内容
ここに本文を書く
```

---

## 必須項目

- FROM（誰が書いたか）
- TO（誰に渡すか）
- DATE（日時）
- PROJECT（対象プロジェクト）
- SOURCE（上記。根拠・出自がない場合は `SOURCE: なし` 等と明示）
- SAVED_BY（誰がコミット／保存したか）
- PHASE（議論の段階・文書種別の明示）
- 内容（本文）

---

## Cursor 作業完了時（運用）

Cursor がリポジトリに変更を加えた作業の完了時は、**なべさんの要求を待たず**、`discussion` に次の形式で **作業報告 MD** を1件追加する。

- ファイル名: `Cursor_to_Yui_YYYY-MM-DD_HHMM_CORTEX_作業報告_saved-by_Cursor.md`（内容サマリの語は課題に合わせてよいが、`_saved-by_Cursor` は必須）
- 本文: 実施内容・変更ファイル一覧・変更しなかったこと・`git status` の要約・push 要否・Yui / なべさんへの確認事項・次に必要な判断

---

## 禁止事項

- ファイル名に「To」「From」を混在させる（統一崩壊）
- 日時を省略
- プロジェクト名を省略
- 内容が曖昧な名前（例：test.md）
- **新規**送受・報告 MD で **`_saved-by_` をファイル名から省略**すること
- Cursor が **作業報告 MD なしで** リポジトリ変更の塊を完了扱いにすること

---

## 意図

```text
ファイル名だけで中身が分かる状態を作る
```

---

## 結論

```text
CORTEXでは「MD＝命令単位」
```
