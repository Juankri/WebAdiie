// Variables globales para controlar el índice
let currentImageIndex = 0;
let imagesList = []; // Aquí guardaremos todas las imágenes de la página

document.addEventListener('DOMContentLoaded', () => {
    // 1. Buscamos todas las imágenes con la clase "img-galeria"
    const images = document.querySelectorAll('.foto_img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('img-grande');
    const closeBtn = document.querySelector('.close-lightbox');

    // Si no hay galería en esta página, no hacemos nada
    if (images.length === 0) return;

    // Convertimos la lista de nodos en un array real para poder usar índices
    imagesList = Array.from(images);

    // 2. Asignar evento click a cada imagen pequeña
    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src; // Ponemos la misma foto en grande
            currentImageIndex = index; // Guardamos cuál foto es (la 0, la 1, la 2...)
        });
    });

    // 3. Botón cerrar
    if(closeBtn) {
        closeBtn.onclick = () => {
            lightbox.style.display = "none";
        }
    }

    // Cerrar si clickeas fuera de la imagen (en lo negro)
    if(lightbox) {
        lightbox.onclick = (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        }
    }
});

// 4. Función para cambiar imagen (Flechas)
function cambiarImagen(direction) {
    // Calculamos el nuevo índice
    currentImageIndex += direction;

    // Si llegamos al final, volvemos al principio (Loop)
    if (currentImageIndex >= imagesList.length) {
        currentImageIndex = 0;
    }
    // Si estamos en el principio y damos atrás, vamos a la última
    if (currentImageIndex < 0) {
        currentImageIndex = imagesList.length - 1;
    }

    // Actualizamos la foto grande
    const lightboxImg = document.getElementById('img-grande');
    lightboxImg.src = imagesList[currentImageIndex].src;
}

// 5. Control con Teclado (Flechas y Escape) - Toque Pro
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox && lightbox.style.display === "block") {
        if (e.key === "ArrowLeft") cambiarImagen(-1);
        if (e.key === "ArrowRight") cambiarImagen(1);
        if (e.key === "Escape") lightbox.style.display = "none";
    }
});