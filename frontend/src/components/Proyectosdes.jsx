import { useState } from 'react';

function Proyectosdes() {
    // 1. NUESTRA BASE DE DATOS LOCAL DE PROYECTOS
    const listaProyectos = [
        {
            titulo: "QUINCHO AF",
            descripcion: "Diseño de quincho moderno con piscina, estilo minimalista y acabados en madera...",
            imagen: "/img/Proyecto01/QUINCHO_AF/quincho05.webp", // Ruta desde public/
            enlace: "/galeria-proyectos"
        },
        {
            titulo: "Locales Comerciales",
            descripcion: "Diseño arquitectónico comercial. Fachadas modernas con iluminación estratégica y distribución optimizada para maximizar la visibilidad y el flujo de clientes.",
            imagen: "/img/Proyecto02/LOCALES_COMERCIALES/locales01.webp",
            enlace: "/galeria-proyectos"
        }
        // ¡Puedes agregar más aquí fácilmente!
    ];

    // 2. EL ESTADO: ¿Qué diapositiva estamos viendo ahora? (Empezamos en la 0)
    const [slideActual, setSlideActual] = useState(0);

    // 3. FUNCIONES DE CONTROL
    const siguienteSlide = () => {
        // Si estamos en la última, volvemos a la 0. Si no, sumamos 1.
        setSlideActual((prev) => (prev === listaProyectos.length - 1 ? 0 : prev + 1));
    };

    const slideAnterior = () => {
        // Si estamos en la 0, vamos a la última. Si no, restamos 1.
        setSlideActual((prev) => (prev === 0 ? listaProyectos.length - 1 : prev - 1));
    };

    return (
        <section id="Proyectos" className="home_proyectos">
            <div className="slider-container">
                <h1>Proyectos Destacados</h1>

                {/* Botón Anterior */}
                <button className="slider-btn prev" onClick={slideAnterior}>
                    &#10094;
                </button>

                {/* DIBUJAMOS LOS PROYECTOS */}
                {listaProyectos.map((proyecto, index) => {
                    // Solo el proyecto cuyo índice coincida con 'slideActual' tendrá la clase 'activo'
                    const esActivo = index === slideActual;

                    return (
                        <div 
                            key={index} 
                            className={`slide-proyecto fade ${esActivo ? 'activo' : ''}`}
                            // Ocultamos con CSS los que no están activos para que no estorben
                            style={{ display: esActivo ? '' : 'none' }} 
                        >
                            <div className="slide-imagen">
                                <img src={proyecto.imagen} alt={`Imagen de ${proyecto.titulo}`} />
                            </div>

                            <div className="slide-texto">
                                <h3>{proyecto.titulo}</h3>
                                <p>{proyecto.descripcion}</p>
                                <a href={proyecto.enlace} className="boton_info">Ver más...</a>
                            </div>
                        </div>
                    );
                })}

                {/* Botón Siguiente */}
                <button className="slider-btn next" onClick={siguienteSlide}>
                    &#10095;
                </button>
            </div>
        </section>
    );
}

export default Proyectosdes;