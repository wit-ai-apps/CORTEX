/**
 * AI_VAULT_API — GAS Web App (Phase A + Phase2 メタ情報)
 * 手順: script.google.com で新規プロジェクト AI_VAULT_API を作成し、本ファイルを Code.gs に貼り付けてデプロイ。
 * 参照: 2026-05-18_1640_instruction_Cursor-GAS-AI-VAULT-API.md
 *       2026-05-18_1820_instruction_Cursor-GAS-Phase2-metadata.md
 *       2026-05-18_1840_instruction_Cursor-GAS-tags-fix.md
 *
 * 前提: Google ドライブに「AI_VAULT」フォルダと以下の子フォルダが存在すること。
 *   _index, inbox, discussion, proposal, decisions, instructions, reports, history, memory
 * memory 配下: claude, yui, gemini, cursor, shared
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var action = null;
  var body = null;

  if (e.parameter && e.parameter.action) {
    action = String(e.parameter.action);
  }

  if (e.postData && e.postData.contents) {
    try {
      body = JSON.parse(e.postData.contents);
      if (!action && body.action) {
        action = String(body.action);
      }
    } catch (ex) {
      return jsonResponse({ error: "invalid JSON body: " + ex.message });
    }
  }

  if (!action) {
    return jsonResponse({ error: "action is required (query param or JSON body)" });
  }

  try {
    switch (action) {
      case "save":
        return jsonResponse(handleSave(e, body));
      case "list":
        return jsonResponse(handleList(e));
      case "get":
        return jsonResponse(handleGet(e));
      case "search":
        return jsonResponse(handleSearch(e));
      default:
        return jsonResponse({ error: "unknown action: " + action });
    }
  } catch (err) {
    return jsonResponse({
      success: false,
      error: err.message || String(err),
      stack: err.stack || "",
    });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Actions ---------- */

function handleSave(e, body) {
  try {
    if (!body) {
      try {
        body = JSON.parse(e.postData.contents);
      } catch (ex) {
        return {
          success: false,
          error: "save requires JSON POST body: " + ex.message,
          stack: ex.stack || "",
        };
      }
    }

    var type = body.type || "inbox";
    var title = body.title || "untitled";
    var ai_name = String(body.ai_name || "unknown");
    var content = String(body.content || "");
    var project = String(body.project || "AI_VAULT");
    var version = String(body.version || "");
    var session_id = String(body.session_id || "");
    var parent_id = String(body.parent_id || "");
    var source = String(body.source || body.ai_name || "");
    var tagsNorm = Array.isArray(body.tags) ? body.tags.join(",") : String(body.tags || "");

    // _index はインデックス用フォルダのため保存先にしない
    if (type === "_index") {
      type = "inbox";
    }

    var now = new Date();
    var dateStr = Utilities.formatDate(now, "Asia/Tokyo", "yyyy-MM-dd_HHmm");
    var fileName = dateStr + "_" + type + "_" + sanitize(title) + ".md";
    var dateJst = Utilities.formatDate(now, "Asia/Tokyo", "yyyy-MM-dd HH:mm");

    var folder = getVaultFolder(type);

    var fullContent = [
      "---",
      "title: " + title,
      "type: " + type,
      "project: " + project,
      "version: " + version,
      "ai_name: " + ai_name,
      "source: " + source,
      "session_id: " + session_id,
      "parent_id: " + parent_id,
      "tags: " + tagsNorm,
      "date: " + dateJst,
      "---",
      "",
      "# " + title,
      "",
      content,
    ].join("\n");

    var file = folder.createFile(fileName, fullContent, MimeType.PLAIN_TEXT);

    indexWrite(
      file.getId(),
      fileName,
      type,
      ai_name,
      tagsNorm,
      project,
      version,
      session_id,
      parent_id,
      source,
    );

    return {
      success: true,
      id: file.getId(),
      fileName: fileName,
      url: file.getUrl(),
    };
  } catch (err) {
    return {
      success: false,
      error: "handleSave failed: " + (err.message || String(err)),
      stack: err.stack || "",
    };
  }
}

