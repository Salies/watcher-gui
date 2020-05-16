const { ipcRenderer } = require("electron");

console.log("renderer aqui")

let cpu_u, gpu_u, ram_u, vram_u, cpu_temp, gpu_temp;
window.onload = function onLoad() {
    let options = {
        color: "#1a1a1a",
        strokeWidth: 5,
        text: {
            autoStyleContainer: false
        },
        step: function(state, circle) {
            let val = Math.round(circle.value() * 100);
            circle.setText(val + "%");
        }
    };

    cpu_u = new ProgressBar.Circle('.cpu_usage', options);
    gpu_u = new ProgressBar.Circle('.graphics_usage', options);
    ram_u = new ProgressBar.Circle('.ram_usage', options);
    vram_u  = new ProgressBar.Circle('.vram_usage', options);

    cpu_temp = document.querySelector('.cpu_temp > div');
    gpu_temp = document.querySelector('.gpu_temp > div');
};

console.log('començando o monitoramento')

ipcRenderer.send('get-data');

ipcRenderer.on('data-response', (event, arg) => {
    if(arg.error){
        console.log('ainda n iniciou')
        setTimeout(function(){
            ipcRenderer.send('get-data');
        }, 3000);
    }

    console.log(arg)

    cpu_u.animate(arg["cpu_usage"] / 100);
    gpu_u.animate(arg["graphics_usage"] / 100);
    ram_u.animate(arg["ram_usage"] / 100);
    vram_u.animate(arg["vram_usage"] / 100);

    cpu_temp.style.width = arg["cpu_temp"] + "%";
    cpu_temp.querySelector('span').innerText = arg["cpu_temp"] + "°C";

    gpu_temp.style.width = arg["graphics_temp"] + "%";
    gpu_temp.querySelector('span').innerText = arg["graphics_temp"] + "°C";

    setTimeout(function(){
        console.log('esperando...')
        ipcRenderer.send('get-data');
    }, 2000);
});