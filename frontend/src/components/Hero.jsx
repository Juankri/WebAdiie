import { useState, useEffect } from 'react';

function Hero() {
    // Lista de fondos (Asegúrate de que estas fotos existan en tu carpeta public/img/)
    const fondos = [
        { url: '/img/Fondos/fondo1.webp', posicion: '50% 30%'},
        { url: '/img/Fondos/fondo2.webp', posicion: '50% 30%' },
        { url: '/img/Fondos/fondo3.webp', posicion: 'center'},
        // Si no tienes estas fotos aún, puedes dejar solo una por ahora
    ];

    const [indice, setIndice] = useState(0);

    // Efecto para rotar el fondo cada 5 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndice((prevIndice) => (prevIndice + 1) % fondos.length);
        }, 5000);
        return () => clearInterval(intervalo); // Limpieza profesional al desmontar
    }, [fondos.length]);

    return (
        <main className="home-main" style={{ position: 'relative', backgroundColor: '#1a1a1a' }}>
            
            {/* Las dos capas para el Cross-fade (Transición suave) */}
            {fondos.map((fondo, i) => (
                <div 
                    key={i}
                    className={`slider_fondo ${i === indice ? 'slider_fondo_activo' : ''}`}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, width: '100%', height: '100%',
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${fondo.url}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: fondo.posicion,
                        opacity: i === indice ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        zIndex: i === indice ? 1 : 0
                    }}
                ></div>
            ))}

            {/* Contenido Frontal */}
            <div className="main-container" style={{ position: 'relative', zIndex: 10 }}>
                <h1 className="main-container_titulo">EstudioAdiie</h1>
                <p className="main-container_text">
                    ARQUITECTURA Y CONSTRUCCION <br />
                    NOSOTROS PROFESIONALIZAMOS TUS IDEAS
                </p>
                <a className="main-container_link" href="#Contacto">
                    Cotiza ya!
                </a>
            </div>
        </main>
    );
}

export default Hero;