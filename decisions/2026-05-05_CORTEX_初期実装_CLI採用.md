# Decision Log

DATE: 2026-05-05  
PROJECT: CORTEX  
ISSUE: CORTEXで最初に実装すべき機能は何か（Phase5〜6）

---

## 選択した案

SELECTED_PLAN: **案 B — CLI（`cortex-status`）**（Yui `Yui_to_AllAI_2026-05-05_1310_CORTEX_最初の実装方針.md` に基づく）

## 選択した理由

SELECTED_REASON:

- 現段階は運用確立フェーズであり、まだ壊れるものがないため、守る仕組み（案 D）は時期尚早と判断。
- 最優先は「動かすこと」。実際に回して初めて問題が見える。
- CLI は最小構成で全 AI が同一状態を確認でき、のちの API / UI へ拡張しやすい。

実行の段階方針: Step1 CLI → Step2 運用で問題抽出 → Step3 Actions（D）→ Step4 必要なら UI（A）。

## 却下した案（初手として）

| 案名 | 提案AI | 却下理由 |
|---|---|---|
| A ダッシュボード | 議論より | 初手ではスコープ・装飾寄りになりやすい（後続 Step4 で可） |
| C 枠のみ | 議論より | 検証・実感が薄い |
| D Actions | Yui 判断 | フォーマット崩壊は致命的だが、未発生問題への先行投資は後回し（Step3） |
| E 小さなAPI | 議論より | 初手でスコープ・秘密情報リスクが増えやすい |

## 次のアクション

NEXT_ACTION:

- [x] Step1: `/code` に `cortex-status`（CLI）を実装する（Cursor）
- [ ] Step2: 運用で問題を抽出し、`/discussion` に記録する
- [ ] Step3: GitHub Actions（案 D）を導入する
- [ ] Step4: 必要に応じ UI（案 A）を追加する

## 記録者

Yui（方針・最終決定の記録）。なべさんの追記・訂正があれば本ログを更新する。
