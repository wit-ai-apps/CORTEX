# Cursor_to_AllAI_2026-05-05_1800_CORTEX_GitHub反映手順

FROM: Cursor  
TO: AllAI  
DATE: 2026-05-05 18:00 JST  
PROJECT: CORTEX  
SOURCE: なべさんへの説明要請（ターミナル種別・push 方法）  
SAVED_BY: Cursor  
PHASE: 記録（運用メモ）

---

## 内容

### 用語

| 言い方 | 意味 |
|--------|------|
| **自分のターミナル** | なべさんの PC で動いている **Cursor の「ターミナル」パネル**（多くは **PowerShell**。cmd / Git Bash でも可） |
| **エージェントのターミナル** | AI（Cursor の Composer 等）が **ツール経由で起動するシェル**。**なべさんの PC と同じであるとは限らない** |

---

### 推奨: 自分のターミナルから `git push` する（いちばん簡単・確実）

1. Cursor で **ターミナル**を開く（表示 → ターミナル ／ ショートカットは環境依存）。
2. リポジトリへ移動する。

```powershell
cd "G:\マイドライブ\Cursor\CORTEX"
```

3. 状態を確認する。

```powershell
git status
```

4. 未コミットの変更があるなら、コミットしてから送る。

```powershell
git add -A
git commit -m "変更内容の一言"
```

5. GitHub に送る（**1 回の push で、まだ上がっていないコミットはまとめて送られる**）。

```powershell
git push
```

- 初回だけ **`git push -u origin main`** が必要な場合がある。その後は多くは `git push` だけでよい。
- 認証は **HTTPS** なら GCM（ブラウザログイン）や **PAT** など、**自分の PC に設定されている方法**が使われる。

---

### 「エージェントのターミナル」からアップさせる場合

AI 側がターミナルツールで `git push` を実行することは**できる場合がある**が、次の理由で **最優先の手段にはしない方がよい**。

- **GitHub 認証**（トークン・鍵）がエージェント環境に無いと **失敗**する。
- **作業ディレクトリ**が、なべさんの `G:\...` と一致しないことがある。
- 成功しても、**なべさんが自分のリポジトリ状態を把握しにくい**。

**まとめ:** 日々の反映は **自分のターミナルで `git push`** が標準。エージェント経由は補助や再現が必要なときの検討用。

---

### うまくいったかの見方

- `git push` の出力に **`main -> main`** など成功表示がある。
- ブラウザで `https://github.com/wit-ai-apps/CORTEX` を開き、**最新コミット・ファイル**が見える。

---

### よくあるエラー（目安）

| 様子 | 考えられる対処 |
|------|----------------|
| `rejected (non-fast-forward)` | 先に `git pull`（必要なら相談のうえ `git pull --rebase`）してから `git push`。 |
| 認証エラー | PAT・権限・リポジトリへの書き込み権を確認。 |
| `Everything up-to-date` | 送る新しいコミットは無い（済み）。 |

---

### 補足: GitHub に「指示」を出すコマンド？

日常の **ファイルを載せる**作業の本体は **`git add` → `git commit` → `git push`**。  
Issue や Pull Request は **ブラウザ**で操作するか、別途 **GitHub CLI（`gh`）** を使う（必須ではない）。
