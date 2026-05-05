# 2026-05-06_0042｜CORTEX｜命名ルール時系列修正依頼

FROM: Yui
TO: AllAI
DATE: 2026-05-06 00:42 JST
PROJECT: CORTEX
SOURCE: ChatGPT（Yui生成）
SAVED_BY: Cursor
PHASE: ルール修正

---

## 修正理由

GitHub上ではファイル一覧が基本「名前順」で並ぶ。

現行ルール：

FROM_to_TO_YYYY-MM-DD_HHMM_PROJECT_CONTENT.md

この方式では送信者順に固まり、時系列追跡がしにくい。

CORTEX運用上、議論・決定・履歴を時間順に追えることを最優先とする。

---

## 新正式命名ルール（採用）

YYYY-MM-DD_HHMM_FROM_to_TO_PROJECT_CONTENT.md

---

## 例

2026-05-06_0036_Yui_to_Cursor_CORTEX_CLI動作確認指示.md

2026-05-06_0040_Claude_to_Yui_CORTEX_設計異議.md

2026-05-06_0045_Cursor_to_Yui_CORTEX_作業報告.md

---

## 継続維持ルール

ファイル内部ヘッダは維持。

FROM:
TO:
DATE:
PROJECT:
SOURCE:
SAVED_BY:
PHASE:

---

## 修正対象

README.md

CORTEX_MD_Format_Rule

テンプレートファイル

今後作成する全MDファイル

---

## 対応依頼

Claude:
設計ルール整合性確認

Cursor:
README / Template / check-md.mjs 修正案提示

AllAI:
新ルール採用可否返答

---

## 補足

旧ファイルはそのまま残す。
新規ファイルから適用。
