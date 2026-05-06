# POLICY CORE

CORTEX の禁止事項・固定ルール（要約。詳細は各層・規約ファイルを参照する）。

---

## 命名ルール（固定）

- 新規の送受信・記録用 Markdown のファイル名は **`YYYY-MM-DD_HHMM_FROM_to_TO_CORTEX_内容.md`**（先頭は JST 実時刻、**`_to_` 固定**）を用いる。  
- 詳細は **`CORTEX_MD_Format_Rule_v1.0.0.md`** および **CTX-001** に従う。

---

## Clock ルール（固定）

- **`context/CLOCK-001.md`** に定義するとおり、`DATE_CREATED` / `DATE_WORK_*` / `DATE_COMMITTED` / `SOURCE_DATE` の役割を分離し、**混同しない**。

---

## Clock Sync ルール（固定）

- **`context/CLOCK-SYNC-001.md`** に定義するとおり、報告 MD では **`OS_TIME_AT_START` / `OS_TIME_AT_END` / `OS_TIME_AT_COMMIT`** を実機（PowerShell `Get-Date` 等）で取得し記録する。**指示書の時刻を `DATE_CREATED` に流用しない**。

---

## Archive ルール（固定）

- **`archive/`** 層は完了案件の**保管記録**用。**元ファイルを削除しない**（指示に反する場合を除く）。**`archive/_template.md`**・**ARCHIVE-INDEX** に従う。

---

## Workflow（固定）

- **`workflow/WORKFLOW-CORE.md`** の **START→END** の層接続順を基本とする（`cortex-status` → `check-md` → `discussion` → …）。

---

## Agent 責任（固定）

- **`agents/Yui.md` / `Cursor.md` / `Claude.md`** および **`agents/AGENT-INDEX.md`** に記載の役割・責任を前提とする。

---

## 過去ファイルの修正

- 各種指示で **「既存ファイル変更禁止」「過去ファイル変更禁止」** とある場合は **新規作成・最小差分のみ**に留め、無断で広範に書き換えない。

---

## UI

- **UI 変更禁止**。**指定時のみ**変更可（指示書・decision に明示された場合）。

---

## Policy 違反時（運用）

- **作業停止** → **`discussion` に記録** → **`decisions` で判断**。
