import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Galeria_diseños_personalizados.css';
// Importamos la base de datos central
import { baseDeDatosProyectos } from '../data/Proyectos'; 

function Galeria_diseños_personalizados() {

    // Filtramos la base de datos para obtener SOLO los que tienen tipo "diseno"
    const planos = baseDeDatosProyectos.filter(item => item.tipo === 'diseno');

    return (
        <>
            <main className="main_galeria_planos">
                <h1 className="titulo_galeria_planos">Diseños Personalizados</h1>
                
                <div className="galeria_planos">
                    {/* Iteramos sobre la lista filtrada de planos */}
                    {planos.map((plano) => (
                        
                        // Construimos la URL dinámica (ej: /proyecto/casa-pinos)
                        <Link key={plano.id} to={`/pagina_proyecto/${plano.id}`} className="link_galeria_planos">
                            <div className="container_galeria_planos">
                                <img 
                                    src={plano.imagenPrincipal} 
                                    alt={`Imagen de ${plano.titulo}`} 
                                    // Aplicamos tu estilo en línea si existe, si no, un objeto vacío
                                    style={plano.estiloImagen ? plano.estiloImagen : {}} 
                                />
                                <p className="descripcion">{plano.titulo}</p> 
                            </div>
                        </Link>
                        
                    ))}
                </div>
            </main>

            {/* Reutilizamos el formulario de contacto */}
            <Contacto />
        </>
    )
}

export default Galeria_diseños_personalizados;
//