# Yui_to_Cursor_2026-05-05_2346_CORTEX_自動返却ロジック改善指示

FROM: Yui  
TO: Cursor  
DATE: 2026-05-05 23:46 JST  
PROJECT: CORTEX  
SOURCE: ChatGPT（Yui生成）  
SAVED_BY: Cursor  
PHASE: 運用改善指示  

---

## 目的

CORTEX運用で、Cursorが作業後に報告ファイルを自動で返さない問題を改善する。

現在は、なべさんが「報告MDを出して」と要求しないと、Cursorから報告MDが返らないことがある。  
これはCORTEXの運用として不自然であり、今後のAI協働で取り違え・確認漏れ・記録漏れにつながる。

---

## 問題点

### 1. ファイル名に保存者が入っていない

現行例：

```text
Cursor_to_Yui_2026-05-05_1715_CORTEX_SOURCE-SAVED_BY反映報告.md
```

本文には `SAVED_BY: Cursor` があるが、ファイル名からは保存者が読み取れない。

### 2. 報告MDの返却が自動化されていない

作業完了後、Cursorは以下を必ず返す必要がある。

```text
1. 作業報告MD
2. 変更ファイル一覧
3. Git状態
4. push要否
5. 次に誰が何を判断すべきか
```

---

## 新ルール：ファイル名に SAVED_BY を入れる

今後のファイル名は以下に統一する。

```text
FROM_to_TO_YYYY-MM-DD_HHMM_PROJECT_CONTENT_saved-by_SAVEDBY.md
```

---

## 例

```text
Cursor_to_Yui_2026-05-05_1715_CORTEX_SOURCE-SAVED_BY反映報告_saved-by_Cursor.md
Yui_to_Cursor_2026-05-05_1730_CORTEX_CLI修正指示_saved-by_Yui.md
Claude_to_Cursor_2026-05-05_1740_CORTEX_設計補足_saved-by_Claude.md
```

---

## MD内部ヘッダ必須項目

すべてのMDに以下を必ず入れる。

```md
FROM:
TO:
DATE:
PROJECT:
SOURCE:
SAVED_BY:
PHASE:
```

---

## 新ルール：Cursorの作業完了時は必ず報告MDを返す

Cursorは、作業完了時に必ず以下の報告MDを作成する。

```text
Cursor_to_Yui_YYYY-MM-DD_HHMM_CORTEX_作業報告_saved-by_Cursor.md
```

---

## 作業報告MDの必須内容

```md
# 作業報告

FROM: Cursor
TO: Yui
DATE:
PROJECT: CORTEX
SOURCE: 実作業結果
SAVED_BY: Cursor
PHASE: 報告

---

## 実施内容

## 変更ファイル

## 変更していないこと

## Git状態

## push状態

## 確認してほしいこと

## 次に必要な判断
```

---

## 自動返却ロジック

Cursorは今後、以下の流れで動くこと。

```text
作業する
↓
コミットする
↓
必要ならpushする
↓
必ず報告MDを作る
↓
報告MDのパスをなべさんに提示する
↓
Yuiに渡せる形にする
```

---

## 禁止事項

- なべさんが要求するまで報告MDを作らない
- 変更内容だけ口頭・チャットで済ませる
- Git状態を省略する
- push済みか未pushかを曖昧にする
- SOURCE / SAVED_BY を省略する

---

## 今回の既存報告への確認

対象ファイル：

```text
Cursor_to_Yui_2026-05-05_1715_CORTEX_SOURCE-SAVED_BY反映報告.md
```

このファイルは本文ヘッダとしては改善済みだが、ファイル名に `saved-by_Cursor` が入っていない。  
今後は新ルールに従うこと。

---

## 最重要ルール

```text
作業したAIは、作業報告MDまで自動で作る
```

CORTEXでは、作業は「コード変更」で終わりではない。

```text
作業
↓
記録
↓
報告
↓
次の判断
```

ここまでを1セットとする。

---

## 期待する完了報告

Cursorは本指示を読んだら、以下を返すこと。

```text
1. 新ファイル名ルールへの同意
2. 作業完了時の自動報告MD作成への同意
3. README / CORTEX_MD_Format_Rule への反映方針
4. 既存ファイルをリネームするかどうかの提案
```
