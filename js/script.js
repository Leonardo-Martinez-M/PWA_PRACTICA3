document.addEventListener('DOMContentLoaded', () => {
    console.log('El script de la aplicación se ha cargado.');

    // --- 1. Lógica para el botón 'Exhibir Líneas' ---
    const showLinesButton = document.getElementById('exhibir-lineas-btn');
    const canvas = document.getElementById('line-canvas'); // Asumiendo que tienes un <canvas>

    if (showLinesButton && canvas) {
        showLinesButton.addEventListener('click', () => {
            // Llama a la función que dibuja las líneas
            drawDiagonalLines(canvas);
            console.log('Líneas diagonales dibujadas.');
        });
    }

    // --- 2. Lógica para el Gráfico Circular (si es generado por JS) ---
    // Si el gráfico se genera con una librería (como Chart.js o similar)
    // este es el lugar para inicializarlo.
    initializePieChart(); 
});

function drawDiagonalLines(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const step = 10; // Espacio entre líneas

    // Limpia el canvas antes de dibujar
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    for (let i = 0; i <= width; i += step) {
        // Dibuja una línea desde (i, 0) hasta (width, i)
        ctx.moveTo(i, 0);
        ctx.lineTo(width, i);
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

/**
 * Función de inicialización del gráfico circular
 * (Esta función depende de la librería que uses o de tu implementación)
 */
function initializePieChart() {
    // Código para configurar los datos (1/5, 1/5, etc.) y renderizar el gráfico.
    // ...
    console.log('Gráfico circular inicializado.');
}

// Nota: El registro del Service Worker permanece en index.html, 
// o en un script separado si prefieres, pero nunca aquí para evitar problemas de alcance.// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('PWA3 Application Script loaded successfully.');

    // Obtener elementos del DOM
    const showLinesButton = document.getElementById('exhibir-lineas-btn');
    const canvas = document.getElementById('line-canvas');

    if (showLinesButton && canvas) {
        // Agregar listener al botón
        showLinesButton.addEventListener('click', () => {
            drawDiagonalLines(canvas);
        });
    }

    // Nota: La lógica del Gráfico Circular y cualquier otro JS de inicio 
    // iría aquí. Por simplicidad, solo implementamos el dibujo de líneas.
});

/**
 * Dibuja líneas diagonales desde la esquina superior izquierda
 * a la esquina inferior derecha del canvas.
 */
function drawDiagonalLines(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const step = 15; // Espacio entre líneas (ajusta si quieres más/menos líneas)

    // Limpia el canvas
    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1; 

    // Bucle para dibujar las líneas
    for (let i = 0; i <= width; i += step) {
        // Línea que va desde el borde superior al lateral
        ctx.moveTo(i, 0);
        ctx.lineTo(width, height - i);
    }
    
    // Bucle para dibujar la otra mitad del patrón (si fuera necesario, pero el patrón
    // de tu imagen es un triángulo simple que va del borde superior al lateral)
    
    ctx.stroke();
    console.log('Líneas diagonales dibujadas en el canvas.');
}