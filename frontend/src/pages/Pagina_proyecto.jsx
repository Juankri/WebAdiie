// src/pages/pagina_proyecto.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { baseDeDatosProyectos } from '../data/Proyectos';
import './Pagina_proyecto.css';


// Si tus componentes ya existen, impórtalos para que aparezcan abajo
import Contacto from '../components/Contacto'; 

function PaginaProyecto() {
    const { idUrl } = useParams();
    
    // 1. Estados para controlar la galería en pantalla grande (Lightbox)
    const [fotoAmpliada, setFotoAmpliada] = useState(null);
    const [indiceActual, setIndiceActual] = useState(0);

    // 2. Buscamos el proyecto
    const proyecto = baseDeDatosProyectos.find((item) => item.id === idUrl);

    if (!proyecto) {
        return (
            <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh' }}>
                <h2>Proyecto no encontrado 🕵️‍♂️</h2>
                <Link to="/portafolio" style={{ color: '#D4AF37' }}>Volver al Portafolio</Link>
            </div>
        );
    }

    // 3. Funciones para navegar en la galería
    const abrirLightbox = (index) => {
        setIndiceActual(index);
        setFotoAmpliada(proyecto.galeria[index]);
    };

    const cerrarLightbox = () => {
        setFotoAmpliada(null);
    };

    const cambiarImagen = (direccion) => {
        let nuevoIndice = indiceActual + direccion;
        // Lógica para que sea infinito (si pasa de la última, vuelve a la primera)
        if (nuevoIndice < 0) nuevoIndice = proyecto.galeria.length - 1;
        if (nuevoIndice >= proyecto.galeria.length) nuevoIndice = 0;
        
        setIndiceActual(nuevoIndice);
        setFotoAmpliada(proyecto.galeria[nuevoIndice]);
    };

    return (
        <>
        <main className="main_proyecto" style={{ paddingTop: '120px' }}>
            <div className="proyecto">
                <div className="tarjeta_proyecto">
                    <img src={proyecto.imagenPrincipal} 
                        alt={proyecto.titulo} 
                        // Le pasamos el estilo guardado. Si no tiene estilo, le pasamos un objeto vacío {}
                        // Además, le forzamos 'objectFit: cover' para que el objectPosition funcione bien.
                        style={proyecto.estiloImagen ? { ...proyecto.estiloImagen, objectFit: 'cover' } : { objectFit: 'cover' }}/>
                    
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
                {/* Dibujamos automáticamente cada foto que esté en el arreglo "galeria" */}
                {proyecto.galeria.map((foto, index) => (
                    <div className="foto" key={index} onClick={() => abrirLightbox(index)}>
                        <img className="foto_img" src={foto} alt={`Foto ${index + 1}`} style={{cursor: 'pointer'}} />
                        <p>Descripción</p>
                    </div>
                ))}
            </div>

            {/* --- EL LIGHTBOX (Solo se dibuja si el usuario hizo clic en una foto) --- */}
            {fotoAmpliada && (
                <div id="lightbox" className="lightbox" style={{ display: 'block' }}>
                    <span className="close-lightbox" onClick={cerrarLightbox}>&times;</span>
                    
                    <button className="nav-btn prev" onClick={() => cambiarImagen(-1)}>&#10094;</button>
                    
                    <img className="lightbox-content" src={fotoAmpliada} alt="Vista ampliada" />
                    
                    <button className="nav-btn next" onClick={() => cambiarImagen(1)}>&#10095;</button>
                </div>
            )}
        </section>

        {/* Dibujamos tu componente de Contacto original al final de la página */}
        <Contacto />
        </>
    );
}

export default PaginaProyecto;