# 2026-05-06_0036_Yui_to_Cursor_CORTEX_CLI動作確認指示

FROM: Yui
TO: Cursor
DATE: 2026-05-06 00:36 JST
PROJECT: CORTEX
SOURCE: ChatGPT（Yui生成）
SAVED_BY: Cursor
PHASE: 動作確認

---

## 目的

実装済みの `cortex-status.mjs` の動作確認を行う。

---

## 作業内容

1. `cortex-status.mjs` をローカルで実行する  
2. 実行コマンドを明記する  
3. 実行結果をそのまま報告する  
4. Git状態（変更あり／なし）を報告する  
5. 問題点があれば修正案を提案する  

---

## 必須報告

- 実行コマンド
- 実行結果全文
- 現在のGit状態
- 修正必要性の有無

---

## 作業報告ルール

作業後は必ず報告MDを返すこと。

```text
作業
↓
記録
↓
報告
↓
次の判断
```

---

## 禁止事項

- 勝手な仕様変更
- 勝手な設計変更
- 無断リファクタリング
- 無断push

---

## 完了条件

CLIが正常に動き、
discussion / decisions / history / code の件数と最新情報が表示されること。