function handleList(e) {
  var type = e.parameter.type || "discussion";
  var limit = parseInt(e.parameter.limit, 10) || 10;

  var folder = getVaultFolder(type);
  var files = folder.getFiles();
  var result = [];

  while (files.hasNext() && result.length < limit) {
    var f = files.next();
    var raw = f.getBlob().getDataAsString("UTF-8");
    var meta = parseFrontmatter(raw);
    result.push({
      id: f.getId(),
      fileName: f.getName(),
      name: f.getName(),
      title: meta.title || f.getName(),
      type: meta.type || type,
      project: meta.project || "",
      version: meta.version || "",
      tags: meta.tags || "",
      ai_name: meta.ai_name || "",
      source: meta.source || "",
      session_id: meta.session_id || "",
      parent_id: meta.parent_id || "",
      date: meta.date || "",
      createdTime: f.getDateCreated(),
      modifiedTime: f.getLastUpdated(),
      url: f.getUrl(),
    });
  }

  return { success: true, type: type, files: result };
}

function handleGet(e) {
  var id = e.parameter.id;
  if (!id) {
    return { error: "id is required" };
  }

  var file = DriveApp.getFileById(id);
  var content = file.getBlob().getDataAsString("UTF-8");

  return {
    success: true,
    id: id,
    name: file.getName(),
    content: content,
    url: file.getUrl(),
  };
}

function handleSearch(e) {
  var q = e.parameter.q || "";
  var type = e.parameter.type || "";

  if (!q) {
    return { error: "q is required" };
  }

  var sheet = getIndexSheet();
  var data = sheet.getDataRange().getValues();
  var result = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var matchType = !type || String(row[2]) === type;
    var nameStr = String(row[1] || "").toLowerCase();
    var tagsStr = String(row[4] || "").toLowerCase();
    var verStr = String(row[6] || "").toLowerCase();
    var sessStr = String(row[7] || "").toLowerCase();
    var srcStr = String(row[9] || "").toLowerCase();
    var qLower = q.toLowerCase();
    var matchContent =
      nameStr.indexOf(qLower) !== -1 ||
      tagsStr.indexOf(qLower) !== -1 ||
      verStr.indexOf(qLower) !== -1 ||
      sessStr.indexOf(qLower) !== -1 ||
      srcStr.indexOf(qLower) !== -1;

    if (matchType && matchContent) {
      result.push({
        id: row[0],
        fileName: row[1],
        type: row[2],
        ai_name: row[3],
        tags: row[4],
        project: row[5] || "",
        version: row[6] || "",
        session_id: row[7] || "",
        parent_id: row[8] || "",
        source: row[9] || "",
      });
    }
  }

  return { success: true, query: q, results: result };
}

/* ---------- Helpers ---------- */

function getVaultFolder(type) {
  var root = DriveApp.getRootFolder();
  var vaultIt = root.getFoldersByName("AI_VAULT");
  if (!vaultIt.hasNext()) {
    throw new Error('AI_VAULT folder not found under Drive root. Create it or move it to "マイドライブ" root.');
  }
  var vault = vaultIt.next();

  var validTypes = [
    "_index",
    "inbox",
    "discussion",
    "proposal",
    "decisions",
    "instructions",
    "reports",
    "history",
  ];

  if (validTypes.indexOf(type) !== -1) {
    var it = vault.getFoldersByName(type);
    if (!it.hasNext()) {
      throw new Error("AI_VAULT subfolder missing: " + type);
    }
    return it.next();
  }

  var memoryNames = ["claude", "yui", "gemini", "cursor", "shared"];
  if (memoryNames.indexOf(type) !== -1) {
    var memIt = vault.getFoldersByName("memory");
    if (!memIt.hasNext()) {
      throw new Error("AI_VAULT/memory folder missing");
    }
    var memory = memIt.next();
    var subIt = memory.getFoldersByName(type);
    if (!subIt.hasNext()) {
      throw new Error("AI_VAULT/memory/" + type + " folder missing");
    }
    return subIt.next();
  }

  var inboxIt = vault.getFoldersByName("inbox");
  if (!inboxIt.hasNext()) {
    throw new Error("AI_VAULT/inbox folder missing");
  }
  return inboxIt.next();
}

