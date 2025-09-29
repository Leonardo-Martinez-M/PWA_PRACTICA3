let lienzo;
let cd;

document.addEventListener('DOMContentLoaded', () => {
    lienzo = document.getElementById("lienzo");
    if (lienzo) {
        cd = lienzo.getContext("2d");
        console.log("Canvas para líneas inicializado.");

        // Asignar la función exhibirLineas al botón al cargar el DOM
        const showLinesButton = document.getElementById('exhibir-lineas-btn');
        if (showLinesButton) {
            showLinesButton.addEventListener('click', exhibirLineas);
        }
    }
});

// Función exhibirLineas (basado en el código original)
function exhibirLineas() {
    if (!cd) {
        console.error("No se pudo obtener el contexto 2D del canvas.");
        return;
    }
    
    cd.clearRect(0, 0, lienzo.width, lienzo.height);

    let x = 0;
    cd.beginPath();
    cd.strokeStyle = '#000000'; 
    cd.lineWidth = 1;

    // Bucle para dibujar las líneas
    while (x < 400) {
        cd.moveTo(x, 0);
        cd.lineTo(400, 300 - x); 
        cd.stroke();
        x = x + 10;
    }
    console.log('Líneas diagonales dibujadas.');
}