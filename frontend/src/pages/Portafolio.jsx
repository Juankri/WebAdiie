import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import './Portafolio.css'; // ¡Aquí conectamos tu CSS específico para esta página!

function Portafolio() {
    return (
        <>
            <main className="main_galeria_portafolio">
                <h1 className="titulo_galeria_portafolio">Portafolio</h1>
                <p className="subtitulo_galeria_portafolio">Una muestra de nuestro trabajo en diseño y construcción.</p>
                
                <div className="galeria_portafolio">
                    
                    

                    {/* Tarjeta 2: Diseños Personalizados */}
                    <Link to="/galeria_diseños_personalizados" className="link_galeria_portafolio">
                        <h2>Diseños Personalizados</h2>
                        <div className="container_galeria_portafolio">
                            <img src="/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp" alt="Diseños Personalizados" />
                            <p className="descripcion">Descripción</p> 
                        </div>
                    </Link>

                    {/* Tarjeta 3: Proyectos */}
                    <Link to="/galeria_proyectos" className="link_galeria_portafolio3">
                        <h2>Proyectos</h2>
                        <div className="container_galeria_portafolio">
                            <img src="/img/Proyecto02/LOCALES_COMERCIALES/locales08.webp" alt="Proyectos" />
                            <p className="descripcion">Descripción</p> 
                        </div>
                    </Link>

                </div>
            </main>

            {/* Reutilizamos el formulario de contacto que ya programamos 😎 */}
            <Contacto />
        </>
    );
}

export default Portafolio;