import { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Servicioexpress.css'; // Usamos los mismos estilos para mantener la coherencia

function Carrito() {
    // 1. Extraemos todo del cerebro global
    const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);

    // 2. Estado para los datos del cliente
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    const manejarCambio = (e) => {
        setDatosCliente({ ...datosCliente, [e.target.name]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("Tu cotización está vacía. Agrega algunos espacios primero.");
            return;
        }

        // 🌟 PREPARAMOS EL PAQUETE PARA PYTHON
        // Como ahora pueden ser varios servicios, los juntamos en un solo formato
        const paqueteDeDatos = {
            nombre: datosCliente.nombre,
            correo: datosCliente.correo,
            mensaje: datosCliente.mensaje,
            // Mandamos el arreglo completo para que Python lo lea
            servicios: carrito 
        };

        try {
            console.log("Enviando a Python...", paqueteDeDatos);
            
            const respuesta = await fetch('https://webadiie-backend.onrender.com/api/enviar-cotizacion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paqueteDeDatos)
            });

            if (respuesta.ok) {
                alert("¡Cotización enviada con éxito! Nos pondremos en contacto contigo pronto.");
                vaciarCarrito(); // Vaciamos el carrito tras el éxito
                setDatosCliente({ nombre: '', correo: '', mensaje: '' });
            } else {
                alert("Hubo un problema al procesar tu solicitud. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error de conexión con el servidor. ¿Está Python corriendo?");
        }
    };

    return (
        <>
            <main className="main-servicios" style={{ paddingTop: '170px', minHeight: '70vh' }}>
                <h1 className="titulo-servicios">Tu Cotización</h1>
                
                {/* SI EL CARRITO ESTÁ VACÍO */}
                {carrito.length === 0 ? (
                    <div style={{ textAlign: 'center', marginTop: '40px' }}>
                        <p>Aún no has agregado ningún espacio a tu cotización.</p>
                        <Link to="/servicio-express" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#0B2126', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                            Volver a Servicio Express
                        </Link>
                    </div>
                ) : (
                    /* SI HAY COSAS EN EL CARRITO */
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center', marginTop: '40px', padding: '0 20px' }}>
                        
                        {/* COLUMNA IZQUIERDA: RESUMEN DE COMPRAS */}
                        <div style={{ flex: '1 1 400px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
                            <h2>Espacios Seleccionados</h2>
                            <hr style={{ margin: '15px 0' }}/>
                            
                            {carrito.map((item) => (
                                <div key={item.idUnico} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
                                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                        <img src={item.imagen} alt={item.titulo} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                                        <div>
                                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1em' }}>{item.titulo}</h3>
                                            <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>Estilo: {item.estilo} | {item.metros} m²</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => eliminarDelCarrito(item.titulo)}
                                        style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2em' }}
                                        title="Eliminar"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* COLUMNA DERECHA: FORMULARIO DE CONTACTO */}
                        <div style={{ flex: '1 1 300px' }}>
                            <form id="modal-formulario" onSubmit={manejarEnvio} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <h3 style={{ marginBottom: '20px' }}>Completa tus datos</h3>
                                
                                <div className="form-grupo">
                                    <label>Nombre Completo:</label>
                                    <input type="text" name="nombre" value={datosCliente.nombre} onChange={manejarCambio} required />
                                </div>

                                <div className="form-grupo">
                                    <label>Correo Electrónico:</label>
                                    <input type="email" name="correo" value={datosCliente.correo} onChange={manejarCambio} required />
                                </div>

                                <div className="form-grupo">
                                    <label>Mensaje o comentario adicional (Opcional):</label>
                                    <textarea name="mensaje" rows="3" value={datosCliente.mensaje} onChange={manejarCambio}></textarea>
                                </div>

                                <button type="submit" style={{ width: '100%', backgroundColor: '#D4AF37', color: '#fff', padding: '12px', marginTop: '10px' }}>
                                    Enviar Cotización ({carrito.length} espacios)
                                </button>
                            </form>
                        </div>

                    </div>
              )}
            </main>
            <Contacto />
        </>
    );
}

export default Carrito;