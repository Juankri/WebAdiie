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