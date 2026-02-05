let slideIndex = 0;

function cambiarSlide(direction) {
    const slides = document.querySelectorAll('.slide-proyecto');

    // 1. Ocultar el slide actual (quitamos la clase activo)
    slides[slideIndex].classList.remove('activo');

    // 2. Calcular el nuevo índice
    slideIndex += direction;

    // Loop infinito:
    if (slideIndex >= slides.length) {
        slideIndex = 0; // Si pasa del último, vuelve al primero
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1; // Si retrocede del primero, va al último
    }

    // 3. Mostrar el nuevo slide (ponemos la clase activo)
    slides[slideIndex].classList.add('activo');
}




const capa1 = document.getElementById('slider-1');
const capa2 = document.getElementById('slider-2');
const capas = [capa1, capa2];


const fondos = [
    { 
        url: '/static/img/Fondos/fondo1.webp', 
        posicion: '50% 30%'  
    },
    { 
        url: '/static/img/Fondos/fondo2.webp', 
        posicion: '50% 30%' 
    },
    { 
        url: '/static/img/Fondos/fondo3.webp', 
        posicion: 'center'       
    }
];

let indiceActual = 0; // Índice de la foto
let capaActual = 0;   // Índice de la capa (0 o 1)

function rotarFondo() {
    // Calculamos cuál es la siguiente foto
    indiceActual++;
    if (indiceActual >= fondos.length) indiceActual = 0;
    
    // Identificamos qué capa está visible y cuál está escondida
    const capaVisible = capas[capaActual];
    const capaEscondida = capas[1 - capaActual]; // Si es 0 da 1, si es 1 da 0
    
    // 1. Preparamos la capa escondida con la NUEVA foto
    const foto = fondos[indiceActual];
    capaEscondida.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${foto.url}')`;
    capaEscondida.style.backgroundPosition = foto.posicion;
    
    // 2. HACEMOS EL CAMBIO (Cross-fade)
    capaEscondida.classList.add('slider_fondo_activo'); // Aparece la nueva
    capaVisible.classList.remove('slider_fondo_activo'); // Desaparece la vieja
    
    // 3. Cambiamos el turno de la capa para la próxima vez
    capaActual = 1 - capaActual;
}

// Iniciar el ciclo cada 5 segundos
setInterval(rotarFondo, 5000);