import { useState } from 'react';

function Contacto() {
    // 1. ESTADO DEL FORMULARIO
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    // 2. FUNCIÓN PARA ACTUALIZAR EL ESTADO
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    // 3. FUNCIÓN PARA ENVIAR
    const manejarEnvio = async (e) => {
        e.preventDefault(); 
        
        console.log("Enviando datos al servidor...");
        
        try {
            // Usamos 'fetch' para golpear la puerta de Python
            const respuesta = await fetch('https://webadiie-backend.onrender.com/api/contacto', {
                method: 'POST',
                headers: { // CORRECCIÓN: Con "s" al final
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(datosFormulario) // CORRECCIÓN: Nombre correcto de tu variable
            });

            // 4. Revisamos si Python nos respondió con un "OK"
            if (respuesta.ok) {
                alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");

                // CORRECCIÓN: Usamos el nombre correcto de tu actualizador
                setDatosFormulario({
                    nombre: '',
                    correo: '',
                    mensaje: ''
                });
            } else {
                alert("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
            }
            
        } catch (error) {
            // Si hay un error de tipeo o el servidor está apagado, cae aquí
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. ¿Está Python corriendo?");
        }
    };

    return (
        <section id="Contacto" className="seccion_contacto">
            <h2>Contacto</h2>
            
            <div className="seccion_formulario">
                <form className="formulario" onSubmit={manejarEnvio}>
                    
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        value={datosFormulario.nombre}
                        onChange={manejarCambio}
                        required 
                    />

                    <label>Correo</label>
                    <input 
                        type="email" 
                        name="correo" 
                        value={datosFormulario.correo}
                        onChange={manejarCambio}
                        required 
                    />

                    <label>Mensaje</label>
                    <textarea 
                        name="mensaje" 
                        rows="4" 
                        value={datosFormulario.mensaje}
                        onChange={manejarCambio}
                        required 
                    ></textarea>

                    <button type="submit">Enviar</button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;