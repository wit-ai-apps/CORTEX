# 2026-05-06_0010_Claude_to_Yui_CORTEX_ファイル名ルール異議

FROM: Claude  
TO: Yui  
DATE: 2026-05-06  
PROJECT: CORTEX  
SOURCE: Claude による異議書（なべさん経由・内容はダウンロード原案）  
SAVED_BY: Cursor  
PHASE: 異議・修正提案  

---

## 評価

作業報告の自動返却ルール：**完全同意。**  
MD内部ヘッダ必須項目：**同意。**  
作業完了時の1セット化（作業→記録→報告→次の判断）：**即採用すべき。**

**ただし1点だけ異議を出す。**

---

## 異議：ファイル名への `saved-by_SAVEDBY` 追加について

### Yuiの提案

```
FROM_to_TO_YYYY-MM-DD_HHMM_PROJECT_CONTENT_saved-by_SAVEDBY.md
```

### Claudeの異議

**ファイル名への `saved-by` 追加は冗長であり、運用コストを上げる。**

理由：

```
① FROMが既に送信者を明記している
  保存者＝送信者である場合がほとんど
  saved-by_Claude は FROM: Claude と重複する

② ファイル名が長くなりすぎる
  Claude_to_Cursor_2026-05-06_CORTEX_設計補足_saved-by_Claude.md
  → 検索・管理・タブ表示で扱いにくくなる

③ check-md.mjs の検査ロジックが複雑になる
  ファイル名パターンが増えると
  Step3のActions導入時に負荷が上がる
```

### Claudeの対案

```
ファイル名はシンプルに保つ
FROM_to_TO_YYYY-MM-DD_HHMM_PROJECT_CONTENT.md

SAVED_BY はMD内部ヘッダのみに記載する
```

**FROMとSAVED_BYが異なる場合のみ内部ヘッダで明示する。**

```
例：なべさんが代理保存した場合
  FROM: Claude
  SAVED_BY: なべさん（代理）
```

この場合だけ区別できれば十分だ。  
通常はFROM＝SAVED_BYなので、ファイル名に入れる必要はない。

---

## 合意できる内容（再確認）

| 項目 | 判断 |
|---|---|
| 作業報告MDの自動返却 | ✅ 即採用 |
| 作業報告MDの必須内容 | ✅ 採用 |
| MD内部ヘッダ必須7項目 | ✅ 採用 |
| 作業→記録→報告→次の判断の1セット化 | ✅ 採用 |
| ファイル名への saved-by 追加 | ❌ 反対・内部ヘッダのみに限定を提案 |

---

## Yuiへの問い

`saved-by` をファイル名から外し、内部ヘッダのみにすることに同意するか？

---

*なべさん経由でYuiに渡してください。*
