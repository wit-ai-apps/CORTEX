# CORTEX MD命名・送信フォーマット規約 v1.0.0

DATE: 2026-05-05 12:40 JST  
AUTHOR: Yui  
追記: SOURCE / SAVED_BY を必須ヘッダに追加（Yui）  
追記: ファイル名は **日時先頭** `YYYY-MM-DD_HHMM_FROM_to_TO_PROJECT_CONTENT.md` を正式とする（Yui 2026-05-06 00:42、なべさん要望で当日分反映）

---

## 目的

他AIへ渡す指示・設計・結果ファイルの形式を統一し、
混乱・誤認・取り違えを防ぐ。

---

## ファイル名ルール（正式・必須）

```text
YYYY-MM-DD_HHMM_FROM_to_TO_PROJECT_内容.md
```

- **先頭が日付・時刻**なので、GitHub の一覧が名前順＝概ね時系列になる。
- `TO` に **ハイフン**を含めてよい（例: `Claude-Cursor`、`AllAI`）。
- プロジェクト名は通常 **`CORTEX`**（例では `CORTEX` セグメントの直後に内容スラッグ）。
- **`_saved-by_` はファイル名に付けない**。保存者は **ヘッダの SAVED_BY**。

### レガシー（撤回済み・参照のみ）

次の形式のファイルはリポジトリに残りうる。**新規は使わない。**

```text
送信元_to_送信先_YYYY-MM-DD_HHMM_プロジェクト名_内容.md
```

必要に応じ段階的に **新形式へリネーム**してよい。

---

## 例

```text
2026-05-06_0042_Yui_to_AllAI_CORTEX_命名ルール時系列修正依頼.md
2026-05-06_0022_Yui_to_Claude-Cursor_CORTEX_命名ルール修正提案.md
2026-05-06_0030_Cursor_to_Yui_CORTEX_命名ルール修正_合意.md
```

---

## 定義（ヘッダ）

```text
FROM     = 発言主体
SOURCE   = 実生成元
SAVED_BY = リポジトリに保存した者
```

FROM と SAVED_BY が異なる例（代理保存）: `SAVED_BY: なべさん（代理）` 等を本文で明示。

---

## MD内部ヘッダ（必須）

```md
# タイトル

FROM: 送信元AI名
TO: 送信先AI名
DATE: YYYY-MM-DD HH:MM JST
PROJECT: プロジェクト名
SOURCE: 内容の出所・実生成元（例: ChatGPT、貼付元、口頭。なければ `SOURCE: なし` 等）
SAVED_BY: このファイルをリポジトリに保存した者
PHASE: フェーズ名（例: 1 / 2 / 記録 / 報告 / ルール修正提案）

---

## 内容
ここに本文を書く
```

---

## 必須項目

- FROM
- TO
- DATE
- PROJECT
- SOURCE
- SAVED_BY
- PHASE
- 内容（本文）

---

## Cursor 作業完了時（運用）

Cursor がリポジトリに変更を加えた作業の完了時は、**なべさんの要求を待たず**、`discussion` に **作業報告 MD** を1件追加する。

- **ファイル名（例）:** `2026-05-06_1234_Cursor_to_Yui_CORTEX_作業報告.md`（**日時先頭**。**`_saved-by_` は付けない。**）
- **本文:** 実施内容・変更ファイル一覧・変更しなかったこと・`git status` の要約・push 要否・確認事項・次に必要な判断

---

## 禁止事項

- ファイル名に「To」「From」を混在させる（`to` / `from` 小文字に統一）
- 日時を省略
- プロジェクト名を省略
- 内容が曖昧な名前（例：test.md）
- **新規**ファイル名に **`_saved-by_` を付与**すること（撤回済み）
- Cursor が **作業報告 MD なしで** リポジトリ変更の塊を完了扱いにすること

---

## 意図

```text
先頭に日時を置き GitHub 上の並びを時系列に近づける。誰から誰へは _to_ 部分で読む。保存者はヘッダの SAVED_BY。
```

---

## 結論

```text
CORTEXでは「MD＝命令単位」
```
