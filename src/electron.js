const { app, BrowserWindow } = require('electron');
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 650,
  });

  // I don't need the application menu
  mainWindow.removeMenu()

  let watcher;
  if (process.env.NODE_ENV === 'development') {
    // During development, reload page whenever the bundle changes
    watcher = require('chokidar').watch(path.join(__dirname, '../public/'), { ignoreInitial: true });
    watcher.on('change', () => {
      mainWindow. reload();
    });

    // also open dev tools
    mainWindow.webContents.openDevTools()
    mainWindow.setSize(1200, 650)
  }

  mainWindow.loadURL(`file://${path.join(__dirname, '../public/index.html')}`);
  mainWindow.on('closed', () => {
    if (watcher) watcher.close();
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
