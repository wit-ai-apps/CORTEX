# Cursor 永続ルール：ファイル保管場所（v1.0 転載）

FROM: Claude  
TO: Cursor  
DATE: 2026-05-18 JST  
PROJECT: CORTEX / 横断運用  
TYPE: instruction  
PHASE: file-location-rules  
SOURCE: `2026-05-18_1850_instruction_Cursor-file-location-rules.md`  
LOCKED: true（指示書どおり）

---

以下、原文要点転載。作業前に参照すること。

## 絶対ルール

すべての作業前にこのファイルを確認すること。  
保管場所を間違えた場合は即座に正しい場所に移動すること。

## ファイル保管場所一覧

| 種別 | 保管場所 |
|---|---|
| SmartPrice 実装ファイル（HTML/JS/CSS） | `G:\マイドライブ\Cursor\Smart Price\` |
| AI_VAULT 関連指示書・報告書 | `G:\マイドライブ\Cursor\` |
| GASファイル（Code.gs） | GASエディタに直接貼り付け（ローカル保存不要） |
| Claudeへの報告書 | `G:\マイドライブ\Claude\` |
| Gemini向けファイル | `G:\マイドライブ\GEMINI\` |
| 共有正本（全AI参照用） | `G:\マイドライブ\AI_VAULT\` |

## 各AIのローカルパス

| AI | ローカルパス |
|---|---|
| Claude | `G:\マイドライブ\Claude\` |
| Cursor | `G:\マイドライブ\Cursor\` |
| Gemini | `G:\マイドライブ\GEMINI\` |
| AI_VAULT（共有） | `G:\マイドライブ\AI_VAULT\` |

## 報告書の命名規則

```
YYYY-MM-DD_HHMM_[type]_[theme].md
```

type 一覧: `discussion` / `proposal` / `decision` / `instruction` / `report` / `history`

## 作業完了後の報告先

| 報告内容 | 保管場所 | 報告先 |
|---|---|---|
| GAS修正報告 | `G:\マイドライブ\Claude\` | Claude |
| SmartPrice実装報告 | `G:\マイドライブ\Cursor\Smart Price\` | Claude |
| AI_VAULT関連報告 | `G:\マイドライブ\AI_VAULT\reports\` | Claude |

## やってはいけないこと

- SmartPriceのファイルをAI_VAULTに入れない  
- AI_VAULTの指示書をSmart Priceフォルダに入れない  
- GASファイルをローカルに保存しない（GASエディタで直接管理）  
- 保管場所を自己判断で変更しない  

---

## Cursor 作業メモ（リポジトリとの関係）

LOCKED ルールでは **GAS はローカル非保存**。当リポジトリの `handoff/ai-vault-gas/Code.gs` は **チーム共有・差分追跡用のミラー** とする。**正本は Google の GAS エディタ**。矛盾が解消されたらミラーの扱いを Yui / Claude と再確認すること。

## 更新履歴

| 日付 | 内容 |
|---|---|
| 2026-05-18 | v1.0 初版（Claude）を CORTEX context に転載 |
| 2026-05-18 | Cursor 作業メモを追記 |
