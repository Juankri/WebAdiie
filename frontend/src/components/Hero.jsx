import { useState, useEffect } from 'react';
import './Hero.css'; // Solo dejaremos la tipografía aquí

function Hero() {
    // 1. ESTADO: Iniciamos con una imagen por defecto para que no se vea vacío
    const [fondos, setFondos] = useState([
        { url: '/img/Fondos/fondo1.webp', posicion: 'center' }
    ]);
    const [indice, setIndice] = useState(0);

    // 2. OBTENER FONDOS DESDE LA BASE DE DATOS
    useEffect(() => {
        const cargarFondos = async () => {
            try {
                // Preparado para conectarse a tu backend (crearemos esta ruta luego)
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/fondos_hero`);
                if (res.ok) {
                    const data = await res.json();
                    // Si el cliente subió fotos, las usamos. Si no, dejamos la de por defecto.
                    if (data.length > 0) {
                        setFondos(data);
                    }
                }
            } catch (error) {
                console.error("Error cargando los fondos del Hero:", error);
            }
        };

        cargarFondos();
    }, []);

    // 3. EFECTO SLIDER (Cross-fade)
    useEffect(() => {
        // Si hay una sola foto, no tiene sentido hacer el intervalo
        if (fondos.length <= 1) return;

        const intervalo = setInterval(() => {
            setIndice((prevIndice) => (prevIndice + 1) % fondos.length);
        }, 5000);
        return () => clearInterval(intervalo);
    }, [fondos.length]);

    return (
        // BOOTSTRAP: calc(100vh - 90px) descuenta exactamente la altura de tu Navbar
        // d-flex flex-column centra todo perfectamente sin romper el diseño
        <main className="position-relative w-100 d-flex flex-column justify-content-center align-items-center overflow-hidden"
            style={{ minHeight: '100vh', paddingTop: '100px', backgroundColor: '#1a1a1a' }}>

            {/* CAPAS DE FONDOS */}
            {fondos.map((fondo, i) => (
                <div
                    key={i}
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${fondo.url || fondo.imagen_url}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: fondo.posicion || 'center',
                        opacity: i === indice ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                        zIndex: i === indice ? 1 : 0
                    }}
                ></div>
            ))}

            {/* CONTENIDO FRONTAL */}
            {/* BOOTSTRAP: z-3 lo pone por encima de las fotos, container y px-3 evitan que toque los bordes en celular */}
            <div className="container position-relative z-3 d-flex flex-column align-items-center text-center px-3">
                <h1 className="hero-titulo text-white mb-3">EstudioAdiie</h1>

                <p className="hero-texto text-white mb-5">
                    ARQUITECTURA Y CONSTRUCCIÓN <br />
                    NOSOTROS PROFESIONALIZAMOS TUS IDEAS
                </p>

                <a className="hero-btn shadow" href="#Contacto">
                    Cotiza ya!
                </a>
            </div>
        </main>
    );
}

export default Hero;