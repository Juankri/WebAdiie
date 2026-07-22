import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { Trash2 } from 'lucide-react';
import './Carrito.css';
import BotonPago from '../components/BotonPago';

function Carrito() {
    const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
    
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        correo: '',
        mensaje: ''
    });

    // 1. 💰 LOGICA DE PRECIOS: Sumamos los precios de todos los items en el carrito
    const totalPrecio = carrito.reduce((acc, item) => acc + item.precio, 0);

    // 2. 📝 CONCATENACIÓN: Creamos un solo título combinando los espacios (Ej: "Diseño de baño + Living")
    const resumenTitulos = carrito.map(item => item.titulo).join(" + ");

    const manejarCambio = (e) => {
        setDatosCliente({ ...datosCliente, [e.target.name]: e.target.value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("Tu cotización está vacía. Agrega algunos espacios primero.");
            return;
        }

        // Armamos el paquete de datos completo para enviárselo a Python
        const paqueteDeDatos = {
            nombre: datosCliente.nombre,
            correo: datosCliente.correo,
            mensaje: datosCliente.mensaje,
            titulo: `Servicios Express: ${resumenTitulos}`, // Lo que verá el cliente en Mercado Pago
            precio: totalPrecio,                           // El total sumado dinámicamente
            servicios: carrito                             // El desglose por si quieres guardarlo en tu BD
        };
        
        try {
            console.log("Enviando datos y generando orden de pago...", paqueteDeDatos);

            // Disparamos la petición directamente a tu ruta de Mercado Pago en Render
            const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/crear_preferencia`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paqueteDeDatos)
            });

            const data = await respuesta.json();

            if (respuesta.ok && data.init_point) {
                // 🚀 ¡Vámonos a Mercado Pago! Redirige al usuario a la pasarela de pagos
                window.location.href = data.init_point;
            } else {
                console.error("Error en la respuesta del servidor:", data);
                alert("Hubo un problema al generar el link de cobro. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            alert("Error al conectar con el servidor de pagos. Asegúrate de que el backend esté en línea.");
        }
    };

    return (
        <>
            <main style={{ marginTop: '50px', minHeight: '70vh' }} className="carrito-main mb-5">
                <h1 className="titulo-servicios">Tu Cotización</h1>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <p>Aún no has agregado ningún espacio a tu cotización.</p>
                        <Link className="btn-volver" to="/servicio-express">Volver a Servicio Express</Link>
                    </div>
                ) : (
                    <div className="carrito-grid">

                        <div className="carrito-lista-container">
                            <h2>Espacios Seleccionados</h2>
                            <hr className="carrito-separador" />

                            {carrito.map((item) => (
                                <div key={item.idUnico} className="carrito-item">
                                    <div className="carrito-item-info">
                                        <img src={item.imagen} alt={item.titulo} className="carrito-item-img" />
                                        <div>
                                            <h3 className="carrito-item-titulo">{item.titulo}</h3>
                                            <p className="carrito-item-detalle">Valor: ${item.precio.toLocaleString('es-CL')}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => eliminarDelCarrito(item.titulo)}
                                        className="btn-eliminar"
                                        title="Eliminar espacio"><Trash2 size={20} />
                                    </button>
                                </div>
                            ))}

                            {/* Fila del Total visible en el resumen del carrito */}
                            <div className="carrito-total-resumen" style={{ marginTop: '20px', textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                Total a Pagar: ${totalPrecio.toLocaleString('es-CL')} CLP
                            </div>
                        </div>

                        <div className="carrito-form-container">
                            <form id="modal-formulario" onSubmit={manejarEnvio} className="carrito-formulario">
                                <h3>Completa tus datos para proceder al pago</h3>
                                
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

                                {/* El botón ahora muestra el total y dispara todo el proceso */}
                                <BotonPago 
                                tituloServicio={`Servicios Express: ${resumenTitulos}`} 
                                precioServicio={totalPrecio} 
                                datosCliente={datosCliente} 
                                carrito={carrito} 
                            />
                            </form>
                        </div>

                    </div>
                )}
            </main>
        </>
    );
}

export default Carrito;