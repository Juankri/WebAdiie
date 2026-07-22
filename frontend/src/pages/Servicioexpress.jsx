import { useState, useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import Contacto from '../components/Contacto';
import Swal from 'sweetalert2';

function ServicioExpress() {

    // 1. BASE DE DATOS LOCAL
    const listaServicios = [
        {
            titulo: "Diseño de baño",
            precio: "Desde $150,000",
            descripcion: "Un espacio de relajación y funcionalidad. Optimizamos la distribución y seleccionamos materiales resistentes y elegantes para crear un baño moderno y confortable.",
            imagen: "/img/servicio_express/baño.webp",
            opciones: [
                { id: 'bano_peq', titulo: 'Baño Pequeño / Visitas', m2: 'Hasta 5 m²', precio: 150000 },
                { id: 'bano_med', titulo: 'Baño Estándar', m2: '6 a 10 m²', precio: 200000 },
                { id: 'bano_prin', titulo: 'Baño Principal / En Suite', m2: 'Más de 10 m²', precio: 250000 }
            ]
        },
        {
            titulo: "Diseño de Cocina",
            precio: "desde $140,000",
            descripcion: "Transformamos tu cocina en el corazón del hogar. Optimizamos la distribución, el almacenamiento y la iluminación, creando un espacio 100% funcional, moderno y a tu medida.",
            imagen: "/img/servicio_express/cocina.webp",
            opciones: [
                { id: 'cocina_peq', titulo: 'Cocina Compacta (Kitchenette)', m2: 'Hasta 8 m²', precio: 140000 },
                { id: 'cocina_med', titulo: 'Cocina Estándar', m2: '8 a 15 m²', precio: 220000 },
                { id: 'cocina_isla', titulo: 'Cocina Amplia / Con Isla', m2: 'Más de 15 m²', precio: 320000 }
            ]
        },
        {
            titulo: "Comedor",
            precio: "Desde $150,000",
            descripcion: "El punto de encuentro familiar. Diseñamos un comedor acogedor y funcional, seleccionando el mobiliario y la iluminación perfecta para compartir momentos inolvidables.",
            imagen: "/img/servicio_express/comedor.webp",
            opciones: [
                { id: 'comedor_peq', titulo: 'Comedor Diario', m2: 'Hasta 15 m²', precio: 150000 },
                { id: 'comedor_est', titulo: 'Comedor Estándar', m2: '16 a 30 m²', precio: 250000 },
                { id: 'comedor_amp', titulo: 'Comedor Amplio / Integrado', m2: 'Más de 30 m²', precio: 350000 }
            ]
        },
        {
            titulo: "Muebles",
            precio: "desde $140,000",
            descripcion: "Mobiliario a medida que define tu estilo. Diseñamos piezas únicas y funcionales, desde estanterías hasta centros de entretenimiento, optimizando cada centímetro de tu hogar.",
            imagen: "/img/servicio_express/muebles.webp",
            opciones: [
                { id: 'mueble_bas', titulo: 'Mueble Simple (1 a 2 mód.)', m2: 'Básico', precio: 140000 },
                { id: 'mueble_med', titulo: 'Mueble Intermedio', m2: 'Mediano', precio: 190000 },
                { id: 'mueble_com', titulo: 'Diseño Completo a Medida', m2: 'Avanzado', precio: 280000 }
            ]
        },
        {
            titulo: "Dormitorios",
            precio: "Desde $150,000",
            descripcion: "Tu refugio de descanso. Creamos un ambiente sereno y equilibrado, combinando texturas, colores e iluminación para garantizar el máximo confort y un sueño reparador.",
            imagen: "/img/servicio_express/dormitorio.webp",
            opciones: [
                { id: 'dorm_sim', titulo: 'Dormitorio Simple', m2: 'Hasta 10 m²', precio: 150000 },
                { id: 'dorm_dob', titulo: 'Dormitorio Doble', m2: '11 a 15 m²', precio: 200000 },
                { id: 'dorm_suite', titulo: 'Master Suite', m2: 'Más de 15 m²', precio: 250000 }
            ]
        },
        {
            titulo: "Oficina",
            precio: "desde $140,000",
            descripcion: "Productividad y confort en casa. Diseñamos tu espacio de trabajo con ergonomía y estilo, favoreciendo la concentración y la organización eficiente.",
            imagen: "/img/servicio_express/oficina.webp",
            opciones: [
                { id: 'ofi_rin', titulo: 'Rincón de Trabajo', m2: 'Hasta 6 m²', precio: 140000 },
                { id: 'ofi_est', titulo: 'Oficina Estándar', m2: '6 a 12 m²', precio: 180000 },
                { id: 'ofi_eje', titulo: 'Oficina Ejecutiva', m2: 'Más de 12 m²', precio: 250000 }
            ]
        },
        {
            titulo: "Hall Acceso",
            precio: "desde $110,000",
            descripcion: "Una bienvenida inolvidable. Transformamos la entrada de tu casa en un espacio funcional y estético que refleja la personalidad de tu hogar desde el primer paso.",
            imagen: "/img/servicio_express/hall.webp",
            opciones: [
                { id: 'hall_sim', titulo: 'Acceso Simple', m2: 'Hasta 4 m²', precio: 110000 },
                { id: 'hall_med', titulo: 'Acceso Mediano', m2: '4 a 8 m²', precio: 150000 },
                { id: 'hall_amp', titulo: 'Acceso Amplio / Doble Altura', m2: 'Más de 8 m²', precio: 210000 }
            ]
        },
        {
            titulo: "Living",
            precio: "desde $170,000",
            descripcion: "El corazón social de tu casa. Diseñamos un living sofisticado y cómodo, ideal para recibir visitas o relajarse, integrando decoración y funcionalidad.",
            imagen: "/img/servicio_express/living.webp",
            opciones: [
                { id: 'liv_acog', titulo: 'Living Acogedor', m2: 'Hasta 15 m²', precio: 170000 },
                { id: 'liv_est', titulo: 'Living Estándar', m2: '15 a 25 m²', precio: 240000 },
                { id: 'liv_gran', titulo: 'Living Gran Formato', m2: 'Más de 25 m²', precio: 340000 }
            ]
        },
        {
            titulo: "Logia",
            precio: "desde $140,000",
            descripcion: "Eficiencia y orden en el servicio. Diseñamos logias prácticas y organizadas, optimizando el almacenamiento y las zonas de lavado para facilitar las tareas diarias.",
            imagen: "/img/servicio_express/logia.webp",
            opciones: [
                { id: 'log_bas', titulo: 'Logia Básica', m2: 'Hasta 4 m²', precio: 140000 },
                { id: 'log_com', titulo: 'Logia Completa', m2: '4 a 8 m²', precio: 180000 },
                { id: 'log_int', titulo: 'Logia Integrada / Premium', m2: 'Más de 8 m²', precio: 250000 }
            ]
        },
        {
            titulo: "Sala de estar",
            precio: "desde $120,000",
            descripcion: "Un espacio versátil para el día a día. Creamos un ambiente informal y acogedor, perfecto para ver televisión, leer o disfrutar en familia con total comodidad.",
            imagen: "/img/servicio_express/sala_de_estar.webp",
            opciones: [
                { id: 'sala_int', titulo: 'Sala Íntima', m2: 'Hasta 12 m²', precio: 120000 },
                { id: 'sala_fam', titulo: 'Sala Familiar', m2: '12 a 20 m²', precio: 180000 },
                { id: 'sala_cine', titulo: 'Sala de Cine / Juegos', m2: 'Más de 20 m²', precio: 260000 }
            ]
        },
        {
            titulo: "Terraza/Quincho",
            precio: "desde $190,000",
            descripcion: "Tu oasis al aire libre. Diseñamos terrazas y quinchos funcionales para disfrutar todo el año, integrando zonas de parrilla, comedor y descanso.",
            imagen: "/img/servicio_express/terraza.webp",
            opciones: [
                { id: 'ter_bal', titulo: 'Balcón / Terraza Pequeña', m2: 'Hasta 10 m²', precio: 190000 },
                { id: 'ter_med', titulo: 'Terraza / Quincho Medio', m2: '10 a 25 m²', precio: 280000 },
                { id: 'ter_gran', titulo: 'Gran Quincho Equipado', m2: 'Más de 25 m²', precio: 450000 }
            ]
        },
        {
            titulo: "Walking Closet",
            precio: "desde $150,000",
            descripcion: "El vestidor de tus sueños. Diseñamos soluciones de almacenamiento personalizadas y elegantes para mantener tu ropa y accesorios organizados y visibles.",
            imagen: "/img/servicio_express/closet.webp",
            opciones: [
                { id: 'wc_lin', titulo: 'Vestidor Lineal', m2: 'Hasta 4 m²', precio: 150000 },
                { id: 'wc_ul', titulo: 'Vestidor en U o L', m2: '4 a 8 m²', precio: 210000 },
                { id: 'wc_room', titulo: 'Dressing Room', m2: 'Más de 8 m²', precio: 290000 }
            ]
        },
        {
            titulo: "Master Plan de Parcela",
            precio: "desde $110,000",
            descripcion: "Planificación inteligente de tu terreno. Desarrollamos un plan integral que ubica estratégicamente la vivienda y áreas exteriores, aprovechando las vistas y el entorno.",
            imagen: "/img/servicio_express/masterplan.webp",
            opciones: [
                { id: 'master_peq', titulo: 'Terreno Pequeño', m2: 'Hasta 1,000 m²', precio: 110000 },
                { id: 'master_med', titulo: 'Terreno Medio', m2: '1,000 a 2,500 m²', precio: 190000 },
                { id: 'master_par', titulo: 'Parcela Completa', m2: '5,000 m² o más', precio: 350000 }
            ]
        }
    ];

    const { agregarAlCarrito } = useContext(CarritoContext);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [servicioActivo, setServicioActivo] = useState(null);
    const [nivelSeleccionado, setNivelSeleccionado] = useState(null);

    const abrirModal = (servicio) => {
        setServicioActivo(servicio);
        setNivelSeleccionado(servicio.opciones[0]); 
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setServicioActivo(null);
        setNivelSeleccionado(null);
    };

    const manejarAgregarAlCarrito = (nivel) => {
        if (!nivel) return;

        const itemParaElCarrito = {
            titulo: `${servicioActivo.titulo} - ${nivel.titulo}`,
            precio: nivel.precio,
            imagen: servicioActivo.imagen,
            idUnico: Date.now()
        };

        agregarAlCarrito(itemParaElCarrito);
        
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({
            icon: 'success',
            title: '¡Agregado a tu cotización!',
            text: itemParaElCarrito.titulo,
            color: '#0B2126',
            iconColor: '#D4AF37',
            background: '#f9f9f9',
            customClass: {
                title: 'fs-6 fw-bold'
            }
        });

        cerrarModal();
    };

    return (
        <>
            {/* 🌟 ESTILOS MÍNIMOS EN LÍNEA PARA HOVER Y ANIMACIONES */}
            <style>{`
                .card-servicio {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                    background-color: #0B2126;
                }
                .card-servicio:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25) !important;
                }
                .btn-adiie {
                    background-color: #0B2126;
                    color: white;
                    transition: all 0.3s ease;
                }
                .btn-adiie:hover {
                    background-color: #1a3a44;
                    color: #D4AF37;
                }
                .btn-volver-icon {
                    width: 38px;
                    height: 38px;
                    background-color: #f8f9fa;
                    color: #0B2126;
                    transition: all 0.3s ease;
                }
                .btn-volver-icon:hover {
                    background-color: #D4AF37;
                    color: #0B2126;
                    transform: translateX(-3px);
                }
                .modal-backdrop-custom {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.65);
                    z-index: 1050;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    overflow-y: auto;
                }
            `}</style>

            <main className="container py-5" style={{ paddingTop: '150px' }}>
                
                {/* ENCABEZADO */}
                <div className="text-center mb-5 mt-4">
                    <h1 className="fw-bold display-5 mb-2" style={{ color: '#0B2126' }}>
                        Comienza Tu Diseño Express!
                    </h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
                        Selecciona el espacio y el nivel de diseño que necesitas para tu proyecto.
                    </p>
                </div>

                {/* GRILLA DE SERVICIOS */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center mb-5">
                    {listaServicios.map((servicio, index) => (
                        <div key={index} className="col">
                            <div 
                                className="card card-servicio border-0 h-100 shadow-sm rounded-3 overflow-hidden text-white"
                                onClick={() => abrirModal(servicio)}
                            >
                                <img 
                                    src={servicio.imagen} 
                                    className="card-img-top" 
                                    alt={servicio.titulo} 
                                    loading="lazy"
                                    style={{ height: '160px', objectFit: 'cover' }}
                                />
                                <div className="card-body text-center d-flex flex-column justify-content-between p-3">
                                    <h3 className="card-title fw-semibold fs-6 mb-2">{servicio.titulo}</h3>
                                    <p className="card-text small mb-0 fw-bold" style={{ color: '#D4AF37' }}>
                                        {servicio.precio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* MODAL PERSONALIZADO BOOTSTRAP */}
                {modalAbierto && servicioActivo && nivelSeleccionado && (
                    <div className="modal-backdrop-custom">
                        <div 
                            className="card border-0 shadow-lg rounded-4 overflow-hidden position-relative w-100" 
                            style={{ maxWidth: '900px', backgroundColor: '#ffffff' }}
                        >
                            {/* 🌟 Botón Volver (Izquierda) */}
                            <button 
                                type="button" 
                                className="btn btn-volver-icon rounded-circle position-absolute top-0 start-0 m-3 z-3 border-0 d-flex align-items-center justify-content-center shadow-sm"
                                onClick={cerrarModal}
                                title="Volver a los servicios"
                            >
                                <i className="fas fa-arrow-left fs-6"></i>
                            </button>

                            {/* 🌟 Botón Cerrar (Derecha) */}
                            <button 
                                type="button" 
                                className="btn-close position-absolute top-0 end-0 m-3 z-3 shadow-none" 
                                onClick={cerrarModal}
                                aria-label="Close"
                            ></button>

                            <div className="card-body p-4 p-md-5 mt-4 mt-md-2">
                                <div className="row g-4 align-items-center">
                                    
                                    {/* Imagen a la Izquierda */}
                                    <div className="col-12 col-md-5 text-center">
                                        <img 
                                            src={servicioActivo.imagen} 
                                            alt={servicioActivo.titulo} 
                                            className="img-fluid rounded-3 shadow-sm w-100"
                                            style={{ maxHeight: '280px', objectFit: 'cover' }}
                                        />
                                    </div>

                                    {/* Información y Formulario a la Derecha */}
                                    <div className="col-12 col-md-7 text-start">
                                        <h2 className="fw-bold h3 mb-2" style={{ color: '#0B2126' }}>
                                            {servicioActivo.titulo}
                                        </h2>
                                        <p className="text-secondary small mb-4" style={{ lineHeight: '1.6' }}>
                                            {servicioActivo.descripcion}
                                        </p>

                                        {/* Selector de Plan */}
                                        <div className="mb-4">
                                            <label className="form-label fw-bold text-dark small mb-2">
                                                Selecciona tu plan:
                                            </label>
                                            <select
                                                className="form-select form-select-lg border-2 shadow-none fs-6"
                                                style={{ borderColor: '#ddd', borderRadius: '8px' }}
                                                value={nivelSeleccionado.id}
                                                onChange={(e) => {
                                                    const nivel = servicioActivo.opciones.find(n => n.id === e.target.value);
                                                    setNivelSeleccionado(nivel);
                                                }}
                                            >
                                                {servicioActivo.opciones.map((nivel) => (
                                                    <option key={nivel.id} value={nivel.id}>
                                                        {nivel.titulo} ({nivel.m2}) - ${nivel.precio.toLocaleString()}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Botón Agregar al Carrito */}
                                        <button
                                            type="button"
                                            className="btn btn-adiie btn-lg w-100 fw-bold py-3 rounded-3 shadow-sm"
                                            onClick={() => manejarAgregarAlCarrito(nivelSeleccionado)}
                                        >
                                            Agregar al Carrito - ${nivelSeleccionado.precio.toLocaleString()}
                                        </button>
                                    </div>

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