import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const InfoServicioExpress = () => {
    return (
        <>
            <Helmet>
                <title>Servicio de Arquitectura Express en Rancagua | Planos y Renders 3D</title>
                <meta 
                  name="description" 
                  content="¿Necesitas remodelar? Obtén el diseño arquitectónico de tu espacio, planos detallados y renders 3D fotorrealistas de forma rápida, online y segura en Chile." 
                />
                <meta name="keywords" content="diseño de planos express, arquitectura online, hacer planos online de casas, renders 3d rancagua, estudio adiie, diseño de locales comerciales rápido" />
            </Helmet>

            <section className="py-5" style={{ backgroundColor: '#fdfdfd', marginTop: '100px' }}>
                <div className="container py-5">

                    {/* Cabecera de la sección */}
                    <div className="row justify-content-center text-center mb-5">
                        <div className="col-lg-8">
                            <h2
                                style={{ color: '#0B2126', fontWeight: '800', fontFamily: "'Montserrat', sans-serif" }}
                                className="display-5 mb-3"
                            >
                                Servicio de Diseño Arquitectónico Express Online
                            </h2>
                            <p className="lead text-muted" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '1.1rem' }}>
                                Planos profesionales, Renders 3D y diseño de interiores en tiempo récord para tu remodelación. <strong>100% online, rápido y accesible.</strong>
                            </p>
                        </div>
                    </div>

                    {/* Tarjetas de Pasos (Cómo funciona) */}
                    <div className="row g-4 mt-2 mb-5">
                        {/* Paso 1 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="mb-3 d-flex justify-content-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', backgroundColor: '#0B2126', color: '#D4AF37', fontSize: '30px' }}>
                                        <i className="bi bi-credit-card-fill"></i>
                                    </div>
                                </div>
                                <h3 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.25rem' }}>1. Reserva tu Diseño</h3>
                                <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                                    Inicia tu proyecto online realizando un pago único mediante nuestra pasarela segura. Sin costos ocultos.
                                </p>
                            </div>
                        </div>

                        {/* Paso 2 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="mb-3 d-flex justify-content-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', backgroundColor: '#0B2126', color: '#D4AF37', fontSize: '30px' }}>
                                        <i className="bi bi-ui-checks"></i>
                                    </div>
                                </div>
                                <h3 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.25rem' }}>2. Envíanos las Medidas</h3>
                                <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                                    Completa un breve formulario. Sube fotos de tu espacio actual y cuéntanos tus ideas para la remodelación.
                                </p>
                            </div>
                        </div>

                        {/* Paso 3 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="mb-3 d-flex justify-content-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', backgroundColor: '#0B2126', color: '#D4AF37', fontSize: '30px' }}>
                                        <i className="bi bi-compass"></i>
                                    </div>
                                </div>
                                <h3 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.25rem' }}>3. Creación del Diseño</h3>
                                <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                                    Nuestro estudio optimizará tu distribución, creando un concepto exclusivo con renders 3D fotorrealistas.
                                </p>
                            </div>
                        </div>

                        {/* Paso 4 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div className="mb-3 d-flex justify-content-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', backgroundColor: '#0B2126', color: '#D4AF37', fontSize: '30px' }}>
                                        <i className="bi bi-box-seam"></i>
                                    </div>
                                </div>
                                <h3 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.25rem' }}>4. Entrega de Proyecto</h3>
                                <p className="text-muted mt-2" style={{ fontSize: '0.9rem' }}>
                                    Recibe tu diseño arquitectónico express en tu correo, con todo lo necesario para empezar tu obra.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 🌟 NUEVA SECCIÓN: ENTREGABLES (QUÉ INCLUYE) 🌟 */}
                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0" style={{ borderRadius: '20px', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                                <div className="row g-0">
                                    {/* Columna Izquierda: Título y texto */}
                                    <div className="col-md-5 p-5 text-white d-flex flex-column justify-content-center" style={{ backgroundColor: '#0B2126' }}>
                                        <h3 style={{ color: '#D4AF37', fontWeight: '800', fontFamily: "'Montserrat', sans-serif" }} className="mb-3">
                                            ¿Qué recibirás al contratar?
                                        </h3>
                                        <p style={{ fontSize: '1rem', opacity: '0.9' }}>
                                            No solo te entregamos una idea, te damos un <strong>Manual de Construcción y Diseño</strong> digital. Todo lo que tu contratista o tú necesitan para ejecutar la obra sin errores ni sobrecostos.
                                        </p>
                                    </div>
                                    
                                    {/* Columna Derecha: Lista de Entregables */}
                                    <div className="col-md-7 p-5">
                                        <div className="row g-4">
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-images me-3" style={{ fontSize: '1.8rem', color: '#D4AF37' }}></i>
                                                    <div>
                                                        <h5 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Renders 3D Realistas</h5>
                                                        <p className="text-muted small mb-0">Imágenes en alta calidad para que veas el resultado final antes de construir.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-rulers me-3" style={{ fontSize: '1.8rem', color: '#D4AF37' }}></i>
                                                    <div>
                                                        <h5 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Planos de Distribución</h5>
                                                        <p className="text-muted small mb-0">Planos 2D acotados (con medidas exactas) para la correcta ejecución del espacio.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-cart-check-fill me-3" style={{ fontSize: '1.8rem', color: '#D4AF37' }}></i>
                                                    <div>
                                                        <h5 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Lista de Compras</h5>
                                                        <p className="text-muted small mb-0">Recomendación de mobiliario, iluminación y materiales (con tiendas sugeridas).</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-start">
                                                    <i className="bi bi-palette-fill me-3" style={{ fontSize: '1.8rem', color: '#D4AF37' }}></i>
                                                    <div>
                                                        <h5 style={{ color: '#0B2126', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.2rem' }}>Moodboard de Estilo</h5>
                                                        <p className="text-muted small mb-0">Paleta de colores y texturas diseñadas específicamente para tu ambiente.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* FIN NUEVA SECCIÓN */}

                    {/* Botón de Llamado a la acción */}
                    <div className="row mt-5 pt-3">
                        <div className="col text-center">
                            <Link
                                to="/servicio-express"
                                className="btn btn-lg shadow"
                                style={{
                                    backgroundColor: '#D4AF37',
                                    color: '#0B2126',
                                    fontWeight: '700',
                                    padding: '15px 40px',
                                    borderRadius: '50px',
                                    border: '2px solid #D4AF37',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#0B2126'; e.target.style.color = '#D4AF37'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#D4AF37'; e.target.style.color = '#0B2126'; }}
                            >
                                Comenzar mi Proyecto Express <i className="bi bi-arrow-right ms-2"></i>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default InfoServicioExpress;