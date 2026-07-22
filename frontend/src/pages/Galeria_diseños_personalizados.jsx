import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import transformarImagen from '../components/TransformarImagen';
import './Galeria_diseños_personalizados.css'; // Conectado a tu nuevo CSS minimalista

function Galeria_diseños_personalizados() {
    // 1. Estados para los datos de MongoDB
    const [disenos, setDisenos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 2. Conectamos con el backend
    useEffect(() => {
        const obtenerDisenos = async () => {
            try {
                const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/api/disenos`);
                const datos = await respuesta.json();
                setDisenos(datos);
                setCargando(false);
            } catch (error) {
                console.error('Error al cargar diseños:', error);
                setCargando(false);
            }
        };

        obtenerDisenos();
    }, []);

    return (
        <>
            {/* BOOTSTRAP: container centra el contenido, marginTop compensa el Header fijo */}
            <main className="container" style={{ marginTop: '140px', marginBottom: '80px' }}>
                
                <h1 className="text-center fw-bold text-uppercase mb-5" style={{ color: '#0B2126', letterSpacing: '2px' }}>
                    Diseños Personalizados
                </h1>
                
                {/* 3. PANTALLA DE CARGA CON SPINNER PROFESIONAL */}
                {cargando ? (
                    <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
                        <div className="spinner-border mb-3" style={{ color: '#0B2126' }} role="status"></div>
                        <h3 className="h6 text-uppercase fw-bold m-0" style={{ color: '#0B2126', letterSpacing: '1px' }}>
                            Cargando catálogo conceptual...
                        </h3>
                    </div>
                ) : (
                    /* 4. RENDERIZADO DE GRILLA RESPONSIVA */
                    /* 1 columna en móvil, 2 en tablets (md) y 3 en PC (lg) de manera nativa */
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                        {disenos.map((diseno) => (
                            <div key={diseno._id} className="col d-flex justify-content-center">
                                
                                <Link to={`/pagina_diseno/${diseno._id}`} className="text-decoration-none w-100" style={{ maxWidth: '360px' }}>
                                    
                                    {/* CONTENEDOR DE LA TARJETA */}
                                    <div className="card h-100 border-0 shadow rounded overflow-hidden galeria-diseno-card">
                                        
                                        {/* TÍTULO FIJO ENCIMA DE LA IMAGEN (Mismo estilo elegante que proyectos) */}
                                        <div className="p-3 bg-white text-center">
                                            <h3 className="h6 text-uppercase fw-bold m-0" style={{ color: '#0B2126', letterSpacing: '1px', lineHeight: '1.4' }}>
                                                {diseno.titulo}
                                            </h3>
                                        </div>

                                        {/* IMAGEN DE ARQUITECTURA OPTIMIZADA */}
                                        <img 
                                            src={transformarImagen(diseno.imagen_url, 500)} 
                                            alt={diseno.titulo} 
                                            className="w-100 object-fit-cover"
                                            style={{ height: '280px' }} 
                                        />

                                    </div>
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Contacto />
        </>
    );
}

export default Galeria_diseños_personalizados;