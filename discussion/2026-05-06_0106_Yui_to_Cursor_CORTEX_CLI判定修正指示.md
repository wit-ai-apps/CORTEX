# 2026-05-06_0106_Yui_to_Cursor_CORTEX_CLI判定修正指示

FROM: Yui
TO: Cursor
DATE: 2026-05-06 01:06 JST
PROJECT: CORTEX
SOURCE: Claudeレビュー回答を受けたYui判断
SAVED_BY: Cursor
PHASE: 修正指示

---

## 目的

Claudeレビューを受けて、`cortex-status.mjs` と関連テンプレートの最小修正を行う。

今回の修正対象は **3点のみ** とする。

---

## 採用するClaudeレビュー

以下を採用する。

1. `latest decision` から `_template.md` を除外する
2. `DATE:` 位置チェックを「タイトル後メタブロック許容」に変更する
3. `decisions/_template.md` に `FROM:` を追加する

---

## 修正対象1：latest decision 判定

### 現状

`decisions/_template.md` が latest decision として表示される場合がある。

### 問題

`_template.md` は判断ログではなく、ひな型である。

### 修正内容

`latest decision` の算出対象から以下を除外する。

```text
_template.md
```

該当するDecision Logが存在しない場合は、以下を表示する。

```text
latest decision: none
```

---

## 修正対象2：DATEチェック

### 現状

`DATE:` が1行目にない場合にwarnが出る。

### 問題

CORTEXの正式MD構造は以下。

```md
# タイトル

FROM:
TO:
DATE:
PROJECT:
SOURCE:
SAVED_BY:
PHASE:
```

そのため、`DATE:` が1行目でないことは正常である。

### 修正内容

`DATE:` がタイトル後のメタブロック内に存在する場合はwarnを出さない。

目安：

```text
先頭20行以内に DATE: があればOK
```

---

## 修正対象3：decisions/_template.md

### 修正内容

`decisions/_template.md` に `FROM:` を追加する。

推奨メタブロック：

```md
FROM: なべさん
TO: AllAI
DATE:
PROJECT:
SOURCE:
SAVED_BY:
PHASE: Decision
```

---

## 過去ファイルの扱い

過去ファイルは修正しない。

理由：

```text
過去ファイルは当時のルールで作成された履歴であり、CORTEXの歴史そのもの
```

今後の新規ファイルから新ルールを適用する。

---

## 保留事項

以下は今回は修正しない。

```text
code files の件数から cortex-status.mjs を除外するかどうか
```

理由：

`cortex-status.mjs` 自体も `/code` 配下の管理対象コードであるため、現時点ではカウント対象のままとする。

---

## 禁止事項

- 過去ファイルの一括修正
- 勝手な命名ルール変更
- 追加機能の実装
- UI作成
- 外部通信追加
- 無断push

---

## 作業後の報告

作業完了後は、必ず報告MDを作成すること。

ファイル名ルール：

```text
YYYY-MM-DD_HHMM_Cursor_to_Yui_CORTEX_CLI判定修正_作業報告.md
```

報告内容：

```md
## 実施内容
## 変更ファイル
## 実行コマンド
## 実行結果
## Git状態
## push状態
## 確認してほしいこと
## 次に必要な判断
```

---

## 完了条件

1. `latest decision` に `_template.md` が表示されない
2. Decision Logがなければ `none` と表示される
3. 正式メタブロック内の `DATE:` でwarnが出ない
4. `decisions/_template.md` に `FROM:` がある
5. 報告MDが返却される
