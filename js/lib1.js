const params = new URLSearchParams(window.location.search);
const d_param = params.get('d'); 

class Quickchart {
    constructor(d) {
        this.d = parseInt(d) || 5; 
    }

    crearCadunos() {
        let cadunos = "";
        for (let i = 0; i < this.d; i++) {
            cadunos += "1,";
        }
        return cadunos.slice(0, -1);
    }

    generarSrcImg() {
        const url = "https://quickchart.io/chart?c=p3&chd=t:" + this.crearCadunos() + 
                    "&chs=500x250&chf=bg,s,FFDF00&chl=1/" + this.d + "&chma=0,0,0,0";
        return url;
    }
}

// Lógica de inyección del gráfico
const q = new Quickchart(d_param);
const imagenGrafico = `<img src="${q.generarSrcImg()}" alt="Gráfico Circular" style="width:200px; height:200px;">`;

document.addEventListener('DOMContentLoaded', () => {
    const contenidoDiv = document.getElementById("contenido");
    if (contenidoDiv) {
        // En tu PWA2, se inyectaba el HTML del gráfico aquí.
        // Asumiendo que el gráfico es el contenido principal del div:
        contenidoDiv.innerHTML += imagenGrafico;
        console.log("Gráfico Quickchart inyectado.");
    }
});