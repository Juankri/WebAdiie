import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // 🌟 Importamos Helmet
import '../App.css';

function Servicios() {
    const listaServicios = [
        {
            enlace: "/infoservicioexpress",
            icono: "/img/sol.png",
            titulo: "Servicio Express",
            descripcion: ["Un servicio para quienes buscan la decoración de su espacio en poco tiempo. Pensado para quienes se animan a implementar el diseño por su cuenta y así lograr un importante ahorro."]
        },
        {
            enlace: null,
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
        <section id="Servicios" className="py-5" style={{ backgroundColor: '#0B2126' }}>
            
            {/* 🌟 MAGIA SEO: HELMET CON PALABRAS CLAVE ESTRATÉGICAS 🌟 */}
            <Helmet>
                <title>Servicios de Arquitectura y Construcción | EstudioAdiie</title>
                <meta 
                    name="description" 
                    content="Descubre los servicios de EstudioAdiie: Diseño arquitectónico, construcción de obras, diseño de interiores, regularización municipal (Ley del Mono) y nuestro exclusivo Servicio Express." 
                />
                <meta 
                    name="keywords" 
                    content="arquitectura, construcción, diseño de interiores, remodelaciones, servicio express arquitectura, planos 2D, modelado 3D, visualizaciones realistas, regularización municipal, permisos de edificación, ley del mono, master plan parcela, Estudio Adiie, Chile" 
                />
                {/* Etiquetas para compartir bonito en WhatsApp/Facebook */}
                <meta property="og:title" content="Servicios de Arquitectura y Construcción | EstudioAdiie" />
                <meta property="og:description" content="Hacemos realidad tus proyectos. Desde diseño express y planos 3D hasta la construcción y regularización legal de tu propiedad." />
            </Helmet>

            <div className="container py-4">
                
                {/* TÍTULO DE LA SECCIÓN */}
                <h2 className="text-center text-white mb-5 fw-bold text-uppercase" style={{ letterSpacing: '2px' }}>
                    Servicios
                </h2>

                {/* GRILLA RESPONSIVA */}
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                    {listaServicios.map((servicio, index) => {
                        
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

                        if (servicio.enlace) {
                            return (
                                <div key={index} className="col d-flex justify-content-center">
                                    <Link to={servicio.enlace} className="card card-servicio-custom h-100 border-0 shadow text-decoration-none">
                                        {contenidoTarjeta}
                                    </Link>
                                </div>
                            );
                        }

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