import { Link } from 'react-router-dom';

function En_Construccion() {
    const estilos = {
        contenedor: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // Usamos minHeight en vez de 100vh para que conviva bien con el Navbar y Footer
            minHeight: '65vh', 
            backgroundColor: '#ffffff', // Fondo blanco
            textAlign: 'center',
            padding: '20px',
            fontFamily: "'Roboto', sans-serif"
        },
        logo: {
            marginTop: '150px', // Menos espacio hacia arriba
            maxWidth: '140px', // Logo mucho más pequeño (antes 250px)
            marginBottom: '15px' // Menos espacio hacia abajo
        },
        titulo: {
            fontSize: '1.8rem', // Título más pequeño
            marginBottom: '10px',
            color: '#1a1a1a', // Gris casi negro para contrastar el fondo blanco
            fontFamily: "'Montserrat', sans-serif"
        },
        texto: {
            fontSize: '1rem', // Texto más pequeño
            marginBottom: '25px',
            color: '#666666' // Gris medio para lectura cómoda
        },
        boton: {
            padding: '10px 20px', // Botón más compacto
            backgroundColor: '#0B2126', // Botón oscuro
            color: '#ffffff', // Letras blancas en el botón
            textDecoration: 'none',
            fontWeight: 'bold',
            borderRadius: '5px',
            fontSize: '0.9rem'
        }
    };

    return (
        <div style={estilos.contenedor}>
            <div>
                {/* OJO AQUÍ: Cambié la ruta a 'azzul.png' para que se vea sobre el fondo blanco */}
                <img style={estilos.logo} src="/img/logo/LOGO_BLANCO.png" alt="Logo Estudio ADIIE" />
            </div>
            
            <h1 style={estilos.titulo}>Sitio en Construcción</h1>
            <p style={estilos.texto}>Estamos trabajando para traerte algo increíble. ¡Vuelve pronto!</p>
            
            <Link to="/" style={estilos.boton}>
                Volver al Inicio
            </Link>
        </div>
    );
}


export default En_Construccion;