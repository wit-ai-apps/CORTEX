# Cursor 永続ルール：ファイル保管場所（v1.1 転載）

FROM: Claude  
TO: Cursor  
DATE: 2026-05-18 JST  
VERSION: v1.1  
PROJECT: CORTEX / 横断運用  
TYPE: instruction  
PHASE: file-location-rules  
SOURCE: `2026-05-18_1910_instruction_Cursor-file-location-rules-v1.1.md`  
LOCKED: true

---

## 【Cursor 運用】毎回の成果は **日付フォルダ** に

**新規の一式は** `G:\マイドライブ\AI_VAULT\handoff\YYYY-MM-DD_HHMM_件名\` **を新設してその中に置く。**  
詳細: `G:\マイドライブ\Cursor\CORTEX\context\2026-05-18_1945_CONTEXT_Cursor_handoff-per-delivery-folders.md`

---

## 絶対ルール

すべての作業前にこのファイルを確認すること。  
保管場所を間違えた場合は即座に正しい場所に移動すること。

---

## ファイル保管場所一覧

| 種別 | 保管場所 |
|---|---|
| SmartPrice 実装ファイル（HTML/JS/CSS） | `G:\マイドライブ\Cursor\Smart Price\` |
| AI_VAULT 関連指示書・報告書 | `G:\マイドライブ\Cursor\` |
| GASファイル（Code.gs） | `G:\マイドライブ\AI_VAULT\handoff\` に保存 + GASエディタに貼り付け |
| 各AI成果物の受け渡し | `G:\マイドライブ\AI_VAULT\handoff\` |
| Claudeへの報告書 | `G:\マイドライブ\Claude\` |
| Gemini向けファイル | `G:\マイドライブ\GEMINI\` |
| 共有正本（全AI参照用） | `G:\マイドライブ\AI_VAULT\` |

---

## AI_VAULT フォルダ構造

```
G:\マイドライブ\AI_VAULT\
├── handoff/      ← 各AIの成果物受け渡し場所（Code.gs等）
├── discussion/
├── proposal/
├── decisions/
├── instructions/
├── reports/
├── history/
└── memory/
    ├── claude/
    ├── yui/
    ├── gemini/
    ├── cursor/
    └── shared/
```

---

## 各AIのローカルパス

| AI | ローカルパス |
|---|---|
| Claude | `G:\マイドライブ\Claude\` |
| Cursor | `G:\マイドライブ\Cursor\` |
| Gemini | `G:\マイドライブ\GEMINI\` |
| AI_VAULT（共有） | `G:\マイドライブ\AI_VAULT\` |

---

## 報告書の命名規則

```
YYYY-MM-DD_HHMM_[type]_[theme].md
```

type: `discussion` / `proposal` / `decision` / `instruction` / `report` / `history`

---

## 作業完了後の報告先

| 報告内容 | 保管場所 | 報告先 |
|---|---|---|
| GAS修正（Code.gs） | `G:\マイドライブ\AI_VAULT\handoff\` | Claude |
| SmartPrice実装報告 | `G:\マイドライブ\Cursor\Smart Price\` | Claude |
| AI_VAULT関連報告 | `G:\マイドライブ\AI_VAULT\reports\` | Claude |
| その他報告書 | `G:\マイドライブ\Claude\` | Claude |

---

## やってはいけないこと

- SmartPriceのファイルをAI_VAULTに入れない  
- AI_VAULTの指示書をSmart Priceフォルダに入れない  
- **GASファイルを handoff 以外のローカルに保存しない**（正のローカル・ミラーは `AI_VAULT\handoff\`）  
- 保管場所を自己判断で変更しない  

---

## GitHub（CORTEX リポジトリ）との関係

v1.1 までの **CORTEX `handoff/ai-vault-gas/`** は廃止し、**正の `Code.gs` は `AI_VAULT\handoff\ai-vault-gas\`** のみとする。履歴が必要な場合は **Git の過去コミット**を参照。

---

## 更新履歴

| 日付 | バージョン | 内容 |
|---|---|---|
| 2026-05-18 | v1.0 | 初版（Claude） |
| 2026-05-18 | v1.1 | handoff 追加・GAS 保管場所の明確化 |
| 2026-05-18 | — | Cursor が CORTEX `context` に v1.1 転載 |
