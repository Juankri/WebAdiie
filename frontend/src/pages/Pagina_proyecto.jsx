import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Pagina_proyecto.css';
import Contacto from '../components/Contacto'; 

function PaginaProyecto() {
    // 1. Aquí atrapamos el ID exactamente como viene en la URL
    const { id } = useParams();
    
    // 2. Estados para la base de datos
    const [proyecto, setProyecto] = useState(null);
    const [cargando, setCargando] = useState(true);

    // 3. Estados para controlar el Lightbox
    const [fotoAmpliada, setFotoAmpliada] = useState(null);
    const [indiceActual, setIndiceActual] = useState(0);

    // 4. Conectamos a tu backend en Render para buscar este ID en específico
    useEffect(() => {
        const obtenerDetalles = async () => {
            try {
                // Usamos el 'id' para buscar en Python
                const respuesta = await fetch(`https://webadiie-backend.onrender.com/api/proyectos/${id}`);
                const datos = await respuesta.json();
                
                setProyecto(datos);
                setCargando(false);
            } catch (error) {
                console.error('Error al cargar detalles:', error);
                setCargando(false);
            }
        };

        obtenerDetalles();
    }, [id]); // Dependemos del 'id'

    // 5. Pantallas de carga y error
    if (cargando) {
        return <h2 style={{ textAlign: 'center', marginTop: '150px' }}>Cargando el proyecto... ⏳</h2>;
    }

    if (!proyecto || proyecto.error) {
        return (
            <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh' }}>
                <h2>Proyecto no encontrado 🕵️‍♂️</h2>
                <Link to="/proyectos" style={{ color: '#D4AF37' }}>Volver a la Galería</Link>
            </div>
        );
    }

    // 6. Salvavidas: Como en Mongo solo guardamos 1 imagen por ahora, 
    // creamos un arreglo falso para que tu Lightbox no explote.
    const galeriaFotos = proyecto.galeria || [proyecto.imagen_url];

    // 7. Tus funciones del Lightbox (¡Intactas!)
    const abrirLightbox = (index) => {
        setIndiceActual(index);
        setFotoAmpliada(galeriaFotos[index]);
    };

    const cerrarLightbox = () => {
        setFotoAmpliada(null);
    };

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
                    {/* Mostramos la imagen que viene de Mongo */}
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

        <Contacto />
        </>
    );
}

export default PaginaProyecto;