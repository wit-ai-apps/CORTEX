# CORTEX（コルテックス）

AI協働開発ワークスペース

---

## 目的

各AIが同じコードを読み、自由に提案・比較・異議を出す。  
なべさんが選び、採用理由を記録する。  
短期間で精度の高いアプリ開発を行う。

---

## フローモデル

```
Phase1：自由提案       → /discussion に記録
Phase2：全AI比較       → /discussion に記録
Phase3：グループ化     → /discussion に記録
Phase4：自己申告ラベル + 異議注記  → /discussion に記録
Phase5：なべさん選択   → /decisions に記録
Phase6：決定保存       → /decisions に記録
```

---

## フォルダ構成

| フォルダ | 役割 | 記録主体 |
|---|---|---|
| `/code` | コードの正本（常に最新） | Cursor・Claude Code |
| `/discussion` | Phase1〜4のAI提案・比較・異議 | 全AI |
| `/decisions` | Phase5〜6のなべさんの最終判断ログ | なべさん |
| `/history` | 重要な変更の要約（マイルストーン）を記録する場所 | 全員 |

> `/history` はGitのコミット履歴とは別物。  
> 「何が決まったか・何が変わったか」を人間が読める形で残す場所。

---

## 初期構築の担当

| 作業 | 担当 |
|---|---|
| GitHubリポジトリ作成 | なべさん |
| 初期ファイル配置（フォルダ・テンプレート） | Cursor |

---

## 最重要ルール

```
AIは提案・比較・整理する
なべさんが決める
決定は必ず記録する
```

---

## AIの役割

役割は固定しない。全AIが全フェーズに発言できる。  
得意分野は参考情報として扱う。

| AI | 得意分野（参考） |
|---|---|
| Claude | 設計・原因分析 |
| Cursor | 実装 |
| Gemini | 比較・別視点 |
| Yui | 全体整理・矛盾チェック |

---

## 採用しない方式

- 役割固定制
- 比較役固定
- 数値スコアリング
- AI主導の最終決定
- 完全自由で制御なし

---

## テンプレート

- AI提案・比較・異議 → `/discussion/_template.md`
- なべさんの判断ログ → `/decisions/_template.md`

---

## MD命名・送信フォーマット

他AIへ渡す指示・設計・結果の Markdown は、ファイル名と内部ヘッダを統一する。  

- **ファイル名（新規必須）:** `FROM_to_TO_YYYY-MM-DD_HHMM_CORTEX_内容_saved-by_保存者.md`（例: `_saved-by_Cursor`）  
- **ヘッダ必須:** `FROM` / `TO` / `DATE` / `PROJECT` / `SOURCE` / `SAVED_BY` / `PHASE`  

詳細は [CORTEX_MD_Format_Rule_v1.0.0.md](./CORTEX_MD_Format_Rule_v1.0.0.md)（Yui・v1.0.0）を参照する。  
**Decision Log**（`/decisions/_template.md`）にも上記を記載する。

**Cursor:** リポジトリへ変更を入れた作業の完了時は、**待たずに** `discussion` に `Cursor_to_Yui_*_作業報告_saved-by_Cursor.md` を追加する（`CORTEX_MD_Format_Rule` の「Cursor 作業完了時」を参照）。

---

## CLI（cortex-status）

初期実装は **案 B（CLI）**（`decisions/2026-05-05_CORTEX_初期実装_CLI採用.md`）。リポジトリのルートで:

```bash
node code/cortex-status.mjs
```

表示は **CLI MVP**（`decisions/2026-05-05_CORTEX_CLI実装指示_v1.0.0.md`）に準拠。続けて `scripts/check-md.mjs` の結果を表示する。

Markdown 検査のみ実行する場合:

```bash
node scripts/check-md.mjs
```

**Node.js** が必要。外部通信・トークンは使わない。

検査の詳細（`DATE:` が `#` 先頭のファイルは warn、命名規約ファイルの `FROM:` 欠落は error 等）は `scripts/check-md.mjs` 先頭コメントを参照。

---

## 内部実装名

このリポジトリの内部名は `ai-collab-workspace`。  
表の名称は **CORTEX（コルテックス）**。
