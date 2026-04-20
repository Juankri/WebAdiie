import { useState,useContext } from "react";
import {Link} from "react-router-dom";
import {HashLink} from 'react-router-hash-link';
import Contacto from '../components/Contacto';
import { CarritoContext } from "../context/CarritoContext";
import {Trash2} from 'lucide-react';
import './Carrito.css';


function Carrito() {
    const { carrito, eliminarDelCarrito, vaciarCarrito} = useContext(CarritoContext);
    
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        correo:'',
        mensaje: ''
    });

    const manejarCambio = (e) =>{
        setDatosCliente({...datosCliente,[e.target.name]: e.target.value});
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("Tu cotizacion esta vacía. Agrega algunos espacios primero.");
            return;
        }

        const paqueteDeDatos = {
            nombre: datosCliente.nombre,
            correo: datosCliente.correo,
            mensaje: datosCliente.mensaje,
            servicios: carrito
        };
        
        try {
            console.log("Enviando a Python...", paqueteDeDatos);

            const respuesta = await fetch('https://webadiie-backend.onrender.com/api/enviar-cotizacion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(paqueteDeDatos)

            });

            if (respuesta.ok) {
                alert("¡Cotización enviada con éxito! Nos pondremos en contacto contigo pronto.");
                vaciarCarrito();
                setDatosCliente({
                    nombre: '',
                    correo: '',
                    mensaje: ''
                });
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
            <main className="carrito-main">
                <h1 className="titulo-servicios">Tu Cotizacion</h1>

                {carrito.length === 0 ? (
                    <div className="carrito-vacio">
                        <p>Aún no has agregado ningún espacio a tu cotización.</p>
                        <Link className="btn-volver" to="/servicio-express">Volver a Servicio Express</Link>
                    </div>
                ) : (
                    <div className="carrito-grid">

                        <div className="carrito-lista-container">
                            <h2>Espacios Seleccionados</h2>
                            <hr className="carrito-separador"/>

                            {carrito.map((item) => (
                                <div key={item.idUnico} className="carrito-item">
                                    <div className="carrito-item-info">
                                        <img src={item.imagen} alt={item.titulo} className="carrito-item-img"/>
                                        <div>
                                            <h3 className="carrito-item-titulo">{item.titulo}</h3>
                                            <p className="carrito-item-detalle">Estilo: {item.estilo} | {item.metros} m²</p>
                                        </div>
                                    </div>
                                    <button onClick={() => eliminarDelCarrito(item.titulo)}
                                        className="btn-eliminar"
                                        title="Eliminar espacio"><Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        
                        <div className="carrito-form-container">
                            <form id="modal-formulario" onSubmit={manejarEnvio} className="carrito-formulario">
                                <h3>Completa tus datos</h3>
                                
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

                                <button type="submit" className="btn-enviar-cotizacion">
                                    Enviar Cotización ({carrito.length} espacios)
                                </button>
                            </form>
                        </div>

                    </div>

                )}
            </main>
        </>
    );
}

export default Carrito;
