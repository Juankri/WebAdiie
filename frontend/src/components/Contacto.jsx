import { useState } from 'react';
import Swal from 'sweetalert2'; // Importamos las alertas elegantes

function Contacto() {
    // 1. ESTADO DEL FORMULARIO
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    // 2. ESTADO DE CARGA (Para bloquear el botón mientras se envía)
    const [enviando, setEnviando] = useState(false);

    // 3. FUNCIÓN PARA ACTUALIZAR EL ESTADO
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    // 4. FUNCIÓN PARA ENVIAR
    const manejarEnvio = async (e) => {
        e.preventDefault(); 
        
        // Bloqueamos el botón y mostramos alerta de carga
        setEnviando(true);
        Swal.fire({
            title: 'Enviando mensaje...',
            text: 'Por favor, espera un momento.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); // Muestra el spinner de carga
            }
        });
        
        try {
            // Hacemos la petición a tu backend en Render
            const respuesta = await fetch('https://webadiie-backend.onrender.com/api/contacto', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(datosFormulario) 
            });

            // Si el backend (Flask/Python) nos responde con éxito
            if (respuesta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Mensaje Enviado!',
                    text: 'Nos pondremos en contacto contigo muy pronto.',
                    iconColor: '#D4AF37', // Tu color dorado
                    confirmButtonColor: '#0B2126' // Tu color azul oscuro
                });

                // Limpiamos el formulario
                setDatosFormulario({
                    nombre: '',
                    correo: '',
                    mensaje: ''
                });
            } else {
                // Si el servidor responde pero hay un error lógico
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Hubo un problema al procesar tu mensaje. Intenta nuevamente.',
                    confirmButtonColor: '#0B2126'
                });
            }
            
        } catch (error) {
            console.error("Error de conexión:", error);
            // Mensaje profesional sin mencionar "Python" ni errores técnicos
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No pudimos conectar con el servidor. Por favor, revisa tu conexión a internet o intenta más tarde.',
                confirmButtonColor: '#0B2126'
            });
        } finally {
            // Sin importar si falló o fue exitoso, quitamos el estado de carga
            setEnviando(false);
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
                        disabled={enviando} // Se desactiva si está cargando
                    />

                    <label>Correo</label>
                    <input 
                        type="email" 
                        name="correo" 
                        value={datosFormulario.correo}
                        onChange={manejarCambio}
                        required 
                        disabled={enviando}
                    />

                    <label>Mensaje</label>
                    <textarea 
                        name="mensaje" 
                        rows="4" 
                        value={datosFormulario.mensaje}
                        onChange={manejarCambio}
                        required 
                        disabled={enviando}
                    ></textarea>

                    <button 
                        type="submit" 
                        disabled={enviando}
                        style={{ opacity: enviando ? 0.7 : 1, cursor: enviando ? 'not-allowed' : 'pointer' }}
                    >
                        {enviando ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contacto;