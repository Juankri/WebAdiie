import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Pagina_proyecto.css';
import Contacto from '../components/Contacto'; 

function PaginaProyecto() {
    const { idUrl } = useParams();
    
    const [proyecto, setProyecto] = useState(null);
    const [cargando, setCargando] = useState(true);

    const [fotoAmpliada, setFotoAmpliada] = useState(null);
    const [indiceActual, setIndiceActual] = useState(0);

    // --- FUNCIÓN PARA EL VIDEO DE YOUTUBE ---
    // Convierte links normales en links de "incrustar" (embed)
    const obtenerEmbedUrl = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    useEffect(() => {
        const obtenerDetalles = async () => {
            try {
                const respuesta = await fetch(`https://webadiie-backend.onrender.com/api/proyectos/${idUrl}`);
                const datos = await respuesta.json();
                setProyecto(datos);
                setCargando(false);
            } catch (error) {
                console.error('Error al cargar detalles:', error);
                setCargando(false);
            }
        };
        obtenerDetalles();
    }, [idUrl]);

    if (cargando) {
        return <h2 style={{ textAlign: 'center', marginTop: '150px' }}>Cargando el proyecto... ⏳</h2>;
    }

    if (!proyecto || proyecto.error) {
        return (
            <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh' }}>
                <h2>Proyecto no encontrado 🕵️‍♂️</h2>
                <Link to="/galeria_proyectos" style={{ color: '#D4AF37' }}>Volver a la Galería</Link>
            </div>
        );
    }

    // Galería: usa las fotos extra, o si no hay, usa la principal
    const galeriaFotos = proyecto.galeria && proyecto.galeria.length > 0 ? proyecto.galeria : [proyecto.imagen_url];

    const abrirLightbox = (index) => {
        setIndiceActual(index);
        setFotoAmpliada(galeriaFotos[index]);
    };

    const cerrarLightbox = () => setFotoAmpliada(null);

    const cambiarImagen = (direccion) => {
        let nuevoIndice = indiceActual + direccion;
        if (nuevoIndice < 0) nuevoIndice = galeriaFotos.length - 1;
        if (nuevoIndice >= galeriaFotos.length) nuevoIndice = 0;
        setIndiceActual(nuevoIndice);
        setFotoAmpliada(galeriaFotos[nuevoIndice]);
    };

    return (
        <>
        <main className="main_proyecto" style={{ paddingTop: '120px' }}>
            <div className="proyecto">
                <div className="tarjeta_proyecto">
                    <img 
                        src={proyecto.imagen_url} 
                        alt={proyecto.titulo} 
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <div className="descripcion_proyecto">
                    <h1>{proyecto.titulo}</h1>
                    <p>{proyecto.descripcion}</p>
                </div>
            </div>
        </main>

        {/* --- SECCIÓN DE LA GALERÍA --- */}
        <section className="seccion_fotos">
            <h2>Galería de Fotos</h2>
            <div className="fotos_proyectos">
                {galeriaFotos.map((foto, index) => (
                    <div className="foto" key={index} onClick={() => abrirLightbox(index)}>
                        <img className="foto_img" src={foto} alt={`Foto ${index + 1}`} style={{cursor: 'pointer'}} />
                        <p>Vista de la obra</p>
                    </div>
                ))}
            </div>

            {/* --- EL LIGHTBOX --- */}
            {fotoAmpliada && (
                <div id="lightbox" className="lightbox" style={{ display: 'block' }}>
                    <span className="close-lightbox" onClick={cerrarLightbox}>&times;</span>
                    <button className="nav-btn prev" onClick={() => cambiarImagen(-1)}>&#10094;</button>
                    <img className="lightbox-content" src={fotoAmpliada} alt="Vista ampliada" />
                    <button className="nav-btn next" onClick={() => cambiarImagen(1)}>&#10095;</button>
                </div>
            )}
        </section>

        {/* --- SECCIÓN DE VIDEO OPCIONAL --- */}
        {proyecto.video_url && (
            <section className="seccion_video" style={{ padding: '20px', maxWidth: '1000px', margin: '40px auto', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>Proceso de Construcción</h2>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                    <iframe 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={obtenerEmbedUrl(proyecto.video_url)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>
        )}

        <Contacto />
        </>
    );
}

export default PaginaProyecto;