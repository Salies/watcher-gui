const {app, BrowserWindow, ipcMain} = require('electron'),
path = require('path'),
fetch = require('node-fetch');

function createWindow(){
    const mw = new BrowserWindow({
        width: 800,
        height: 480,
        webPreferences:{
            preload: path.join(__dirname, 'scripts/preload.js'),
            nodeIntegration: true,
        },
        frame: false
    });

    delete process.env.ELECTRON_ENABLE_SECURITY_WARNINGS;
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;
    mw.loadFile('index.html');
}

app.allowRendererProcessReuse = true;

app.whenReady().then(() =>{
    createWindow();
})

ipcMain.on('get-data', (event) => {
    fetch('http://localhost:1234/getData').then(res => res.json()).then(json => {
        event.reply('data-response', json);
    });
});

app.on('window-all-closed', function(){
    console.log("Call kill here.");

    app.quit(); //macOS is not supported, so no extra verification is needed
});