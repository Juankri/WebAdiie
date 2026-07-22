import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Solo dejaremos la pequeña animación aquí

function Proyectosdes() {
    const [listaProyectos, setListaProyectos] = useState([]);
    const [slideActual, setSlideActual] = useState(0);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProyectosDestacados = async () => {
            try {
                const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/proyectos`);
                const data = await respuesta.json();
                const proyectosDestacados = data.filter(proyecto => proyecto.destacado === true);

                if (proyectosDestacados.length > 0) {
                    setListaProyectos(proyectosDestacados);
                } else {
                    setListaProyectos(data.slice(0, 3)); 
                }
                setCargando(false);
            } catch (error) {
                console.error("Error cargando los proyectos destacados:", error);
                setCargando(false);
            }
        };

        obtenerProyectosDestacados();
    }, []);

    const siguienteSlide = () => {
        setSlideActual((prev) => (prev === listaProyectos.length - 1 ? 0 : prev + 1));
    };

    const slideAnterior = () => {
        setSlideActual((prev) => (prev === 0 ? listaProyectos.length - 1 : prev - 1));
    };

    return (
        <section id="Proyectos" className="py-5 bg-white">
            <div className="container position-relative py-4">
                
                <h2 className="text-center mb-4 fw-bold ms-md-4" style={{ color: '#0B2126' }}>
                    Proyectos Destacados
                </h2>

                {cargando ? (
                    <p className="text-center fw-bold" style={{ color: '#0B2126' }}>Cargando proyectos espectaculares...</p>
                ) : (
                    <div className="position-relative px-2 px-md-5">

                        {/* 🌟 BOTÓN ANTERIOR: Cambiamos z-3 por z-1 🌟 */}
                        <button 
                            className="btn btn-dark position-absolute top-50 start-0 translate-middle-y rounded-circle z-1 shadow border-0" 
                            onClick={slideAnterior}
                            style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                            &#10094;
                        </button>

                        {/* SLIDER CONTENEDOR */}
                        {listaProyectos.map((proyecto, index) => {
                            if (index !== slideActual) return null;

                            return (
                                <div key={proyecto._id || index} className="row g-0 shadow-lg rounded overflow-hidden mi-fade">
                                    
                                    <div className="col-12 col-lg-8">
                                        <img 
                                            src={proyecto.imagen_url} 
                                            alt={`Imagen de ${proyecto.titulo}`} 
                                            className="w-100 h-100 object-fit-cover"
                                            style={{ minHeight: '300px' }}
                                        />
                                    </div>

                                    <div className="col-12 col-lg-4 d-flex flex-column p-4 p-md-5" 
                                         style={{ backgroundColor: '#0B2126', borderLeft: '2px solid #000' }}>
                                        
                                        <h3 className="text-white mb-3 fw-bold">{proyecto.titulo}</h3>
                                        <p className="text-white mb-4" style={{ opacity: 0.9, lineHeight: '1.6' }}>
                                            {proyecto.descripcion.substring(0, 150)}...
                                        </p>
                                        
                                        <Link 
                                            to="/portafolio" 
                                            className="btn bg-white text-dark fw-bold mt-auto align-self-start px-4 py-2 border border-dark"
                                            style={{ borderRadius: '8px' }}>
                                            Ver más...
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}

                        {/* 🌟 BOTÓN SIGUIENTE: Cambiamos z-3 por z-1 🌟 */}
                        <button 
                            className="btn btn-dark position-absolute top-50 end-0 translate-middle-y rounded-circle z-1 shadow border-0" 
                            onClick={siguienteSlide}
                            style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0,0,0,0.6)' }}
                        >
                            &#10095;
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Proyectosdes;