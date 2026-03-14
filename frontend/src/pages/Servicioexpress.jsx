
import './ServicioExpress.css'; 
import Contacto from '../components/Contacto';
import { useState, useEffect, useContext } from 'react'; // 🌟 Importamos useContext
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext'; // 🌟 Importamos el cerebro del carrito

function ServicioExpress() {

    // 1. NUESTRA BASE DE DATOS LOCAL
    const listaServicios = [
        {
            titulo: "Diseño de baño",
            precio: "desde $180,000",
            descripcion: "Un espacio de relajación y funcionalidad. Optimizamos la distribución y seleccionamos materiales resistentes y elegantes para crear un baño moderno y confortable.",
            imagen: "/img/servicio_express/baño.webp"
        },
        {
            titulo: "Comedor",
            precio: "desde $150,000",
            descripcion: "El punto de encuentro familiar. Diseñamos un comedor acogedor y funcional, seleccionando el mobiliario y la iluminación perfecta para compartir momentos inolvidables.",
            imagen: "/img/servicio_express/comedor.webp"
        },
        {
            titulo: "Muebles",
            precio: "desde $140,000",
            descripcion: "Mobiliario a medida que define tu estilo. Diseñamos piezas únicas y funcionales, desde estanterías hasta centros de entretenimiento, optimizando cada centímetro de tu hogar.",
            imagen: "/img/servicio_express/muebles.webp"
        },
        {
            titulo: "Dormitorios",
            precio: "desde $150,000",
            descripcion: "Tu refugio de descanso. Creamos un ambiente sereno y equilibrado, combinando texturas, colores e iluminación para garantizar el máximo confort y un sueño reparador.",
            imagen: "/img/servicio_express/dormitorio.webp"
        },
        {
            titulo: "Oficina",
            precio: "desde $140,000",
            descripcion: "Productividad y confort en casa. Diseñamos tu espacio de trabajo con ergonomía y estilo, favoreciendo la concentración y la organización eficiente.",
            imagen: "/img/servicio_express/oficina.webp"
        },
        {
            titulo: "Hall Acesso",
            precio: "desde $110,000",
            descripcion: "Una bienvenida inolvidable. Transformamos la entrada de tu casa en un espacio funcional y estético que refleja la personalidad de tu hogar desde el primer paso.",
            imagen: "/img/servicio_express/hall.webp"
        },
        {
            titulo: "Living",
            precio: "desde $170,000",
            descripcion: "El corazón social de tu casa. Diseñamos un living sofisticado y cómodo, ideal para recibir visitas o relajarse, integrando decoración y funcionalidad.",
            imagen: "/img/servicio_express/living.webp"
        },
        {
            titulo: "Logia",
            precio: "desde $140,000",
            descripcion: "Eficiencia y orden en el servicio. Diseñamos logias prácticas y organizadas, optimizando el almacenamiento y las zonas de lavado para facilitar las tareas diarias.",
            imagen: "/img/servicio_express/logia.webp"
        },
        {
            titulo: "Sala de estar",
            precio: "desde $120,000",
            descripcion: "Un espacio versátil para el día a día. Creamos un ambiente informal y acogedor, perfecto para ver televisión, leer o disfrutar en familia con total comodidad.",
            imagen: "/img/servicio_express/sala_de_estar.webp"
        },
        {
            titulo: "Terraza/Quincho",
            precio: "desde $190,000",
            descripcion: "Tu oasis al aire libre. Diseñamos terrazas y quinchos funcionales para disfrutar todo el año, integrando zonas de parrilla, comedor y descanso.",
            imagen: "/img/servicio_express/terraza.webp"
        },
        {
            titulo: "Walking Closet",
            precio: "desde $150,000",
            descripcion: "El vestidor de tus sueños. Diseñamos soluciones de almacenamiento personalizadas y elegantes para mantener tu ropa y accesorios organizados y visibles.",
            imagen: "/img/servicio_express/closet.webp"
        },
        {
            titulo: "Master Plan de Parcela",
            precio: "desde $110,000",
            descripcion: "Planificación inteligente de tu terreno. Desarrollamos un plan integral que ubica estratégicamente la vivienda y áreas exteriores, aprovechando las vistas y el entorno.",
            imagen: "/img/servicio_express/masterplan.webp"
        }
    ];
    
    const location = useLocation(); 
    
    // 🌟 Conectamos con la memoria global para sacar la función que agrega al carrito
    const { agregarAlCarrito } = useContext(CarritoContext);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [servicioActivo, setServicioActivo] = useState(null);
    
    // 🌟 Quitamos nombre y correo de aquí. Solo necesitamos saber cómo quieren el espacio.
    const [datosForm, setDatosForm] = useState({
        estilo: 'moderno', 
        metros: '10-20'
    });

    const abrirModal = (servicio) => {
        setServicioActivo(servicio);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setServicioActivo(null);
    };

    useEffect(() => {
        if (location.state && location.state.abrirModal) {
            const servicioEncontrado = listaServicios.find(
                (s) => s.titulo === location.state.abrirModal
            );
            if (servicioEncontrado) {
                abrirModal(servicioEncontrado);
            }
        }
    }, [location]); 

    const manejarCambio = (e) => {
        setDatosForm({ ...datosForm, [e.target.name]: e.target.value });
    };

    // 🌟 Esta función ya no llama a Python. Ahora guarda en el carrito local.
    const manejarAgregarAlCarrito = (e) => {
        e.preventDefault();
        
        // Armamos el paquete con los datos del servicio + las opciones elegidas
        const itemParaElCarrito = {
            titulo: servicioActivo.titulo,
            precioBase: servicioActivo.precio,
            imagen: servicioActivo.imagen,
            estilo: datosForm.estilo,
            metros: datosForm.metros,
            // Le damos un ID único por si agregan dos baños distintos
            idUnico: Date.now() 
        };

        // Lo mandamos al Context
        agregarAlCarrito(itemParaElCarrito);
        
        alert(`¡${servicioActivo.titulo} agregado a tu cotización! 🛒`);
        
        // Reseteamos y cerramos
        setDatosForm({ estilo: 'moderno', metros: '10-20' });
        cerrarModal(); 
    };

    return (
        <>
        <main className="main-servicios">
            <h1 className="titulo-servicios">Diseño de Interiores Express</h1>
            <p className="subtitulo-servicios">Selecciona los espacios que quieres diseñar y arma tu cotización a medida.</p>

            <div className="servicios-grid">
                {listaServicios.map((servicio, index) => (
                    <div 
                        key={index} 
                        className="servicio-item" 
                        onClick={() => abrirModal(servicio)} 
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={servicio.imagen} alt={servicio.titulo} loading="lazy" />
                        <h3>{servicio.titulo}<br/><span style={{ fontSize: '0.8em' }}>{servicio.precio}</span></h3>
                    </div>
                ))}
            </div>

            {modalAbierto && servicioActivo && (
                <div id="servicio-modal" className="modal" style={{ display: 'block' }}>
                    <div className="modal-contenido">
                        <span className="modal-cerrar" onClick={cerrarModal} style={{ cursor: 'pointer' }}>&times;</span>
                        
                        <div className="modal-body-grid">
                            <div className="modal-imagen-container">
                                <img src={servicioActivo.imagen} alt={servicioActivo.titulo} />
                            </div>
                            
                            <div className="modal-info-container">
                                <h2>{servicioActivo.titulo}</h2>
                                <p>{servicioActivo.descripcion}</p>
                                
                                {/* 🌟 Cambiamos la función onSubmit */}
                                <form id="modal-formulario" onSubmit={manejarAgregarAlCarrito}>
                                    <h3>Personaliza este espacio</h3>
                                    
                                    <div className="form-grupo">
                                        <label>Preferencia de Estilo:</label>
                                        <select name="estilo" value={datosForm.estilo} onChange={manejarCambio}>
                                            <option value="moderno">Moderno</option>
                                            <option value="minimalista">Minimalista</option>
                                            <option value="industrial">Industrial</option>
                                            <option value="rustico">Rústico</option>
                                            <option value="no-seguro">No estoy seguro</option>
                                        </select>
                                    </div>

                                    <div className="form-grupo">
                                        <label>Metros Cuadrados (m²):</label>
                                        <select name="metros" value={datosForm.metros} onChange={manejarCambio}>
                                            <option value="menos-10">Menos de 10 m²</option>
                                            <option value="10-20">10 - 20 m²</option>
                                            <option value="20-30">20 - 30 m²</option>
                                            <option value="30-50">30 - 50 m²</option>
                                            <option value="mas-50">Más de 50 m²</option>
                                        </select>
                                    </div>

                                    {/* 🌟 Los campos de nombre y correo desaparecen de aquí */}

                                    <button type="submit" style={{ backgroundColor: '#D4AF37', color: '#fff' }}>
                                        + Agregar a mi Cotización
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
        <Contacto />
        </>
    );
}

export default ServicioExpress;