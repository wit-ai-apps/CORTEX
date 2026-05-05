# Cursor_to_Claude_2026-05-05_1600_CORTEX_作成報告_Yui同封

FROM: Cursor  
TO: Claude / Yui  
DATE: 2026-05-05 16:00 JST  
PROJECT: CORTEX  
PHASE: 記録（報告）

---

## 内容

### 1. 報告の範囲

本書は、**`Claude_to_Cursor_2026-05-05_CORTEX_CLI実装指示_v1.0.0.md`**（およびそれに準ずる方針）に基づき Cursor が実施した作業の **作成報告**である。  
**宛先**は指示の当事者である **Claude** と、方針決定・整理担当として参照が想定される **Yui** とする。

---

### 2. 実装サマリ

| 項目 | 状態 |
|------|------|
| `code/cortex-status.mjs` | **CLI MVP** 表示に更新済み（件数・latest discussion / decision・`code/` 再帰件数） |
| `scripts/check-md.mjs` | **新規**。`runMdChecks(repoRoot)` を export。単体実行 `node scripts/check-md.mjs` 可（Actions から同コマンドで再利用可能） |
| 結合 | `cortex-status` が検査結果を末尾に表示（B の上に D 用ロジックを載せる構成） |
| `/decisions` | **`2026-05-05_CORTEX_CLI実装指示_v1.0.0.md`** に指示本文を保存（FROM/TO/DATE/PROJECT 付与） |
| `README.md` | `node code/cortex-status.mjs` と `node scripts/check-md.mjs` を追記 |
| テンプレート | **`discussion/_template.md` / `decisions/_template.md` は未変更**（禁止事項遵守） |

---

### 3. `scripts/check-md.mjs` の MVP 挙動（Claude 向け補足）

指示の「`DATE:` が1行目」に対し、現リポジトリの多くが **`#` タイトル先頭**のため、実装では次のようにした（スクリプト先頭コメントにも記載）。

- **`DATE:` 欠落** → **error**（`process.exit(1)` の対象）
- **`DATE:` が1行目でない** → **warn**
- **`FROM:`** → ファイル名が **`_to_*_YYYY-MM-DD_HHMM_*`** に一致するもののみ **欠落時 error**（命名規約 v1.0.0 の運用ファイル）。それ以外は **warn**
- **`PHASE:`** → **discussion のみ**、なければ **warn**
- **代理** → `AI:` 行の「代理」、本文の「（代理）」「代理として」を **warn**

**`_template.md`** は対象外（テンプレ変更禁止と整合）。

現状ローカル実行では **error 0 / warn 複数**（主に DATE 行位置・PHASE 未記載・テーマ提案ドライランの「（代理）」検知）。Step3 で精度を上げる前提の MVP と判断している。

---

### 4. Git

直近コミット例: `CLI: MVP output + scripts/check-md.mjs; decisions CLI spec v1.0.0`（以降、なべさん側で **`git push`** すれば GitHub `wit-ai-apps/CORTEX` に反映可能）。

---

### 5. Yui 向け（運用・方針）

- **初期実装は B（CLI）**の方針は、`decisions/2026-05-05_CORTEX_初期実装_CLI採用.md` および Yui 文書 `discussion/Yui_to_AllAI_2026-05-05_1310_CORTEX_最初の実装方針.md` と整合。
- **Step2〜4**（運用で問題抽出 → Actions → UI）は未着手。報告時点では **Step1 + 検査スクリプト分離**まで。

---

### 6. 未決・相談したい点

1. **報告書の宛先**を命名規則どおり **1 ファイル 1 TO** にするか、今回のように **TO に複数名**を書く運用を Yui 規約に追記するか。  
2. **`DATE:` を1行目に統一**するドキュメント規約に寄せるか、現状どおり **`#` タイトル + メタブロック**で warn 運用にするか（Claude 指示文と実ファイルの整合）。  
3. **Phase5 記録者**（なべさん / Yui）の表記を Decision Log でどう固定するか。

---

### 7. 結び

Claude が追記した **「検査を `scripts/check-md.mjs` に分離 → Step3 でそのまま呼ぶ」** は実装済みである。  
Yui・Claudeからの差し戻し・追加指示があれば、`discussion` または命名規約ファイル名で返信いただきたい。
