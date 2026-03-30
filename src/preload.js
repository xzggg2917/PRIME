const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopAPI', {
  loadAssessment: () => ipcRenderer.invoke('assessment:load'),
  openAssessment: () => ipcRenderer.invoke('assessment:open'),
  openComparisonFiles: () => ipcRenderer.invoke('assessment:open-multiple'),
  createAssessmentFile: (payload) => ipcRenderer.invoke('assessment:new-file', payload),
  autoSaveAssessment: (payload) => ipcRenderer.invoke('assessment:auto-save', payload),
  saveAssessment: (payload) => ipcRenderer.invoke('assessment:save', payload),
  lookupHazardChemical: (payload) => ipcRenderer.invoke('hazard:lookup', payload),
  exportReportPdf: (payload) => ipcRenderer.invoke('report:export-pdf', payload),
  loadViewPreference: () => ipcRenderer.invoke('view:load'),
  saveViewPreference: (payload) => ipcRenderer.invoke('view:save', payload),
  closeApp: () => ipcRenderer.send('app:close')
});
