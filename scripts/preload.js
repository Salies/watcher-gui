const fetch = require('node-fetch');

console.log("preaload aqui")

window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:1234/init').then(res => res.json()).then(json => {
        let cpu_name = json.cpu_name.replace("(R)", "\u00AE");
        document.getElementById("cpu_name").innerText = cpu_name.replace("(TM)", "\u2122");
        document.getElementById("gpu_name").innerText = json.graphics_name;
    });
})