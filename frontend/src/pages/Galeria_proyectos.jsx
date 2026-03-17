import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Galeria_proyectos.css';
import transformarImagen from '../components/TransformarImagen';


function Galeria_proyectos() {

    // 1. PREPARAMOS LA MEMORIA: Ya no importamos el archivo local, creamos un estado vacío
    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 2. CONECTAMOS A LA NUBE: Vamos a buscar los proyectos a tu backend de Render
    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const respuesta = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
                const datos = await respuesta.json();
                
                // Guardamos los datos reales de MongoDB
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
            <main className="main_galeria_proyectos">
                <h1 className="titulo_galeria_proyectos">Proyectos</h1>
                
                {/* 3. PANTALLA DE CARGA: Mientras los datos viajan por internet */}
                {cargando ? (
                    <h3 style={{ textAlign: 'center', margin: '50px 0', color: '#0B2126' }}>
                        Cargando proyectos desde la base de datos... ⏳
                    </h3>
                ) : (
                    <div className="galeria_proyectos">
                        
                        {/* 4. RENDERIZAMOS LA NUBE: Usamos los datos de Mongo */}
                        {proyectos.map((proyecto) => (
                            // OJO: MongoDB usa '_id' en vez de 'id'
                            <Link key={proyecto._id} to={`/pagina_proyecto/${proyecto._id}`} className="link_galeria_proyecto">
                                <div className="container_galeria_proyectos">
                                    {/* OJO: Usamos 'imagen_url' porque así lo llamamos en tu formulario de admin */}
                                    <img src={transformarImagen(proyecto.imagen_url, 400)} alt={proyecto.titulo} />
                                    <p className="descripcion">{proyecto.titulo}</p> 
                                </div>
                            </Link>
                        ))}

                    </div>
                )}
            </main>

            <Contacto />
        </>
    )
}

export default Galeria_proyectos;