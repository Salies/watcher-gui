const {app, BrowserWindow, Menu} = require('electron'),
fetch = require('node-fetch'),
path = require('path');

function createWindow(){
    const mw = new BrowserWindow({
        width: 800,
        height: 480,
        webPreferences:{
            preload: path.join(__dirname, 'scripts/preload.js')
        },
        frame: false
    });

    //mw.setMenuBarVisibility(false);
    mw.loadFile('index.html');
}

app.allowRendererProcessReuse = true;

app.whenReady().then(() =>{
    createWindow();
})

app.on('window-all-closed', function(){
    console.log("Call kill here.");

    app.quit(); //macOS is not supported, so no extra verification is needed
});