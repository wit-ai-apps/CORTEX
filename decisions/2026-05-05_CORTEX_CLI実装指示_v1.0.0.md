# Decision Log：CORTEX 初期実装はB案CLIを採用

FROM: Yui（Claude編集）  
TO: Cursor  
DATE: 2026-05-05  
PROJECT: CORTEX

---

## PROJECT

CORTEX

---

## ISSUE

CORTEXで最初に実装すべき機能は何か。

---

## SELECTED_PLAN

```text
B案：CLI cortex-status 相当の要約表示
```

---

## SELECTED_REASON

なべさん判断により、CORTEXの初期実装は **B案（CLI）** を採用する。

理由は以下。

1. 最小構成で早く動かせる
2. 全AIが同じ状態を確認しやすい
3. 先に運用を回すことで、実際の問題点が見える
4. 後から GitHub Actions やダッシュボードへ拡張しやすい

---

## REJECTED_PLANS

| 案 | 内容 | 今回採用しない理由 |
|---|---|---|
| A | ローカル用ダッシュボード | 初手ではUIに引っ張られるため後回し |
| C | 最小プロジェクト枠のみ | 動作確認としての価値が弱い |
| D | GitHub ActionsでMD命名・ヘッダ検査 | 重要だが、運用課題が見えてから導入する（Step3で必ず入れる） |
| E | ローカル限定API | 初手としてはスコープが広がりすぎる |

---

## NEXT_ACTION

Cursorは次を実施すること。

1. `/code` に `cortex-status` の最小実装を作る
2. 対象はローカルのリポジトリ構成を読むだけにする
3. 外部通信・トークン・API連携は入れない
4. 表示内容は最小限にする
5. **検査ロジックは `scripts/check-md.mjs` として独立させる**

> （Claude追記）  
> 5番が重要。検査ロジックをCLI本体に埋め込まず独立ファイルにしておくと、  
> Step3でGitHub Actionsに移行するとき `node scripts/check-md.mjs` をそのまま呼べる。  
> BがDの土台になる、Cursorが言った通りの設計にする。

---

## CLI MVP仕様

初期版は以下を表示できればよい。

```text
CORTEX STATUS

discussion files: 件数
decisions files: 件数
history files: 件数
code files: 件数

latest discussion: ファイル名
latest decision: ファイル名 or none
```

---

## フォーマット検査MVP仕様（scripts/check-md.mjs）

最小限のチェック項目は以下とする。

```text
✅ DATE: が1行目にあるか
✅ FROM: が含まれているか
✅ PHASE: が含まれているか（discussionのみ）
✅ AI: の欄が「代理」でないか（代理記述の検知）
```

> （Claude追記）  
> 代理記述の検知は今回のドライランの教訓から来ている。  
> `[未記入: AI名]` 形式になっているか、または他AIの節を代筆していないかをチェックする。  
> 完璧でなくていい。Step3で精度を上げる。

---

## IMPORTANT RULES

```text
動かす → 問題を知る → 守る
```

今回の目的は完成品を作ることではなく、CORTEXを初めて動かすことである。

---

## 禁止事項

- フォルダ構成の変更
- テンプレートの変更
- 外部API・トークンの使用
- スコープ外の機能追加

---

## RECORD

この判断を `/decisions` に保存すること。

---

*ClaudeはDを推していた。しかしBの設計にDへの道を埋め込むことで、この判断は正しくなる。*
