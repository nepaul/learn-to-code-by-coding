const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'logo-180x180.png')
  })

  win.loadFile(path.join(__dirname, '../build/index.html'))
}

app.whenReady().then(() => {
  console.log(path.join(__dirname, 'logo-180x180.png'));
  console.log(path.join(__dirname, '../build/index.html'));
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
