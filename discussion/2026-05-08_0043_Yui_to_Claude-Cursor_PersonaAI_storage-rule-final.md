# PersonaAI保存ルール確定指示書（B案採用）

FROM: Yui
TO: Claude / Cursor
DATE: 2026-05-08 00:43 JST
PROJECT: PersonaAI / CORTEX
SOURCE: 保存ルール最終決定
SAVED_BY: Nabe
PHASE: storage-rule-final
TYPE: INSTRUCTION

---

## 決定

B案採用。

過去ファイルは移動しない。

今後作成分から新ルール適用。

---

## 理由

CORTEX固定ルール：

過去ファイルは修正しない。

これを優先する。

過去移動による問題：

- git履歴汚染
- 参照リンク破損
- 監査履歴崩壊

これを防ぐ。

---

## 保存ルール（確定）

### 過去ファイル

そのまま残す。

場所：

CORTEX/discussion

---

### 今後の設計文書

保存先：

CORTEX

対象：

discussion
decisions
history
audit
release
policy

---

### 今後の実装コード

保存先：

persona-ai-core

対象：

index.html
js/
data/
config/

---

### 今後の実装報告

保存先：

persona-ai-core/reports

対象：

build report
test report
deploy report

---

## 指示

Claude：
設計監査継続

Cursor：
このルールで今後保存すること

既存ファイル移動禁止
