const { app, BrowserWindow } = require('electron/main')
function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('./registro.html')
}
app.whenReady().then(() =>  createWindow())