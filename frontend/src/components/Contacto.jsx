import { useState } from 'react';
import Swal from 'sweetalert2'; 

function Contacto() {
    // 1. ESTADO DEL FORMULARIO
    const [datosFormulario, setDatosFormulario] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    // 2. ESTADO DE CARGA
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
        
        setEnviando(true);
        Swal.fire({
            title: 'Enviando mensaje...',
            text: 'Por favor, espera un momento.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(); 
            }
        });
        
        try {
            const respuesta = await fetch('https://webadiie-backend.onrender.com/api/contacto', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(datosFormulario) 
            });

            if (respuesta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Mensaje Enviado!',
                    text: 'Nos pondremos en contacto contigo muy pronto.',
                    iconColor: '#D4AF37', // Dorado de la marca
                    confirmButtonColor: '#0B2126' // Azul oscuro
                });

                setDatosFormulario({
                    nombre: '',
                    correo: '',
                    mensaje: ''
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'Hubo un problema al procesar tu mensaje. Intenta nuevamente.',
                    confirmButtonColor: '#0B2126'
                });
            }
            
        } catch (error) {
            console.error("Error de conexión:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No pudimos conectar con el servidor. Por favor, revisa tu conexión a internet o intenta más tarde.',
                confirmButtonColor: '#0B2126'
            });
        } finally {
            setEnviando(false);
        }
    };

    return (
        // BOOTSTRAP: py-5 maneja el espaciado interno superior e inferior de manera uniforme
        <section id="Contacto" className="py-5" style={{ backgroundColor: '#0B2126' }}>
            <div className="container py-4">
                
                {/* TÍTULO DE LA SECCIÓN */}
                <h2 className="text-center text-white mb-5 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                    Contacto
                </h2>
                
                {/* ESTRUCTURA DE CENTRADO: row y justify-content-center se encargan de centrar la caja */}
                <div className="row justify-content-center">
                    
                    {/* ANCHO DINÁMICO: En celulares pequeños ocupa 11 columnas (col-11), en tablets 8 (col-md-8) y en PC 6 (col-lg-6) */}
                    <div className="col-11 col-md-8 col-lg-6">
                        
                        {/* FORMULARIO: bg-white (fondo blanco), p-4 o p-sm-5 (relleno responsivo), shadow (sombra nativa de Bootstrap) */}
                        <form className="bg-white p-4 p-sm-5 rounded shadow" onSubmit={manejarEnvio}>
                            
                            {/* CAMPO: NOMBRE */}
                            <div className="mb-4">
                                <label htmlFor="nombre" className="form-label fw-bold small text-uppercase" style={{ color: '#0B2126', letterSpacing: '0.5px' }}>
                                    Nombre
                                </label>
                                <input 
                                    type="text" 
                                    id="nombre"
                                    name="nombre" 
                                    className="form-control p-3 bg-light border-0"
                                    style={{ fontSize: '0.95rem', borderRadius: '6px' }}
                                    value={datosFormulario.nombre}
                                    onChange={manejarCambio}
                                    required 
                                    disabled={enviando} 
                                />
                            </div>

                            {/* CAMPO: CORREO */}
                            <div className="mb-4">
                                <label htmlFor="correo" className="form-label fw-bold small text-uppercase" style={{ color: '#0B2126', letterSpacing: '0.5px' }}>
                                    Correo Electrónico
                                </label>
                                <input 
                                    type="email" 
                                    id="correo"
                                    name="correo" 
                                    className="form-control p-3 bg-light border-0"
                                    style={{ fontSize: '0.95rem', borderRadius: '6px' }}
                                    value={datosFormulario.correo}
                                    onChange={manejarCambio}
                                    required 
                                    disabled={enviando}
                                />
                            </div>

                            {/* CAMPO: MENSAJE */}
                            <div className="mb-4">
                                <label htmlFor="mensaje" className="form-label fw-bold small text-uppercase" style={{ color: '#0B2126', letterSpacing: '0.5px' }}>
                                    Mensaje
                                </label>
                                <textarea 
                                    id="mensaje"
                                    name="mensaje" 
                                    rows="4" 
                                    className="form-control p-3 bg-light border-0"
                                    style={{ fontSize: '0.95rem', borderRadius: '6px', resize: 'none' }}
                                    value={datosFormulario.mensaje}
                                    onChange={manejarCambio}
                                    required 
                                    disabled={enviando}
                                ></textarea>
                            </div>

                            {/* BOTÓN ENVIAR */}
                            {/* Con btn w-100 toma todo el ancho de la tarjeta. Transiciones premium nativas. */}
                            <div className="mt-5">
                                <button 
                                    type="submit" 
                                    className="btn text-white w-100 py-3 fw-bold text-uppercase shadow-sm"
                                    style={{ 
                                        backgroundColor: '#0B2126', 
                                        letterSpacing: '1px',
                                        transition: 'all 0.3s ease',
                                        opacity: enviando ? 0.7 : 1, 
                                        cursor: enviando ? 'not-allowed' : 'pointer'
                                    }}
                                    disabled={enviando}
                                    // Efecto de cambio de color al pasar el mouse directo inline para no usar CSS
                                    onMouseEnter={(e) => { if(!enviando) { e.target.style.backgroundColor = '#D4AF37'; e.target.style.color = '#0B2126'; } }}
                                    onMouseLeave={(e) => { if(!enviando) { e.target.style.backgroundColor = '#0B2126'; e.target.style.color = '#ffffff'; } }}
                                >
                                    {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacto;