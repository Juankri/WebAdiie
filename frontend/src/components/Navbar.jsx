import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { CarritoContext } from "../context/CarritoContext";
import '../styles/Navbar.css';
import {
    User,
    Settings,
    ShoppingCart,

    ChevronDown
} from 'lucide-react';



function Navbar() {

    const [menuAbierto, setMenuAbierto] = useState(false);
    const navRef = useRef(null);
    const { carrito } = useContext(CarritoContext);
    const estaLogueado = !!localStorage.getItem('token_adiie');

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

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
        <nav className="nav" ref={navRef}>
            <div className="nav-logo">
                <Link to="/">
                    <img className="logo" src="/img/logo/LOGO_BLANCO.png" alt="Logo ADIIE" />
                </Link>

                <div className="icono-admin-escritorio">
                    <Link to={estaLogueado ? "/admin_dashboard" : "/login"} className="admin-icon-nav">
                        {estaLogueado ? <Settings size={24} /> : <User size={24} />}
                    </Link>

                </div>

            </div>

            <div className="nav-controles-movil">

                <Link to="/carrito" className="carrito-movil">
                    <ShoppingCart size={22} />
                    <span className="carrito-badge">{carrito.length}</span>
                </Link>

                <button className="menubtn" onClick={toggleMenu}>
                    <span>&#9776;</span>
                </button>
            </div>

            {/* LINKS DE ESCRITORIO */}

            <div className="nav-link-container">

                <ul className={`nav-links ${menuAbierto ? 'active' : ''}`}>



                    <li>
                        <Link to="/" onClick={cerrarMenu}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/portafolio" onClick={cerrarMenu}>Portafolio</Link>
                    </li>
                    <li>
                        <HashLink smooth to="/#Servicios" onClick={cerrarMenu}>Servicios</HashLink>
                    </li>

                    <li className="dropdown-container">
                        <Link to="/infoservicioexpress" onClick={cerrarMenu}>Servicio Express <ChevronDown size={14} /></Link>
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

                    {/*CARRITO ESCRITORIO */}


                    <li className="carrito-escritorio">
                        <Link to="/carrito" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <ShoppingCart size={26} /> <span>({carrito.length})</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;