// uyhhhhh
const { app, BrowserWindow } = require('electron')
const createWindow = () => {
	const win = new BrowserWindow({
		width: 1800,
		height: 1000,
		icon: "./public/favicon.png"
	})

	win.loadFile('./public/index.html')
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})