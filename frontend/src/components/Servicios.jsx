import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para los enlaces internos
import '../App.css'; // Solo para el efecto de hover premium

function Servicios() {
    const listaServicios = [
        {
            enlace: "/infoservicioexpress",
            icono: "/img/sol.png",
            titulo: "Servicio Express",
            descripcion: ["Un servicio para quienes buscan la decoración de su espacio en poco tiempo. Pensado para quienes se animan a implementar el diseño por su cuenta y así lograr un importante ahorro."]
        },
        {
            enlace: "/galeria-disenos",
            icono: "/img/hogar.png",
            titulo: "Diseño arquitectónico",
            descripcion: [
                "Proyectos residenciales, comerciales o industriales.",
                "Planos 2D y modelado 3D.",
                "Visualizaciones realistas.",
                "Master Plan de tu Parcela"
            ]
        },
        {
            enlace: null,
            icono: "/img/seguridad-del-casco-del-usuario.png",
            titulo: "Construcción y ejecución de obras",
            descripcion: [
                "Supervisión y gestión de obra.",
                "Presupuestos y control de materiales.",
                "Mano de obra y dirección técnica."
            ]
        },
        {
            enlace: null,
            icono: "/img/buscar-alt.png",
            titulo: "Documentación técnica",
            descripcion: [
                "Tramitación Municipal y Regularización.",
                "Permisos de edificación.",
                "Certificados y trámites legales.",
                "LEY 20.898 (LEY DEL MONO)"
            ]
        },
        {
            enlace: null,
            icono: "/img/apreton-de-manos.png",
            titulo: "Diseño de interiores",
            descripcion: ["Decoración, mobiliario, iluminación, distribución de espacios."]
        },
        {
            enlace: null,
            icono: "/img/chat-flecha-crecer.png",
            titulo: "Reformas y remodelaciones",
            descripcion: ["Ampliaciones, modernización de espacios y eficiencia energética."]
        }
    ];

    return (
        // BOOTSTRAP: py-5 da espaciado arriba/abajo, style maneja tu color corporativo #0B2126
        <section id="Servicios" className="py-5" style={{ backgroundColor: '#0B2126' }}>
            <div className="container py-4">
                
                {/* TÍTULO DE LA SECCIÓN */}
                <h2 className="text-center text-white mb-5 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                    Servicios
                </h2>

                {/* GRILLA RESPONSIVA: 1 col en celular, 2 en tablets (md), 3 en PC (lg). g-4 maneja la separación */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {listaServicios.map((servicio, index) => {
                        
                        // Contenido interno estructurado con Flexbox de Bootstrap para alinear todo verticalmente
                        const contenidoTarjeta = (
                            <div className="card-body d-flex flex-column align-items-center text-center p-4">
                                <img 
                                    src={servicio.icono} 
                                    alt={`Icono de ${servicio.titulo}`} 
                                    className="mb-3"
                                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                                />
                                <h3 className="card-title h5 fw-bold mb-3" style={{ color: '#0B2126' }}>
                                    {servicio.titulo}
                                </h3>
                                <ul className="card-text list-unstyled m-0 small" style={{ color: '#0B2126', lineHeight: '1.5' }}>
                                    {servicio.descripcion.map((item, i) => (
                                        <li key={i} className={servicio.descripcion.length > 1 ? "mb-2" : ""}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );

                        // Si tiene enlace, envolvemos la tarjeta en un Link de react-router-dom
                        if (servicio.enlace) {
                            return (
                                <div key={index} className="col d-flex justify-content-center">
                                    <Link to={servicio.enlace} className="card card-servicio-custom h-100 border-0 shadow text-decoration-none">
                                        {contenidoTarjeta}
                                    </Link>
                                </div>
                            );
                        }

                        // Si no tiene enlace, es un div estático con aspecto idéntico
                        return (
                            <div key={index} className="col d-flex justify-content-center">
                                <div className="card card-servicio-custom h-100 border-0 shadow">
                                    {contenidoTarjeta}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default Servicios;