import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import transformarImagen from '../components/TransformarImagen';
import './Galeria_proyectos.css'; 

function Galeria_proyectos() {
    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const respuesta = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
                const datos = await respuesta.json();
                
                setProyectos(datos);
                setCargando(false);
            } catch (error) {
                console.error('Error al cargar la base de datos:', error);
                setCargando(false);
            }
        };

        obtenerProyectos();
    }, []);

    return (
        <>
            <main className="container" style={{ marginTop: '140px', marginBottom: '80px' }}>
                
                <h1 className="text-center fw-bold text-uppercase mb-5" style={{ color: '#0B2126', letterSpacing: '2px' }}>
                    Proyectos
                </h1>
                
                {cargando ? (
                    <div className="d-flex flex-column align-items-center justify-content-center my-5 py-5">
                        <div className="spinner-border mb-3" style={{ color: '#0B2126' }} role="status"></div>
                        <h3 className="h6 text-uppercase fw-bold m-0" style={{ color: '#0B2126', letterSpacing: '1px' }}>
                            Cargando proyectos desde la base de datos...
                        </h3>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                        {proyectos.map((proyecto) => (
                            <div key={proyecto._id} className="col d-flex justify-content-center">
                                
                                <Link to={`/pagina_proyecto/${proyecto._id}`} className="text-decoration-none w-100" style={{ maxWidth: '360px' }}>
                                    
                                    {/* CONTENEDOR DE LA TARJETA */}
                                    <div className="card h-100 border-0 shadow rounded overflow-hidden galeria-proyecto-card">
                                        
                                        {/* 🌟 NUEVO: TÍTULO FIJO ENCIMA DE LA IMAGEN */}
                                        <div className="p-3 bg-white text-center">
                                            <h3 className="h6 text-uppercase fw-bold m-0" style={{ color: '#0B2126', letterSpacing: '1px', lineHeight: '1.4' }}>
                                                {proyecto.titulo}
                                            </h3>
                                        </div>

                                        {/* IMAGEN DE ARQUITECTURA */}
                                        <img 
                                            src={transformarImagen(proyecto.imagen_url, 500)} 
                                            alt={proyecto.titulo} 
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

export default Galeria_proyectos;