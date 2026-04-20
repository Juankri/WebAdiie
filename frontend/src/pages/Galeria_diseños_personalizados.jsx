import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contacto from '../components/Contacto';
import transformarImagen from '../components/TransformarImagen';
import './Galeria_diseños_personalizados.css';

function Galeria_diseños_personalizados() {
    // 1. Estados para los datos de MongoDB
    const [disenos, setDisenos] = useState([]);
    const [cargando, setCargando] = useState(true);

    // 2. Conectamos con el backend (tu nueva ruta de diseños)
    useEffect(() => {
        const obtenerDisenos = async () => {
            try {
                const respuesta = await fetch('https://webadiie-backend.onrender.com/api/disenos');
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
            <main className="main_galeria_planos">
                <h1 className="titulo_galeria_planos">Diseños Personalizados</h1>
                
                {cargando ? (
                    <h3 style={{ textAlign: 'center', marginTop: '50px', color: '#0B2126' }}>
                        Cargando catálogo conceptual... 
                    </h3>
                ) : (
                    <div className="galeria_planos">
                        {disenos.map((diseno) => (
                            /* Usamos _id de Mongo y la ruta dinámica */
                            <Link key={diseno._id} to={`/pagina_proyecto/${diseno._id}`} className="link_galeria_planos">
                                <div className="container_galeria_planos">
                                    {/* Imagen optimizada con Cloudinary */}
                                    <img 
                                        src={transformarImagen(diseno.imagen_url, 500)} 
                                        alt={diseno.titulo} 
                                    />
                                    {/* Tu clase 'descripcion' que aparece al hacer hover */}
                                    <p className="descripcion">{diseno.titulo}</p> 
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>

            <Contacto />
        </>
    );
}

export default Galeria_diseños_personalizados;
//