import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Galeria_proyectos.css';
// 1. IMPORTAMOS TU BASE DE DATOS CENTRAL
import { baseDeDatosProyectos } from '../data/Proyectos'; 

function Galeria_proyectos() {

    // 2. FILTRAMOS PARA MOSTRAR SOLO LOS PROYECTOS
    // (Asumo que en tu archivo Proyectos.js les pusiste tipo: "proyecto")
    const proyectosParaMostrar = baseDeDatosProyectos.filter(item => item.tipo === 'proyecto');

    return (
        <>
            <main className="main_galeria_proyectos">
                <h1 className="titulo_galeria_proyectos">Proyectos</h1>
                
                <div className="galeria_proyectos">
                    
                    {/* Renderizamos usando los datos importados */}
                    {proyectosParaMostrar.map((proyecto) => (
                        // 3. LA MAGIA ESTÁ AQUÍ: Construimos la URL dinámicamente usando el ID
                        <Link key={proyecto.id} to={`/pagina_proyecto/${proyecto.id}`} className="link_galeria_proyecto">
                            <div className="container_galeria_proyectos">
                                <img src={proyecto.imagenPrincipal} alt={`Imagen de ${proyecto.titulo}`} />
                                <p className="descripcion">{proyecto.titulo}</p> 
                            </div>
                        </Link>
                    ))}

                </div>
            </main>

            <Contacto />
        </>
    )
}

export default Galeria_proyectos;
