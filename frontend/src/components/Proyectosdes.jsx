import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Recomendado usar Link de React en vez de <a>

function Proyectosdes() {
    // 1. EL ESTADO: Ahora la lista empieza vacía porque viene de Internet
    const [listaProyectos, setListaProyectos] = useState([]);
    const [slideActual, setSlideActual] = useState(0);
    const [cargando, setCargando] = useState(true);

    // 2. CONECTAR A LA BASE DE DATOS (Mongoose/MongoDB)
    useEffect(() => {
        const obtenerProyectosDestacados = async () => {
            try {
                // Reemplaza esta URL por la ruta GET de tus proyectos en Render o Localhost
                const respuesta = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
                const data = await respuesta.json();

                // MAGIA: Filtramos la base de datos para buscar solo los "destacados"
                const proyectosDestacados = data.filter(proyecto => proyecto.destacado === true);

                // Lógica de respaldo: Si el cliente aún no ha marcado ninguno como destacado, 
                // mostramos los últimos 3 que subió por defecto para que no quede vacío.
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

    // 3. FUNCIONES DE CONTROL DEL SLIDER
    const siguienteSlide = () => {
        setSlideActual((prev) => (prev === listaProyectos.length - 1 ? 0 : prev + 1));
    };

    const slideAnterior = () => {
        setSlideActual((prev) => (prev === 0 ? listaProyectos.length - 1 : prev - 1));
    };

    return (
        <section id="Proyectos" className="home_proyectos">
            <div className="slider-container">
                <h1>Proyectos Destacados</h1>

                {/* Si está cargando desde Mongo, mostramos un mensaje temporal */}
                {cargando ? (
                    <p style={{ textAlign: 'center', color: '#0B2126' }}>Cargando proyectos espectaculares...</p>
                ) : (
                    <>
                        {/* Botón Anterior */}
                        <button className="slider-btn prev" onClick={slideAnterior}>
                            &#10094;
                        </button>

                        {/* DIBUJAMOS LOS PROYECTOS DESDE MONGO */}
                        {listaProyectos.map((proyecto, index) => {
                            const esActivo = index === slideActual;

                            return (
                                <div 
                                    key={proyecto._id || index} // Usamos el _id de Mongo como key 
                                    className={`slide-proyecto mi_fade ${esActivo ? 'activo' : ''}`}
                                    style={{ display: esActivo ? '' : 'none' }} 
                                >
                                    <div className="slide-imagen">
                                        {/* Asegúrate de que el nombre del campo imagen coincida con tu BD (ej: proyecto.imagen o proyecto.imagenUrl) */}
                                        <img src={proyecto.imagen} alt={`Imagen de ${proyecto.titulo}`} />
                                    </div>

                                    <div className="slide-texto">
                                        <h3>{proyecto.titulo}</h3>
                                        {/* Cortamos la descripción si es muy larga para que no rompa el diseño */}
                                        <p>{proyecto.descripcion.substring(0, 150)}...</p>
                                        
                                        <Link to="/portafolio" className="boton_info">Ver más...</Link>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Botón Siguiente */}
                        <button className="slider-btn next" onClick={siguienteSlide}>
                            &#10095;
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}

export default Proyectosdes;