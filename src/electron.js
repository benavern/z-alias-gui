const { app, BrowserWindow } = require('electron');
const path = require('path')
require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 480,
    minWidth: 400,
    maxWidth: 960,
    height: 650,
    minHeight: 320,
    maximizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      devTools: process.env.NODE_ENV === 'development'
    },
    frame: false,
    titleBarStyle: 'hiddenInset' // got to try that on mac ...
  });

  // I don't need the application menu
  mainWindow.removeMenu()

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));

  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

if (process.env.NODE_ENV === 'development') {
  // reload when the app changes
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
  });
}