function sanitize(str) {
  return String(str)
    .replace(/[\\/:*?"<>|]/g, "_")
    .substring(0, 50);
}

/**
 * Phase A 形式（7列・最後が createdTime）のインデックスを Phase2（11列）に拡張する。
 */
function ensureIndexSchema(sheet) {
  var lastCol = sheet.getLastColumn();
  if (lastCol < 7) return;

  var header = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var h6 = String(header[6] || "").trim().toLowerCase();
  var isOldSeven =
    lastCol === 7 &&
    h6.indexOf("created") !== -1 &&
    String(header[0]).trim() === "id" &&
    String(header[5]).trim().toLowerCase() === "project";

  if (!isOldSeven) return;

  for (var i = 0; i < 4; i++) {
    sheet.insertColumnAfter(6);
  }

  var newHeader = [
    "id",
    "fileName",
    "type",
    "ai_name",
    "tags",
    "project",
    "version",
    "session_id",
    "parent_id",
    "source",
    "createdTime",
  ];
  sheet.getRange(1, 1, 1, newHeader.length).setValues([newHeader]);
}

/**
 * Frontmatter（--- ... ---）を簡易パース。値に ": " を含む場合は未対応。
 */
function parseFrontmatter(content) {
  var meta = {};
  if (!content) return meta;
  var match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return meta;

  var lines = match[1].split("\n");
  lines.forEach(function (line) {
    var idx = line.indexOf(": ");
    if (idx > 0) {
      var key = line.substring(0, idx).trim();
      var val = line.substring(idx + 2).trim();
      meta[key] = val;
    }
  });
  return meta;
}

/**
 * _index フォルダ内の Google スプレッドシート1つをインデックスに使う。無ければ作成して移動。
 */
function getIndexSheet() {
  var indexFolder = getVaultFolder("_index");
  var files = indexFolder.getFiles();

  while (files.hasNext()) {
    var f = files.next();
    if (f.getMimeType() === MimeType.GOOGLE_SHEETS) {
      var sheet = SpreadsheetApp.openById(f.getId()).getSheets()[0];
      ensureIndexSchema(sheet);
      return sheet;
    }
  }

  var ss = SpreadsheetApp.create("AI_VAULT_index");
  var sheet = ss.getActiveSheet();
  sheet.appendRow([
    "id",
    "fileName",
    "type",
    "ai_name",
    "tags",
    "project",
    "version",
    "session_id",
    "parent_id",
    "source",
    "createdTime",
  ]);

  var file = DriveApp.getFileById(ss.getId());
  file.moveTo(indexFolder);

  return SpreadsheetApp.openById(ss.getId()).getSheets()[0];
}

function indexWrite(id, fileName, type, ai_name, tags, project, version, session_id, parent_id, source) {
  var sheet = getIndexSheet();
  sheet.appendRow([
    id,
    fileName,
    type,
    ai_name,
    tags,
    project,
    version || "",
    session_id || "",
    parent_id || "",
    source || "",
    new Date(),
  ]);
}

/**
 * デバッグ用: GASエディタから実行してフォルダIDをログする
 */
function getFolderIds() {
  var root = DriveApp.getRootFolder();
  var vaultIt = root.getFoldersByName("AI_VAULT");
  if (!vaultIt.hasNext()) {
    Logger.log("AI_VAULT not found");
    return;
  }
  var vault = vaultIt.next();
  Logger.log("AI_VAULT: " + vault.getId());

  var folders = [
    "_index",
    "inbox",
    "discussion",
    "proposal",
    "decisions",
    "instructions",
    "reports",
    "history",
  ];
  folders.forEach(function (name) {
    var it = vault.getFoldersByName(name);
    if (!it.hasNext()) {
      Logger.log(name + ": MISSING");
    } else {
      Logger.log(name + ": " + it.next().getId());
    }
  });
}
