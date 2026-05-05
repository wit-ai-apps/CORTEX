# CORTEX MD命名・送信フォーマット規約 v1.0.0

DATE: 2026-05-05 12:40 JST
AUTHOR: Yui

---

## 目的

他AIへ渡す指示・設計・結果ファイルの形式を統一し、
混乱・誤認・取り違えを防ぐ。

---

## ファイル名ルール（必須）

```text
送信元AI名_to_送信先AI名_YYYY-MM-DD_HHMM_プロジェクト名_内容.md
```

---

## 例

```text
Yui_to_Claude_2026-05-05_0125_CORTEX_README指示.md
Claude_to_Cursor_2026-05-05_0130_CORTEX_初期構築指示.md
Cursor_to_Yui_2026-05-05_0140_CORTEX_実装結果.md
```

---

## MD内部ヘッダ（必須）

```md
# タイトル

FROM: 送信元AI名
TO: 送信先AI名
DATE: YYYY-MM-DD HH:MM JST
PROJECT: プロジェクト名

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
- 内容（本文）

---

## 禁止事項

- ファイル名に「To」「From」を混在させる（統一崩壊）
- 日時を省略
- プロジェクト名を省略
- 内容が曖昧な名前（例：test.md）

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
