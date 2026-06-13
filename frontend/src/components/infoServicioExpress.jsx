import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


const InfoServicioExpress = () => {
    return (<>
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
                <div className="row g-4 mt-2">

                    {/* Paso 1 */}
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div className="mb-3 d-flex justify-content-center">
                                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '70px', height: '70px', backgroundColor: '#0B2126', color: '#D4AF37', fontSize: '30px' }}>
                                    <i className="bi bi-credit-card-fill"></i>
                                </div>
                            </div>
                            <h3 style={{ color: '#0B2126', fontWeight: '700' }}>1. Reserva tu Diseño de Arquitectura Online</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Inicia tu proyecto de arquitectura online realizando un pago único mediante nuestra pasarela segura. Sin costos ocultos. Tu diseño de planos express comienza aquí.
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
                            <h3 style={{ color: '#0B2126', fontWeight: '700' }}>2. Envíanos las Medidas de tu Espacio</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Completa un breve formulario online. Sube fotos de tu espacio actual y cuéntanos tus ideas para la remodelación rápida o diseño de interiores que sueñas tener.
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
                            <h3 style={{ color: '#0B2126', fontWeight: '700' }}>3. Creación de Renders 3D y Planos de Distribución</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Nuestro estudio de arquitectura optimizará tu distribución. Crearemos un concepto exclusivo con renders 3D fotorrealistas y planos de distribución a tu medida.
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
                            <h3 style={{ color: '#0B2126', fontWeight: '700' }}>4. Entrega de Proyecto Listo para Construir</h3>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Recibe tu diseño arquitectónico express en tu correo, incluyendo la lista de materiales y mobiliario sugerido. ¡Todo listo para empezar tu obra!
                            </p>
                        </div>
                    </div>

                </div>


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