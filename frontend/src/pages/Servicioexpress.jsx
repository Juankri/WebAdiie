
import './Servicioexpress.css'; 
import Contacto from '../components/Contacto';
import { useState, useEffect, useContext } from 'react'; // 🌟 Importamos useContext
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext'; // 🌟 Importamos el cerebro del carrito
import BotonPago from '../components/BotonPago';


const NIVELES_SERVICIO = [
    { id: 'basico', titulo: 'Espacio Funcional', m2: '0-15 m²', precio: 140000 },
    { id: 'estandar', titulo: 'Espacio Social', m2: '15-30 m²', precio: 220000 },
    { id: 'premium', titulo: 'Espacio Integrado', m2: '30-50 m²', precio: 350000 }
];

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
    
    const { agregarAlCarrito } = useContext(CarritoContext);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [servicioActivo, setServicioActivo] = useState(null);
    const [nivelSeleccionado, setNivelSeleccionado] = useState(NIVELES_SERVICIO[0]);

    const abrirModal = (servicio) => {
        setServicioActivo(servicio);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setServicioActivo(null);
    };

    const manejarAgregarAlCarrito = (nivel) => {
        const itemParaElCarrito = {
            titulo: `${servicioActivo.titulo} - ${nivel.titulo}`,
            precio: nivel.precio,
            imagen: servicioActivo.imagen,
            idUnico: Date.now()
        };

        agregarAlCarrito(itemParaElCarrito);
        alert(`¡${itemParaElCarrito.titulo} agregado a tu cotización! 🛒`);
        cerrarModal();
    };

    return (
        <>
            <main className="main-servicios">
                <h1 className="titulo-servicios">Diseño de Interiores Express</h1>
                <p className="subtitulo-servicios">Selecciona el espacio y el nivel de diseño que necesitas.</p>

                <div className="servicios-grid">
                    {listaServicios.map((servicio, index) => (
                        <div key={index} className="servicio-item" onClick={() => abrirModal(servicio)}>
                            <img src={servicio.imagen} alt={servicio.titulo} loading="lazy" />
                            <h3>{servicio.titulo}</h3>
                            <p>{servicio.precio}</p>
                        </div>
                    ))}
                </div>

                {modalAbierto && servicioActivo && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-contenido">
                        <span className="modal-cerrar" onClick={cerrarModal}>&times;</span>
                        
                        <div className="modal-body-grid">
                            
                            <div className="modal-imagen-container">
                                <img src={servicioActivo.imagen} alt={servicioActivo.titulo} />
                            </div>
                            
                            <div className="modal-info-container">
                                <h2>{servicioActivo.titulo}</h2>
                                <p>{servicioActivo.descripcion}</p>

                                {/* El nuevo Select simple */}
                                <div className="form-grupo" style={{ marginTop: '20px' }}>
                                    <label>Selecciona tu plan:</label>
                                    <select 
                                        className="select-nivel"
                                        value={nivelSeleccionado.id} 
                                        onChange={(e) => {
                                            const nivel = NIVELES_SERVICIO.find(n => n.id === e.target.value);
                                            setNivelSeleccionado(nivel);
                                        }}
                                    >
                                        {NIVELES_SERVICIO.map((nivel) => (
                                            <option key={nivel.id} value={nivel.id}>
                                                {nivel.titulo} ({nivel.m2}) - ${nivel.precio.toLocaleString()}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* El único botón de agregar */}
                                <button 
                                    className="btn-agregar-completo" 
                                    onClick={() => manejarAgregarAlCarrito(nivelSeleccionado)}
                                >
                                    Agregar al Carrito - ${nivelSeleccionado.precio.toLocaleString()}
                                </button>
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