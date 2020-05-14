const { ipcRenderer } = require("electron");

console.log("renderer aqui")

const app = new Vue({
    el: '#wrapper',
    data: {
      usage: {
          cpu_temp:"-1",
          cpu_usage:"-1",
          graphics_temp:"-1",
          graphics_usage:"-1",
          vram_usage:"-1",
          ram_usage:"-1"
        }
    }
});

console.log('començando o monitoramento')

ipcRenderer.send('get-data', 'ping');

ipcRenderer.on('data-response', (event, arg) => {
    if(arg.error){
        console.log('ainda n iniciou')
        setTimeout(function(){
            ipcRenderer.send('get-data');
        }, 3000);
    }

    console.log(arg) // prints "pong"
    setTimeout(function(){
        ipcRenderer.send('get-data');
    }, 1000);
});