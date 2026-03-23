const fs = require('fs/promises');
const path = require('path');

const LAST_ASSESSMENT_FILE_NAME = 'assessment-last-file.json';
const VIEW_FILE_NAME = 'view-preferences.json';

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function writeJsonFile(filePath, payload) {
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function loadLastAssessmentFile(userDataPath) {
  const pointerFilePath = path.join(userDataPath, LAST_ASSESSMENT_FILE_NAME);

  try {
    return await readJsonFile(pointerFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function saveLastAssessmentFile(userDataPath, filePath) {
  const pointerFilePath = path.join(userDataPath, LAST_ASSESSMENT_FILE_NAME);
  await ensureDir(userDataPath);
  await writeJsonFile(pointerFilePath, {
    updatedAt: new Date().toISOString(),
    filePath
  });
}

async function loadAssessmentData(userDataPath) {
  const lastFile = await loadLastAssessmentFile(userDataPath);
  if (!lastFile || typeof lastFile.filePath !== 'string' || !lastFile.filePath.trim()) {
    return null;
  }

  try {
    const parsed = await readJsonFile(lastFile.filePath);
    return {
      ...parsed,
      filePath: lastFile.filePath
    };
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function loadAssessmentDataFromFile(userDataPath, filePath) {
  const parsed = await readJsonFile(filePath);
  await saveLastAssessmentFile(userDataPath, filePath);
  return {
    ...parsed,
    filePath
  };
}

async function saveAssessmentData(userDataPath, data, filePath) {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('A target file path is required to save assessment data.');
  }

  const targetDir = path.dirname(filePath);
  await ensureDir(targetDir);
  await ensureDir(userDataPath);

  const payload = {
    updatedAt: new Date().toISOString(),
    data
  };

  await writeJsonFile(filePath, payload);
  await saveLastAssessmentFile(userDataPath, filePath);
  return {
    ...payload,
    filePath
  };
}

async function loadViewPreference(userDataPath) {
  const filePath = path.join(userDataPath, VIEW_FILE_NAME);

  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

async function saveViewPreference(userDataPath, preference) {
  const filePath = path.join(userDataPath, VIEW_FILE_NAME);
  await ensureDir(userDataPath);

  const payload = {
    updatedAt: new Date().toISOString(),
    activeView: preference && preference.activeView === 'gauge' ? 'gauge' : 'radar'
  };

  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
  return payload;
}

module.exports = {
  loadAssessmentData,
  loadAssessmentDataFromFile,
  saveAssessmentData,
  loadViewPreference,
  saveViewPreference
};
