import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Footer() {
    return (
        <footer 
            className="pt-5 w-100" 
            style={{ backgroundColor: '#0B2126', color: '#EAF2F8' }}
        >
            {/* 🌟 ETIQUETA STYLE INTEGRADA: Para los efectos hover sin necesidad de CSS externo */}
            <style>
                {`
                    .footer-link {
                        color: #EAF2F8;
                        text-decoration: none;
                        transition: color 0.3s ease;
                    }
                    .footer-link:hover {
                        color: #D4AF37;
                    }
                    .social-icon {
                        color: #ffffff;
                        font-size: 28px;
                        transition: color 0.3s ease;
                    }
                    .social-icon:hover {
                        color: #616161;
                    }
                `}
            </style>

            <div className="container pb-4">
                {/* 🌟 CAMBIO 1: Dejamos solo "text-center" para centrar el texto globalmente */}
                <div className="row text-center gy-4 justify-content-center">
                    
                    {/* COLUMNA 1: LOGO Y ABOUT */}
                    {/* 🌟 CAMBIO 2: Dejamos solo "align-items-center" */}
                    <div className="col-12 col-md-4 d-flex flex-column align-items-center">
                        <a href="/">
                            <img 
                                src="/img/logo/azul.png" 
                                alt="Logo EstudioAdiie" 
                                className="img-fluid mb-3"
                                style={{ height: '75px', objectFit: 'contain' }}
                            />
                        </a>
                        <p className="small mt-2 mx-auto" style={{ maxWidth: '300px', lineHeight: '1.6' }}>
                            Transformando espacios con diseño y funcionalidad. Arquitectura y remodelaciones a tu medida.
                        </p>
                    </div>

                    {/* COLUMNA 2: NAVEGACIÓN */}
                    <div className="col-12 col-md-4">
                        <h5 className="text-white fw-bold mb-3">Navegación</h5>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><Link to="/" className="footer-link">Inicio</Link></li>
                            <li className="mb-2"><Link to="/portafolio" className="footer-link">Portafolio</Link></li>
                            <li className="mb-2"><HashLink smooth to="/#Servicios" className="footer-link">Servicios</HashLink></li>
                            <li className="mb-2"><Link to="/infoservicioexpress" className="footer-link">Servicio Express</Link></li>
                            <li className="mb-2"><Link to="/en_construccion" className="footer-link">Proyectos en venta</Link></li>
                            <li className="mb-2"><HashLink smooth to="/#Contacto" className="footer-link">Contacto</HashLink></li>
                        </ul>
                    </div>

                    {/* COLUMNA 3: REDES SOCIALES */}
                    <div className="col-12 col-md-4">
                        <h5 className="text-white fw-bold mb-3">Síguenos</h5>
                        {/* 🌟 CAMBIO 3: Dejamos solo "justify-content-center" para los íconos */}
                        <div className="d-flex justify-content-center gap-3 mt-2">
                            <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="https://www.instagram.com/estudioadiie/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM FOOTER */}
            <div 
                className="text-center py-3 border-top" 
                style={{ borderColor: 'rgba(58, 80, 107, 0.5) !important', fontSize: '13px' }}
            >
                <p className="mb-0 text-white-50">
                    &copy; {new Date().getFullYear()} EstudioAdiie. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;