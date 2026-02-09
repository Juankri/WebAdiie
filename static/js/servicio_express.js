document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos del DOM ---
    const modal = document.getElementById('servicio-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDescripcion = document.getElementById('modal-descripcion');
    const cerrarBoton = document.querySelector('.modal-cerrar');
    const servicioItems = document.querySelectorAll('.servicio-item');

    // --- Abrir el Modal ---
    servicioItems.forEach(item => {
        item.addEventListener('click', () => {
            // 1. Obtener datos del item clickeado
            const titulo = item.dataset.titulo;
            const descripcion = item.dataset.descripcion;

            // 2. Poblar el modal con los datos
            modalTitulo.textContent = titulo;
            modalDescripcion.textContent = descripcion;

            // 3. Mostrar el modal
            modal.style.display = 'block';
        });
    });

    // --- Cerrar el Modal ---

    // Al hacer clic en la 'X'
    cerrarBoton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Al hacer clic fuera del contenido del modal (en el fondo oscuro)
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Opcional: Manejar el envío del formulario del modal
    const modalForm = document.getElementById('modal-formulario');
    modalForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Previene que la página se recargue
        
        // Aquí podrías recolectar los datos del formulario y enviarlos
        const formData = new FormData(modalForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Datos del formulario a enviar:', data);
        
        alert('¡Gracias por tu solicitud! Te contactaremos pronto.');
        
        // Cierra el modal después de enviar
        modal.style.display = 'none';
        modalForm.reset(); // Limpia el formulario
    });

});





// 1. Seleccionamos el formulario
const formulario = document.getElementById('modal-formulario');

// 2. Escuchamos cuando alguien le da clic a "Enviar"
formulario.addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Evita que la página se recargue

    // Convertimos los datos del formulario para enviarlos
    const datos = new FormData(formulario);

    // Botón de carga (opcional, para que se vea pro)
    const boton = formulario.querySelector('button');
    const textoOriginal = boton.innerText;
    boton.innerText = "Enviando...";
    boton.disabled = true;

    try {
        // 3. Enviamos los datos a Python (app.py)
        const respuesta = await fetch('/enviar-cotizacion', {
            method: 'POST',
            body: datos
        });

        const resultado = await respuesta.json();

        if (resultado.status === 'success') {
            alert("¡Mensaje enviado! Nos pondremos en contacto contigo.");
            formulario.reset(); // Limpia el formulario
            // Aquí podrías cerrar el modal si quisieras
        } else {
            alert("Hubo un error: " + resultado.mensaje);
        }

    } catch (error) {
        console.error("Error:", error);
        alert("Error de conexión. Inténtalo más tarde.");
    } finally {
        // Restauramos el botón
        boton.innerText = textoOriginal;
        boton.disabled = false;
    }
});
