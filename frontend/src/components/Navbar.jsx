import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { CarritoContext } from '../context/CarritoContext';

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navRef = useRef(null);
    const { carrito } = useContext(CarritoContext);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto); 
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    useEffect(() => {
        const manejarClickFuera = (evento) => {
            if (menuAbierto && navRef.current && !navRef.current.contains(evento.target)) {
                cerrarMenu(); 
            }
        };

        document.addEventListener("mousedown", manejarClickFuera);

        return () => {
            document.removeEventListener("mousedown", manejarClickFuera);
        };
    }, [menuAbierto]); 

    return (
        <nav className="nav" ref={navRef}>
            <div className="nav-logo">
                <a href="/">
                    <img className="logo" src="/img/logo/LOGO_BLANCO.png" alt="Logo ADIIE" />
                </a>
            </div>

            {/* CONTENEDOR MÓVIL: Carrito + Hamburguesa (Oculto en Escritorio) */}
            <div className="nav-controles-movil">
                <Link to="/carrito" className="carrito-movil" onClick={cerrarMenu}>
                    🛒 <span className="carrito-badge">{carrito.length}</span>
                </Link>

                <button className="menubtn" onClick={toggleMenu}>
                    <span>&#9776;</span>
                </button>
            </div>

            <div className="nav-link-container">
                <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>
                    
                    <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
                    <li><Link to="/portafolio" onClick={cerrarMenu}>Portafolio</Link></li>
                    <li><HashLink smooth to="/#Servicios" onClick={cerrarMenu}>Servicios</HashLink></li>
                    
                    <li className="dropdown-container">
                        <Link to="/servicio-express" onClick={cerrarMenu}>Servicio Express ▾</Link>
                        
                        <ul className="dropdown-menu">
                            <li><Link to="/servicio-express" state={{ abrirModal: "Diseño de baño" }} onClick={cerrarMenu}>Baño</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Comedor" }} onClick={cerrarMenu}>Comedor</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Muebles" }} onClick={cerrarMenu}>Muebles</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Dormitorios" }} onClick={cerrarMenu}>Dormitorios</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Oficina" }} onClick={cerrarMenu}>Oficina</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Terraza/Quincho" }} onClick={cerrarMenu}>Terraza</Link></li>
                        </ul>
                    </li>

                    <li style={{ whiteSpace: 'nowrap' }}><Link to="/en_construccion" onClick={cerrarMenu}>Proyectos en venta</Link></li>
                    <li><HashLink smooth to="/#Contacto" onClick={cerrarMenu}>Contacto</HashLink></li>
                    
                    {/* CARRITO DE ESCRITORIO (Oculto en Móvil) */}
                    <li className="carrito-desktop" style={{ whiteSpace: 'nowrap' }}>
                        <Link 
                            to="/carrito" 
                            onClick={cerrarMenu} 
                            style={{ 
                                color: '#0B2126', 
                                fontSize: '15px',
                                display: 'flex', 
                                alignItems: 'center',
                                gap: '5px',
                                textDecoration: 'none'
                            }}
                        >
                            🛒 <span>({carrito.length})</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;