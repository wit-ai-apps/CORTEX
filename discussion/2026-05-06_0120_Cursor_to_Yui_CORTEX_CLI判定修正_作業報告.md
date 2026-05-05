# 2026-05-06_0120_Cursor_to_Yui_CORTEX_CLI判定修正_作業報告

FROM: Cursor  
TO: Yui  
DATE: 2026-05-06 01:20 JST  
PROJECT: CORTEX  
SOURCE: `discussion/2026-05-06_0106_Yui_to_Cursor_CORTEX_CLI判定修正指示.md`  
SAVED_BY: Cursor  
PHASE: 報告  

---

## 実施内容

1. **`latest decision`:** `decisions` の最新算出から **`_template.md` を除外**。ログのみなら **先頭の非テンプレ .md**、該当なしなら **`none`**（`listMarkdownStats` の `excludeNamesFromLatest`）。
2. **`check-md` の DATE:** **先頭20行以内**に `DATE:` があれば **位置 warn なし**。21行目以降のみ warn。欠落は引き続き error。
3. **`decisions/_template.md`:** Yui 推奨どおり **`FROM: なべさん` / `TO: AllAI` / `PHASE: Decision`**（`ISSUE` 行はテンプレ運用のため維持）。
4. **指示本文**を `discussion/2026-05-06_0106_Yui_to_Cursor_CORTEX_CLI判定修正指示.md` に保存。

## 変更ファイル

| パス |
|------|
| `code/cortex-status.mjs` |
| `scripts/check-md.mjs` |
| `decisions/_template.md` |
| `discussion/2026-05-06_0106_Yui_to_Cursor_CORTEX_CLI判定修正指示.md` |
| `discussion/2026-05-06_0120_Cursor_to_Yui_CORTEX_CLI判定修正_作業報告.md`（本ファイル） |

## 実行コマンド

```powershell
cd "g:\マイドライブ\Cursor\CORTEX"
node code/cortex-status.mjs
```

## 実行結果

```
CORTEX STATUS

discussion files: 23
decisions files: 4
history files: 0
code files: 1

latest discussion: 2026-05-06_0106_Yui_to_Cursor_CORTEX_CLI判定修正指示.md
latest decision: 2026-05-05_CORTEX_CLI実装指示_v1.0.0.md

────────────────────────────────────────
check-md: error 0, warn 13
  （DATE 位置に関する warn は解消。残りは FROM 推奨・PHASE・代理検知など）
```

## Git状態

コミット直後はなべさん側で `git status` 確認。

## push状態

**無断 push しない**（指示どおり）。必要ならなべさんが `git push`。

## 確認してほしいこと

- `decisions/_template.md` の **`ISSUE:` 行を残した**こと（判定ログ実務用）。削除希望があれば指示ください。

## 次に必要な判断

- Claude レビュー連鎖の続き、または **check-md** の残 warn（FROM 推奨等）をいつ締めるか。
