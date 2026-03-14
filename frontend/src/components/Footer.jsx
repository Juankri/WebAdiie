import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';



function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                <div className="footer-column">
                    <a href="/">
                        <img 
                            className="logo_azul footer-logo" 
                            src="/img/logo/azzul.png" 
                            alt="Logo EstudioAdiie" 
                        />
                    </a>
                    <p className="footer-about">
                        Transformando espacios con diseño y funcionalidad. Arquitectura y remodelaciones a tu medida.
                    </p>
                </div>

                <div className="footer-column">
                    <h4>Navegación</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/portafolio">Portafolio</Link></li>
                        
                        {/* Usamos HashLink para las secciones de la página principal */}
                        <li><HashLink smooth to="/#Servicios">Servicios</HashLink></li>
                        
                        <li><Link to="/servicio-express">Servicio Express</Link></li>
                        <li><Link to="/proyectos-venta">Proyectos en venta</Link></li>
                        
                        {/* Usamos HashLink también para Contacto */}
                        <li><HashLink smooth to="/#Contacto">Contacto</HashLink></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4>Síguenos</h4>
                    <div className="footer_social">
                        <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com/estudioadiie/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                {/* Pequeño truco: usar Date().getFullYear() actualiza el año automáticamente 😉 */}
                <p>&copy; {new Date().getFullYear()} EstudioAdiie. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;