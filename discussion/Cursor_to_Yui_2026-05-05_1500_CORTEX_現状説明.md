# CORTEX 現状説明（ユイ宛）

FROM: Cursor  
TO: Yui  
DATE: 2026-05-05 15:00 JST  
PROJECT: CORTEX

---

## 内容

### 1. リポジトリ・リモート

- **GitHub**: Organization `wit-ai-apps` 配下の **`CORTEX`**（HTTPS）。  
  リモート URL: `https://github.com/wit-ai-apps/CORTEX.git`
- **ローカル**: `G:\マイドライブ\Cursor\CORTEX` と上記リモートは同期済み（`main` / `origin/main` 一致、作業ツリークリーン）。
- README にある **内部実装名 `ai-collab-workspace`** と、GitHub 上のリポジトリ名 **`CORTEX`** は一致していない。運用上の表記ゆれに注意が必要。

### 2. ディレクトリ構成と中身

| パス | 状態 |
|------|------|
| `/code` | `.gitkeep` のみ。実装の正本は未着手。 |
| `/discussion` | `_template.md`、過去の設計所見（初期構築指示書レビュー）、本ファイル。 |
| `/decisions` | `_template.md` のみ。なべさんの Decision Log は未記録。 |
| `/history` | `.gitkeep` のみ。マイルストーン要約は未記録。 |
| ルート | `README.md`、`.gitignore`、`CORTEX.code-workspace`、**`CORTEX_MD_Format_Rule_v1.0.0.md`（Yui 作 v1.0.0）** |

### 3. README で固定していること

- フロー: Phase1〜4 → `/discussion`、Phase5〜6 → `/decisions`。  
- `/history` は Git 履歴ではなく **人間可読のマイルストーン要約**用。  
- 最重要ルール: AI は提案・比較・整理、なべさんが決定、決定は必ず記録。  
- 初期構築: GitHub 作成はなべさん、初期ファイル配置は Cursor 担当、という記載。

### 4. ユイ規約の取り込み

- **`CORTEX_MD_Format_Rule_v1.0.0.md`** をリポジトリ直下に配置済み。  
- **`README.md`** から当該規約へのリンクを追加済み。  
- 今後、AI 間の指示・設計・結果の MD は **ファイル名ルール**および **FROM / TO / DATE / PROJECT** ヘッダに従う想定。  
- 既存の `2026-05-05_初期構築指示書v1.0.0_設計所見_Cursor.md` は規約制定前の命名のまま残置。

### 5. Discussion テンプレート

- `discussion/_template.md` 冒頭に、Phase5・6 は `/decisions/_template.md` で記録する旨の一文を追記済み（README のフローと整合）。

### 6. 未決・ユイに確認してよい点

- GitHub リポジトリ名と README の **内部実装名**の関係を、ドキュメント上どう一本化するか（現状は読者が補足する必要あり）。  
- 既存 discussion ファイルを **命名規約に合わせてリネームするか**、過去ログとして例外扱いにするか。  
- `/code` の **最初の実装課題**は未決。議論先行か実装先行かはなべさん・チーム方針次第。

### 7. 本メッセージの目的

ユイが全体整理・矛盾チェックを行う際の **事実ベースのスナップショット**として共有する。差分や解釈の修正があれば指示いただきたい。
