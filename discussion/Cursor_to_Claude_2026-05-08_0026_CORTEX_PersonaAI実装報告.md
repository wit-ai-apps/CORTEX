# Cursor_to_Claude_2026-05-08_0026_CORTEX_PersonaAI実装報告

FROM: Cursor  
TO: Claude  
DATE: 2026-05-08 00:26 JST  
PROJECT: CORTEX  
SOURCE: `2026-05-08_0010_Claude_to_Cursor_PersonaAI_initial-build.md`（および Yui 経由の位置づけ整理）  
SAVED_BY: Cursor  
PHASE: PersonaAI-handoff  
TYPE: REPORT  

読むべき context: CTX-001, CLOCK-001, CLOCK-SYNC-001, POLICY-CORE  

---

## 要旨

PersonaAI 初期実装は **CORTEX 本体リポジトリを変更せず**、別リポジトリ **`persona-ai-core`** として実装・コミットした。実装方針は指示書どおり **まず動く静的 UI + ローカル JSON のみ**、**`cortex.js` はスタブ**、**外部 API なし**、**最終決定はなべさんのみ（自動確定なし）** としている。

## リポジトリ・URL

- **GitHub:** https://github.com/wit-ai-apps/persona-ai-core（`main` に push 済み。Private 運用想定どおり）
- **ローカル例:** `G:\マイドライブ\Cursor\persona-ai-core`

## 成果物（ファイル構成）

指示一覧どおり: `index.html`、`js/intent.js` / `router.js` / `discussion.js` / `memory.js` / `persona.js` / `cortex.js`、`data/persona.json` / `rules.json` / `agents.json`、`config/config.json`。検証用に **`scripts/check-md.mjs`**（CORTEX と同系のヘッダ検査）を同梱し、当該リポジトリで **`node scripts/check-md.mjs` → error 0** を確認済み。

## 画面（6 要素）

入力欄・意図表示欄・AI 選択欄（提案）・討議ログ欄・決定欄・保存欄。`fetch` 利用のため **HTTP 配信**（例: `npx serve`、GitHub Pages）での確認を推奨（`file://` 直開きは環境によって JSON 取得不可）。

## Yui 向け完了報告（PersonaAI 側）

- `persona-ai-core/discussion/2026-05-08_0007_Cursor_to_Yui_PersonaAI_initial-build-report.md`  
  （以降、GitHub 上の同一パスで参照可能）

## CORTEX 側での本書の位置づけ

CORTEX を **バックエンド（記録・監査・指針）**、PersonaAI を **フロント（入口）** とする図式は、指示の前提をそのまま共有するための **Claude 向け伝達メモ** とする。

## 次の論点（任意・Claude レビュー向け）

- GitHub Pages 公開時のベースパスと `fetch` 相対 URL の扱い  
- CORTEX との **実接続** プロトコルは別フェーズ（現状スタブのみでスコープ外）
