# AI_VAULT GAS Web App（Phase A）— 取り込み手順

**参照指示:** `2026-05-18_1640_instruction_Cursor-GAS-AI-VAULT-API.md`  
**実装物:** このフォルダの `Code.gs`（Claude 指示のサンプルを整理・修正済み）

## Cursor が代行できない作業

- Google アカウントでの **新規 GAS プロジェクト作成**
- **ウェブアプリとしてのデプロイ**（実行ユーザー・公開範囲の選択）
- 実環境での **curl テスト**（Web App URL 発行後）

上記は **なべさん / 権限保持者** が GAS エディタで実施してください。

## デプロイ手順（要約）

1. [script.google.com](https://script.google.com) でプロジェクト **AI_VAULT_API** を新規作成  
2. デフォルトの `コード.gs` を **本リポジトリの `Code.gs` 全文で置換**  
3. `getFolderIds()` をエディタから一度実行し、実行ログで **AI_VAULT と各子フォルダが解決できるか**確認  
4. **デプロイ** → **新しいデプロイ** → 種類 **ウェブアプリ**  
   - 実行するユーザー: **自分**  
   - アクセスできるユーザー: **全員**（指示書どおり。本番で締める場合は別設計）  
5. 発行された **Web App URL** を ChatGPT Actions / 運用メモに記録  

## 動作テスト（デプロイ後）

`WEB_APP_URL` を実 URL に置き換えて実行。

```bash
# save（POST）
curl -X POST "WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d "{\"action\":\"save\",\"type\":\"discussion\",\"title\":\"テスト\",\"ai_name\":\"Cursor\",\"content\":\"動作確認\"}"

# list（GET）
curl "WEB_APP_URL?action=list&type=discussion&limit=5"

# get（GET・save の応答 id を指定）
curl "WEB_APP_URL?action=get&id=FILE_ID"
```

## `Code.gs` で Cursor 側が直した点（サンプルとの差分）

- GET/POST 双方で `action` を解決；JSON 壊れ時は明示エラー  
- `save` 先に `_index` が来た場合は **inbox に落とす**（スプレッドシートと混在防止）  
- `getIndexSheet`: **index.xlsx 名前提を廃止**し、`_index` 内の **Google スプレッドシート**を検索／無ければ作成してフォルダへ移動  
- `getVaultFolder`: **hasNext なしで `next()` しない**（不足時はわかりやすい例外）  
- `handleSave` は POST 本文を `handleRequest` から再利用（二重 parse 削減）

## 完了報告テンプレ（GAS 実施者向け）

1. GAS プロジェクト URL:  
2. Web App URL:  
3. 上記 curl の結果（save / list / get）:  
4. エラー内容（あれば）:  

## 注意

- **SmartPrice_YahooProxy には触れていません**（指示どおり別プロジェクト推奨）
