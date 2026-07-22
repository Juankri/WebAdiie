import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Portafolio.css'; 

function Portafolio() {
    return (
        <>
            {/* BOOTSTRAP: container centra el contenido. mt-5 le da el espacio para que la Navbar no lo tape */}
            <main className="container" style={{ marginTop: '140px', marginBottom: '80px' }}>
                
                {/* ENCABEZADO */}
                <div className="text-center mb-5">
                    <h1 className="fw-bold text-uppercase" style={{ color: '#0B2126', letterSpacing: '2px' }}>
                        Portafolio
                    </h1>
                    <p className="text-muted fs-5">
                        Una muestra de nuestro trabajo en diseño y construcción.
                    </p>
                </div>
                
                {/* GRILLA DE TARJETAS: row alinea, g-5 da un espaciado amplio y elegante */}
                <div className="row g-5 justify-content-center">

                    {/* TARJETA 2: PROYECTOS */}
                    <div className="col-12 col-md-10 col-lg-6">
                        <Link to="/galeria_proyectos" className="text-decoration-none">
                            <h2 className="h4 text-center fw-bold mb-3" style={{ color: '#0B2126' }}>
                                Proyectos
                            </h2>
                            
                            {/* CONTENEDOR DE LA IMAGEN */}
                            <div className="card border-0 shadow rounded overflow-hidden position-relative portafolio-card">
                                <img 
                                    src="/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp" 
                                    alt="Proyectos" 
                                    className="w-100 object-fit-cover"
                                    style={{ height: '350px' }}
                                />
                                
                                {/* CAPA OSCURA QUE APARECE EN HOVER (Descripción) */}
                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center portafolio-overlay p-4">
                                    <p className="text-white text-center fw-bold fs-5 m-0" style={{ letterSpacing: '1px' }}>
                                        Explorar proyectos realizados
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                    {/* TARJETA 1: DISEÑOS PERSONALIZADOS */}
                    {/* Ocupa 12 columnas en celular, 10 en tablet y 6 (mitad) en PC */}
                    <div className="col-12 col-md-10 col-lg-6">
                        <Link to="/galeria_diseños_personalizados" className="text-decoration-none">
                            <h2 className="h4 text-center fw-bold mb-3" style={{ color: '#0B2126' }}>
                                Diseños Personalizados
                            </h2>
                            
                            {/* CONTENEDOR DE LA IMAGEN */}
                            <div className="card border-0 shadow rounded overflow-hidden position-relative portafolio-card">
                                <img 
                                    src="/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp" 
                                    alt="Diseños Personalizados" 
                                    className="w-100 object-fit-cover"
                                    style={{ height: '350px' }} // Altura ideal para arquitectura
                                />
                                
                                {/* CAPA OSCURA QUE APARECE EN HOVER (Descripción) */}
                                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center portafolio-overlay p-4">
                                    <p className="text-white text-center fw-bold fs-5 m-0" style={{ letterSpacing: '1px' }}>
                                        Ver galería de diseños a medida
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    

                </div>
            </main>

            {/* FORMULARIO DE CONTACTO */}
            <Contacto />
        </>
    );
}

export default Portafolio;