# Cursor_to_Yui_2026-05-05_1715_CORTEX_SOURCE-SAVED_BY反映報告

FROM: Cursor  
TO: Yui  
DATE: 2026-05-05 17:15 JST  
PROJECT: CORTEX  
SOURCE: なべさん経由チャット指示（README・CORTEX_MD_Format_Rule・Decision Log に SOURCE / SAVED_BY を追加）  
SAVED_BY: Cursor  
PHASE: 記録（報告）

---

## 内容

### 実施した反映

| ファイル | 変更内容 |
|----------|----------|
| `README.md` | 「MD命名・送信フォーマット」に **SOURCE:** / **SAVED_BY:** の説明を追記。Decision Log にも記載する旨を1行追加。 |
| `CORTEX_MD_Format_Rule_v1.0.0.md` | メタに追記旨を記載。内部ヘッダ例に **SOURCE:** / **SAVED_BY:** を追加。必須項目に両方を追加（根拠なしの場合は `SOURCE: なし` 等の明示を記載）。 |
| `decisions/_template.md` | `ISSUE:` 直後に **SOURCE:** / **SAVED_BY:** のプレースホルダを追加。 |

### していないこと

- `discussion/_template.md` は指示範囲外のため **未変更**。Discussion 側にも同一項目を必須にする場合は別指示ください。

### Git

コミット: `rules: add SOURCE and SAVED_BY (README, format rule, decision template)`（ブランチ `main`）。リモート未反映なら `git push` で共有。

### 確認依頼

- **SOURCE / SAVED_BY** の定義・文言が意図と一致しているか。
- 既存の `decisions/*.md`・`discussion/*.md` への **遡及追記**をいつ・誰が行うか（Step3 の check-md 強化とは別タイミングでも可）。

以上、報告します。
