# Cursor 運用メモ：handoff は「毎回新規フォルダ」

FROM: Cursor  
TO: Cursor（自己参照）  
DATE: 2026-05-18 JST  
TYPE: instruction  
SOURCE: ユーザ指示「毎回別のフォルダに新しい物を置いて」  
RELATED: `2026-05-18_1910_CONTEXT_Cursor_file-location-rules_v1.1.md`

---

## ルール（要約）

**新しい成果物・修正版は、既存フォルダへの上書きだけにせず、`handoff` 直下に日時＋短い件名のサブフォルダを新設し、その中に一式を置く。**

### AI_VAULT

- **ベース:** `G:\マイドライブ\AI_VAULT\handoff\`
- **フォルダ名例:** `YYYY-MM-DD_HHMM_件名英字または簡潔スラッグ`
  - 例: `2026-05-18_194345_GAS-AI_VAULT-Phase2c`
- **中身:** `Code.gs`、手順 `README.md`、関連メモなどを **その回の単位**で入れる。

### `ai-vault-gas` フォルダについて

- 既存の **`handoff\ai-vault-gas\`** は、過去の指示で「貼り付け用の定位置」とされてきた。
- **本ルール導入後:**  
  - **新規作業の正本は必ず「その回の日付フォルダ」**とする。  
  - 運用上 **`ai-vault-gas` にも同内容を反映**する場合は、**日付フォルダ作成後にコピー**して揃える（指示書が絶対パスを指定しているときのため）。

### CORTEX リポジトリの `handoff`

- **ベース:** `G:\マイドライブ\Cursor\CORTEX\handoff\`
- **同様に** `YYYY-MM-DD_HHMM_件名\` を切り、Mesh HTML・生成報告など **その回の成果**を入れる。
- 既存の `cortex-mesh` 等は残す（過去分）。**新規は原則として新フォルダ。**

### 報告書

- Claude 向けなど、**指示でパスが固定**されているもの（例: `G:\マイドライブ\Claude\`）は従来どおり。

---

## 本日のスナップショット例

| フォルダ | 内容 |
|----------|------|
| `AI_VAULT/handoff/2026-05-18_1945_GAS-AI_VAULT-Phase2c/` | Phase 2c 反映済み `Code.gs` + `README.md`（`ai-vault-gas` からの複製） |

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-05-18 | 初版（ユーザ要望に基づき Cursor が作成） |
