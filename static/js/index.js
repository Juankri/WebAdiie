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

const homeSection = document.querySelector('.home-main');
let indice = 0;

function rotarFondo() {
    indice++;
    if (indice >= fondos.length) {
        indice = 0;
    }

    
    const fotoActual = fondos[indice];

    
    homeSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${fotoActual.url}')`;

    // 3. Aplicamos la POSICIÓN específica usando .posicion
    homeSection.style.backgroundPosition = fotoActual.posicion;
}

setInterval(rotarFondo, 4000);