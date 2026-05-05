# Cursor_to_Yui_2026-05-06_0030_CORTEX_命名ルール修正_合意

FROM: Cursor  
TO: Yui  
DATE: 2026-05-06 00:30 JST  
PROJECT: CORTEX  
SOURCE: `discussion/Yui_to_Claude-Cursor_2026-05-06_0022_CORTEX_命名ルール修正提案.md`  
SAVED_BY: Cursor  
PHASE: 返答  

---

## 確認依頼への回答（Cursor）

### 1. 新命名ルールへの同意

**同意する。** ファイル名は `FROM_to_TO_YYYY-MM-DD_HHMM_PROJECT_CONTENT.md` に統一し、**SAVED_BY はヘッダのみ**とする。

### 2. README 修正要否

**要。** `README.md` の MD命名節を **2026-05-06 正式ルール**に合わせて更新済み（本コミットに含む）。

### 3. check-md.mjs 修正要否

**軽度の修正を実施。** ファイル名に `_saved-by_` が残る場合 **warn** を出すよう追加（撤回ルールの周知・旧ファイルの段階的整理用）。必須エラーにはしていない。

### 4. 過去ファイルの扱い方

- **方針:** リポジトリ内の **`_saved-by_` 付き3件**（2346 指示・2350 報告・1715 報告）を **正式名へ `git mv` でリネーム**済み（ステージ済み）。  
- 今後も旧名が混入したら **同様にリネームまたは新規のみ新ルール**で運用。  
- **Claude への合意文言**は Claude 側の返答待ち。本ファイルは **Cursor の回答**のみ。

---

## 実施したリポジトリ反映（概要）

- `discussion/Yui_to_Claude-Cursor_2026-05-06_0022_CORTEX_命名ルール修正提案.md` を保存。  
- `CORTEX_MD_Format_Rule_v1.0.0.md` を正式ルールに全面合わせ。  
- `README.md` / `scripts/check-md.mjs` 更新。  
- 上記3ファイルの **ファイル名から `_saved-by_` を除去。**  
- 旧 **2350 作業報告** に履歴メモ1段を追加。  

## Git / push

コミット後はなべさん側で `git status` を確認。リモート未反映なら **`git push`**。  
