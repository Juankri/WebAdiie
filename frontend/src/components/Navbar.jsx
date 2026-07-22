import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { CarritoContext } from "../context/CarritoContext";
import '../styles/Navbar.css';
import { AuthContext } from '../context/AuthContext';
import {
    User,
    Settings,
    ShoppingCart,
    ChevronDown,
    Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const navRef = useRef(null);
    const navigate = useNavigate(); // Herramienta para navegar sin recargar

    const { carrito } = useContext(CarritoContext);

    // 🌟 2. ELIMINAMOS el localStorage y usamos el Contexto
    // Extraemos la variable reactiva y la función para salir
    const { estaLogueado, logout } = useContext(AuthContext);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    // 🌟 3. NUEVA FUNCIÓN: Para el botón de "Cerrar Sesión" en tu HTML
    const manejarCerrarSesion = () => {
        logout(); // Destruye el token y cambia el estado global al instante
        cerrarMenu(); // Cerramos el menú móvil (buena práctica UX)
        navigate('/login'); // Redirigimos suavemente
    };

    useEffect(() => {
        const manejarClickFuera = (evento) => {
            if (menuAbierto && navRef.current && !navRef.current.contains(evento.target)) {
                cerrarMenu();
            }
        }
        document.addEventListener('mousedown', manejarClickFuera);
        return () => document.removeEventListener('mousedown', manejarClickFuera);
    }, [menuAbierto]);

    

    return (
        // FONDO ACTUALIZADO: Quitamos bg-white y agregamos el backgroundColor #0B2126
        <nav className="shadow-sm position-fixed top-0 w-100 d-flex justify-content-between align-items-center z-3"
            style={{ backgroundColor: '#0B2126', height: '90px' }}
            ref={navRef}>

            {/* LADO IZQUIERDO: LOGO Y ADMIN */}
            <div className="d-flex align-items-center ms-3 ms-lg-4">
                <Link to="/">
                    <img src="/img/logo/azzul.png" alt="Logo ADIIE" style={{ height: '75px', objectFit: 'contain' }} />
                </Link>
                <div className="ms-3 ms-lg-4">
                    <Link to={estaLogueado ? "/admin_dashboard" : "/login"} className="icon-admin-custom text-decoration-none">
                        {estaLogueado ? <Settings size={24} /> : <User size={24} />}
                    </Link>
                </div>
            </div>

            {/* CONTROLES MÓVILES (Solo visibles en pantallas pequeñas < 992px) */}
            <div className="d-flex d-lg-none align-items-center me-3">
                {/* ICONO Y TEXTO A BLANCO */}
                <Link to="/carrito" className="text-decoration-none text-white position-relative me-3">
                    <ShoppingCart size={24} />
                    {/* BADGE A DORADO: Para que resalte sobre el fondo azul oscuro */}
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark" style={{ backgroundColor: '#D4AF37' }}>
                        {carrito.length}
                    </span>
                </Link>
                <button className="btn p-0 border-0 text-white" onClick={toggleMenu}>
                    <Menu size={32} />
                </button>
            </div>

            {/* LADO DERECHO: LINKS ESCRITORIO Y MENÚ BURBUJA MÓVIL */}
            <div className={`nav-links-container me-lg-5 ${menuAbierto ? 'active' : ''}`}>
                <ul className="d-flex flex-column flex-lg-row align-items-center list-unstyled m-0 gap-4">

                    <li><Link className="nav-link-custom" to="/" onClick={cerrarMenu}>Inicio</Link></li>
                    <li><Link className="nav-link-custom" to="/portafolio" onClick={cerrarMenu}>Portafolio</Link></li>
                    <li className="nav-item">
                        <HashLink smooth to="/#Servicios" className="nav-link-custom" onClick={cerrarMenu}>
                            Servicios
                        </HashLink>
                    </li>

                    {/* MENÚ DESPLEGABLE SERVICIO EXPRESS */}
                    <li className="dropdown-container position-relative">
                        <Link to="/infoservicioexpress" className="nav-link-custom d-flex align-items-center gap-1" onClick={cerrarMenu}>
                            Servicio Express <ChevronDown size={14} />
                        </Link>
                        <ul className="dropdown-menu-custom">
                            <li><Link to="/servicio-express" state={{ abrirModal: "Diseño de baño" }} onClick={cerrarMenu}>Baño</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Comedor" }} onClick={cerrarMenu}>Comedor</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Muebles" }} onClick={cerrarMenu}>Muebles</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Dormitorios" }} onClick={cerrarMenu}>Dormitorios</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Oficina" }} onClick={cerrarMenu}>Oficina</Link></li>
                            <li><Link to="/servicio-express" state={{ abrirModal: "Terraza/Quincho" }} onClick={cerrarMenu}>Terraza</Link></li>
                        </ul>
                    </li>

                    <li className="text-nowrap"><Link className="nav-link-custom" to="/en_construccion" onClick={cerrarMenu}>Proyectos en venta</Link></li>
                    <li><HashLink smooth to="/#Contacto" className="nav-link-custom" onClick={cerrarMenu}>
                        Contacto
                    </HashLink></li>

                    {/* CARRITO ESCRITORIO */}
                    <li className="d-none d-lg-block">
                        <Link to="/carrito" className="nav-link-custom d-flex align-items-center gap-1">
                            <ShoppingCart size={22} /> <span>({carrito.length})</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;