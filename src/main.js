const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs/promises');
const {
  loadAssessmentData,
  loadAssessmentDataFromFile,
  saveAssessmentData,
  loadViewPreference,
  saveViewPreference
} = require('./services/storage');

const HAZARD_CACHE_FILE_NAME = 'hazard-cache.json';
const HAZARD_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function normalizeHazardQuery(input) {
  return String(input || '').trim().toLowerCase();
}

function getHazardCacheFilePath(userDataPath) {
  return path.join(userDataPath, HAZARD_CACHE_FILE_NAME);
}

async function readHazardCache(userDataPath) {
  const filePath = getHazardCacheFilePath(userDataPath);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.entries || typeof parsed.entries !== 'object') {
      return { entries: {} };
    }
    return parsed;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return { entries: {} };
    }
    return { entries: {} };
  }
}

async function writeHazardCache(userDataPath, cache) {
  const filePath = getHazardCacheFilePath(userDataPath);
  await fs.mkdir(userDataPath, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(cache, null, 2), 'utf-8');
}

async function fetchJsonWithTimeout(url, timeoutMs = 4500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        Accept: 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function extractHStatementsFromText(text) {
  const matches = String(text || '').toUpperCase().match(/H\d{3}/g) || [];
  return Array.from(new Set(matches));
}

function inferHazardFeatures(hStatements, ghsText) {
  const hSet = new Set(hStatements);
  const severeH = ['H300', 'H310', 'H330', 'H340', 'H350', 'H360', 'H370', 'H372', 'H400', 'H410'];
  const warningH = ['H302', 'H312', 'H315', 'H319', 'H332', 'H335', 'H336', 'H351', 'H361', 'H411'];
  const flammableH = ['H224', 'H225', 'H226'];
  const cmrH = ['H340', 'H341', 'H350', 'H351', 'H360', 'H361', 'H362'];

  const dangerCount = severeH.filter((code) => hSet.has(code)).length;
  const warningCount = warningH.filter((code) => hSet.has(code)).length;
  const hasFlammable = flammableH.some((code) => hSet.has(code)) || /flamm/i.test(ghsText);
  const hasCmr = cmrH.some((code) => hSet.has(code));

  return {
    dangerCount,
    warningCount,
    hasFlammable,
    hasCmr
  };
}

async function lookupPubChemHazard(query) {
  const encodedQuery = encodeURIComponent(query);
  const cidUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodedQuery}/cids/JSON`;
  const cidPayload = await fetchJsonWithTimeout(cidUrl);
  const cids = cidPayload && cidPayload.IdentifierList && Array.isArray(cidPayload.IdentifierList.CID)
    ? cidPayload.IdentifierList.CID
    : [];

  if (cids.length === 0) {
    throw new Error('No PubChem CID found for query.');
  }

  const cid = cids[0];
  const propUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/property/Title,CanonicalSMILES,InChIKey/JSON`;
  const propPayload = await fetchJsonWithTimeout(propUrl);
  const prop = propPayload && propPayload.PropertyTable && Array.isArray(propPayload.PropertyTable.Properties)
    ? propPayload.PropertyTable.Properties[0]
    : null;

  const safetyUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound/${cid}/JSON?heading=GHS+Classification`;
  let safetyPayload = null;
  try {
    safetyPayload = await fetchJsonWithTimeout(safetyUrl);
  } catch (error) {
    safetyPayload = null;
  }

  const safetyText = safetyPayload ? JSON.stringify(safetyPayload) : '';
  const hStatements = extractHStatementsFromText(safetyText);
  const inferred = inferHazardFeatures(hStatements, safetyText);

  return {
    source: 'pubchem',
    cachedAt: new Date().toISOString(),
    identity: {
      cid,
      title: prop && prop.Title ? String(prop.Title) : query,
      inchiKey: prop && prop.InChIKey ? String(prop.InChIKey) : '',
      smiles: prop && prop.CanonicalSMILES ? String(prop.CanonicalSMILES) : ''
    },
    hazard: {
      hStatements,
      dangerCount: inferred.dangerCount,
      warningCount: inferred.warningCount,
      hasFlammable: inferred.hasFlammable,
      hasCmr: inferred.hasCmr
    },
    quality: {
      confidence: hStatements.length > 0 ? 0.85 : 0.62,
      note: hStatements.length > 0
        ? 'GHS heading parsed from PubChem PUG-View.'
        : 'PubChem found, but no direct H statements parsed from GHS heading.'
    }
  };
}

app.commandLine.appendSwitch('disable-http-cache');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('disk-cache-size', '0');

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1320,
    height: 860,
    minWidth: 1080,
    minHeight: 720,
    backgroundColor: '#f5f1e8',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

ipcMain.handle('assessment:load', async () => {
  try {
    const userDataPath = app.getPath('userData');
    return await loadAssessmentData(userDataPath);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('assessment:save', async (_, payload) => {
  try {
    const userDataPath = app.getPath('userData');
    const saveResult = await dialog.showSaveDialog({
      title: 'Save Assessment File',
      defaultPath: path.join(app.getPath('documents'), 'green-chemistry-assessment.json'),
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ],
      properties: ['createDirectory', 'showOverwriteConfirmation']
    });

    if (saveResult.canceled || !saveResult.filePath) {
      return {
        canceled: true,
        message: 'Save canceled by user.'
      };
    }

    return await saveAssessmentData(userDataPath, payload, saveResult.filePath);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('assessment:new-file', async (_, payload) => {
  try {
    const userDataPath = app.getPath('userData');
    const stamp = String(Date.now());
    const fileName = `green-chemistry-assessment-${stamp}.json`;
    const filePath = path.join(app.getPath('documents'), fileName);
    return await saveAssessmentData(userDataPath, payload || {}, filePath);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('assessment:auto-save', async (_, payload) => {
  try {
    const userDataPath = app.getPath('userData');
    const filePath = payload && typeof payload.filePath === 'string' ? payload.filePath : '';
    if (!filePath) {
      return {
        error: true,
        message: 'Auto-save target file path is missing.'
      };
    }

    const data = payload && payload.data ? payload.data : {};
    return await saveAssessmentData(userDataPath, data, filePath);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('assessment:open', async () => {
  try {
    const userDataPath = app.getPath('userData');
    const openResult = await dialog.showOpenDialog({
      title: 'Open Assessment File',
      defaultPath: app.getPath('documents'),
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ],
      properties: ['openFile']
    });

    if (openResult.canceled || !openResult.filePaths || openResult.filePaths.length === 0) {
      return {
        canceled: true,
        message: 'Open canceled by user.'
      };
    }

    return await loadAssessmentDataFromFile(userDataPath, openResult.filePaths[0]);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('assessment:open-multiple', async () => {
  try {
    const openResult = await dialog.showOpenDialog({
      title: 'Open Comparison Assessment Files',
      defaultPath: app.getPath('documents'),
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ],
      properties: ['openFile', 'multiSelections']
    });

    if (openResult.canceled || !openResult.filePaths || openResult.filePaths.length === 0) {
      return {
        canceled: true,
        message: 'Open comparison files canceled by user.'
      };
    }

    const entries = [];
    const warnings = [];

    for (const filePath of openResult.filePaths) {
      try {
        const raw = await fs.readFile(filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.data || !Array.isArray(parsed.data.principles)) {
          warnings.push(`Skipped invalid file format: ${filePath}`);
          continue;
        }

        entries.push({
          filePath,
          updatedAt: parsed.updatedAt || null,
          data: parsed.data
        });
      } catch (error) {
        warnings.push(`Failed to parse file: ${filePath} (${error.message})`);
      }
    }

    return {
      entries,
      warnings,
      selectedCount: openResult.filePaths.length
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildReportHtml(payload) {
  const generatedAt = new Date().toLocaleString();
  const total = Number(payload?.total || 0).toFixed(2);
  const principles = Array.isArray(payload?.principles) ? payload.principles : [];
  const weights = Array.isArray(payload?.principleWeights) ? payload.principleWeights : [];

  const rows = principles.map((item, index) => {
    const score = Number(item?.score || 0);
    const weight = Number(weights[index] || 0);
    return `
      <tr>
        <td>${escapeHtml(item?.short || `P${index + 1}`)}</td>
        <td>${escapeHtml(item?.title || '')}</td>
        <td>${score.toFixed(2)} / 1.00</td>
        <td>${weight.toFixed(2)}%</td>
      </tr>
    `;
  }).join('');

  return `<!doctype html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Green Chemistry Assessment Report</title>
  <style>
    body { font-family: "Segoe UI", Arial, sans-serif; margin: 28px; color: #1c2d2b; }
    h1 { margin: 0 0 8px; font-size: 28px; }
    .meta { color: #4b6460; margin-bottom: 16px; font-size: 13px; }
    .total { margin: 10px 0 16px; padding: 10px 12px; border-radius: 8px; background: #edf7f4; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    th, td { border: 1px solid #cedad7; padding: 8px 10px; text-align: left; }
    th { background: #e3f1ed; }
    tr:nth-child(even) td { background: #f8fcfb; }
  </style>
</head>
<body>
  <h1>Green Chemistry 12-Principle Assessment Report</h1>
  <div class="meta">Generated: ${escapeHtml(generatedAt)}</div>
  <div class="total">Total Score: ${total} / 12.00</div>
  <table>
    <thead>
      <tr>
        <th>Principle</th>
        <th>Title</th>
        <th>Score</th>
        <th>Weight</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

ipcMain.handle('report:export-pdf', async (_, payload) => {
  let reportWindow;
  try {
    const suggestedName = `green-chemistry-report-${new Date().toISOString().slice(0, 10)}.pdf`;
    const saveResult = await dialog.showSaveDialog({
      title: 'Export Report PDF',
      defaultPath: path.join(app.getPath('documents'), suggestedName),
      filters: [
        { name: 'PDF Files', extensions: ['pdf'] }
      ],
      properties: ['createDirectory', 'showOverwriteConfirmation']
    });

    if (saveResult.canceled || !saveResult.filePath) {
      return {
        canceled: true,
        message: 'Export canceled by user.'
      };
    }

    reportWindow = new BrowserWindow({
      show: false,
      width: 1120,
      height: 1440,
      webPreferences: {
        sandbox: true,
        contextIsolation: true
      }
    });

    const html = buildReportHtml(payload || {});
    await reportWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    const pdfData = await reportWindow.webContents.printToPDF({
      printBackground: true,
      pageSize: 'A4',
      margins: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      }
    });

    await fs.writeFile(saveResult.filePath, pdfData);
    return {
      updatedAt: new Date().toISOString(),
      filePath: saveResult.filePath
    };
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  } finally {
    if (reportWindow && !reportWindow.isDestroyed()) {
      reportWindow.destroy();
    }
  }
});

ipcMain.handle('view:load', async () => {
  try {
    const userDataPath = app.getPath('userData');
    return await loadViewPreference(userDataPath);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('view:save', async (_, payload) => {
  try {
    const userDataPath = app.getPath('userData');
    return await saveViewPreference(userDataPath, payload);
  } catch (error) {
    return {
      error: true,
      message: error.message
    };
  }
});

ipcMain.handle('hazard:lookup', async (_, payload) => {
  try {
    const userDataPath = app.getPath('userData');
    const queryRaw = payload && typeof payload.query === 'string' ? payload.query : '';
    const query = queryRaw.trim();

    if (!query) {
      return {
        error: true,
        message: 'Lookup query is required.'
      };
    }

    const key = normalizeHazardQuery(query);
    const now = Date.now();
    const cache = await readHazardCache(userDataPath);
    const cacheEntry = cache.entries[key];
    if (cacheEntry && cacheEntry.expiresAt && Number(cacheEntry.expiresAt) > now) {
      return {
        source: cacheEntry.source || 'cache',
        fromCache: true,
        query,
        data: cacheEntry.data
      };
    }

    const remoteData = await lookupPubChemHazard(query);
    cache.entries[key] = {
      source: remoteData.source,
      cachedAt: now,
      expiresAt: now + HAZARD_CACHE_TTL_MS,
      data: remoteData
    };
    await writeHazardCache(userDataPath, cache);

    return {
      source: remoteData.source,
      fromCache: false,
      query,
      data: remoteData
    };
  } catch (error) {
    return {
      error: true,
      message: error && error.message ? error.message : 'Hazard lookup failed.'
    };
  }
});

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
