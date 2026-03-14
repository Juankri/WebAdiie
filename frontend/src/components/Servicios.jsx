import React from 'react';

function Servicios() {
    // 1. LA BASE DE DATOS LOCAL: Aquí guardamos la información de tus servicios.
    // Es mucho más limpio y fácil de editar en el futuro.
    const listaServicios = [
        {
            enlace: "/servicio-express",
            icono: "/img/sol.png", // Recuerda que las imágenes ahora viven en 'public/img/'
            titulo: "Servicio Express",
            descripcion: ["Un servicio para quienes buscan la decoración de su espacio en poco tiempo. Pensado para que se animan a implementar el diseño por su cuenta y así lograr un importante ahorro."]
        },
        {
            enlace: "/galeria-disenos",
            icono: "/img/hogar.png",
            titulo: "Diseño arquitectónico",
            descripcion: [
                "Proyectos residenciales, comerciales o industriales.",
                "Planos 2D y modelado 3D.",
                "Visualizaciones realistas.",
                "Master Plan de tu Parcela"
            ]
        },
        {
            enlace: null, // Los que no tenían link en tu HTML, les ponemos null
            icono: "/img/seguridad-del-casco-del-usuario.png",
            titulo: "Construcción y ejecución de obras",
            descripcion: [
                "Supervisión y gestión de obra.",
                "Presupuestos y control de materiales.",
                "Mano de obra y dirección técnica."
            ]
        },
        {
            enlace: null,
            icono: "/img/buscar-alt.png",
            titulo: "Documentación técnica",
            descripcion: [
                "Tramitacion Municipal y Regularización.",
                "Permisos de edificación.",
                "Certificados y trámites legales.",
                "LEY 20.898 (LEY DEL MONO)"
            ]
        },
        {
            enlace: null,
            icono: "/img/apreton-de-manos.png",
            titulo: "Diseño de interiores",
            descripcion: ["Decoración, mobiliario, iluminación, distribución de espacios."]
        },
        {
            enlace: null,
            icono: "/img/chat-flecha-crecer.png",
            titulo: "Reformas y remodelaciones",
            descripcion: ["Ampliaciones, modernización de espacios y eficiencia energética."]
        }
    ];

    return (
        <section id="Servicios" className="seccion_servicios">
            <h2>Servicios</h2>

            {/* 2. LA MAGIA DE REACT: Iteramos sobre la lista con .map() */}
            {listaServicios.map((servicio, index) => {
                
                // Creamos el interior de la tarjeta (para no repetir código)
                const contenidoTarjeta = (
                    <>
                        <img src={servicio.icono} alt={`Icono de ${servicio.titulo}`} />
                        <h3>{servicio.titulo}</h3>
                        <ul>
                            {servicio.descripcion.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </>
                );

                // Si el servicio tiene un enlace, lo envolvemos en una etiqueta <a>
                if (servicio.enlace) {
                    return (
                        <a key={index} href={servicio.enlace} className="container_servicios">
                            {contenidoTarjeta}
                        </a>
                    );
                } 
                
                // Si NO tiene enlace, lo envolvemos en un <div> normal
                return (
                    <div key={index} className="container_servicios">
                        {contenidoTarjeta}
                    </div>
                );
            })}
        </section>
    );
}

export default Servicios;