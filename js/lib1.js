// lib1.js (archivo único para la lógica de la aplicación)

const params = new URLSearchParams(window.location.search);
const n = params.get('n');
const d = params.get('d'); 

// --- CLASE QUICKCHART (Gráfico Circular) ---
class Quickchart {
    constructor(d){
        this.d = parseInt(d) || 5; // Aseguramos que sea un número, por defecto 5
    }
    crearCadunos(){
        let cadunos = "";
        for(let i=0; i<this.d; i++){
            cadunos += "1,"
        }
        return cadunos.slice(0,-1);
    }
    generarSrcImg(){
        // Se corrige el endpoint para incluir la leyenda 1/5 (usando 'chl')
        let url = "https://quickchart.io/chart?cht=p3&chd=t:" + this.crearCadunos()
                    + "&chs=500x250&chl=" + "1/" + this.d + "&chma=0,0,0,0";
        return url;
    }
}

// --- LÓGICA DEL CANVAS (Líneas) ---
let lienzo;
let cd;

function exhibirLineas(){
    if (!cd) return; // Salir si el contexto no está listo
    
    // Limpiamos el canvas
    cd.clearRect(0, 0, lienzo.width, lienzo.height);

    let x = 0;
    cd.beginPath();
    cd.strokeStyle = '#000000'; 
    
    // Bucle de dibujo
    while (x < 400){
        cd.moveTo(x,0);
        cd.lineTo(400,300-x);
        cd.stroke();
        x = x + 10;
    }
    console.log('Líneas dibujadas.');
}


// --- INICIALIZACIÓN DE LA APLICACIÓN (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. INYECTAR GRÁFICO
    const q = new Quickchart(d);
    const contenidoDiv = document.getElementById("contenido");

    if (contenidoDiv) {
        // Inyección de la imagen del gráfico
        contenidoDiv.innerHTML = '<img src="' + q.generarSrcImg() + '" alt="Gráfico Circular PWA" style="width:250px; height:250px" />';
        console.log("Gráfico Quickchart inyectado.");
    }
    
    // 2. INICIALIZAR CANVAS Y BOTÓN
    lienzo = document.getElementById("line-canvas");

    if (lienzo) {
        cd = lienzo.getContext("2d");
        console.log("Canvas inicializado.");

        const showLinesButton = document.getElementById('exhibir-lineas-btn');
        if (showLinesButton) {
            // Asignar la función exhibirLineas al evento click del botón
            showLinesButton.addEventListener('click', exhibirLineas);
        }
    }
});