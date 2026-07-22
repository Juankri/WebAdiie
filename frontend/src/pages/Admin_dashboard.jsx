import { useNavigate } from 'react-router-dom';
import { LayoutGrid, PencilRuler, LogOut, Image as ImageIcon } from 'lucide-react';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    // Traemos el estado de autenticación y la función de salida desde el Contexto
    const { estaLogueado, logout } = useContext(AuthContext);

    useEffect(() => {
        // Si el contexto global dice que NO está logueado, lo mandamos al login
        if (!estaLogueado) {
            navigate('/login');
        }
    }, [estaLogueado, navigate]);

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            {/* 🌟 ESTILOS MÍNIMOS INTEGRADOS PARA EL DASHBOARD 🌟 */}
            <style>{`
                .hover-scale { 
                    transition: transform 0.2s ease, box-shadow 0.2s ease; 
                    cursor: pointer; 
                }
                .hover-scale:hover { 
                    transform: translateY(-5px); 
                    box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important; 
                }
                .text-corporativo { color: #0B2126; }
                .btn-outline-danger-custom {
                    color: #dc3545; 
                    border: 2px solid #dc3545; 
                    border-radius: 30px;
                    padding: 10px 25px; 
                    font-weight: 600; 
                    transition: all 0.3s ease;
                    background-color: transparent;
                }
                .btn-outline-danger-custom:hover { 
                    background-color: #dc3545; 
                    color: white; 
                }
            `}</style>

            {/* CONTENEDOR PRINCIPAL: Usa flex-column y justify-content-between para empujar el botón abajo */}
            <div className="container d-flex flex-column justify-content-between" style={{ minHeight: '85vh', paddingTop: '140px', paddingBottom: '40px', maxWidth: '1000px' }}>
                
                <div>
                    {/* CABECERA LIMPIA */}
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold text-corporativo">Panel de Control</h2>
                        <p className="text-muted fs-5">EstudioAdiie Arquitectura y Construcción</p>
                    </div>

                    {/* GRILLA DE OPCIONES DEL DASHBOARD (Bootstrap nativo) */}
                    <div className="row g-4 justify-content-center">
                        
                        {/* TARJETA 1: PROYECTOS */}
                        <div className="col-12 col-md-4">
                            <div 
                                className="card shadow-sm border-0 rounded-4 p-4 text-center hover-scale h-100 bg-light" 
                                onClick={() => navigate('/admin_proyecto')}
                            >
                                <LayoutGrid size={50} color="#D4AF37" className="mx-auto mb-3" />
                                <h4 className="fw-bold text-corporativo mb-2">Proyectos</h4>
                                <p className="text-muted small mb-0">Sube o edita las obras finalizadas de la constructora.</p>
                            </div>
                        </div>

                        {/* TARJETA 2: DISEÑOS */}
                        <div className="col-12 col-md-4">
                            <div 
                                className="card shadow-sm border-0 rounded-4 p-4 text-center hover-scale h-100 bg-light" 
                                onClick={() => navigate('/admin_disenos')}
                            >
                                <PencilRuler size={50} color="#D4AF37" className="mx-auto mb-3" />
                                <h4 className="fw-bold text-corporativo mb-2">Diseños</h4>
                                <p className="text-muted small mb-0">Administra los bocetos y proyectos en desarrollo.</p>
                            </div>
                        </div>

                        {/* TARJETA 3: FONDOS DE PORTADA */}
                        <div className="col-12 col-md-4">
                            <div 
                                className="card shadow-sm border-0 rounded-4 p-4 text-center hover-scale h-100 bg-light" 
                                onClick={() => navigate('/admin_fondos')}
                            >
                                <ImageIcon size={50} color="#D4AF37" className="mx-auto mb-3" />
                                <h4 className="fw-bold text-corporativo mb-2">Portada</h4>
                                <p className="text-muted small mb-0">Sube o elimina las imágenes de fondo de la pantalla principal.</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 🌟 BOTÓN CERRAR SESIÓN EN LA PARTE INFERIOR 🌟 */}
                <div className="text-center mt-5 pt-4">
                    <button 
                        onClick={cerrarSesion} 
                        className="btn-outline-danger-custom d-inline-flex align-items-center gap-2 shadow-sm"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>

            </div>
        </>
    );
};

export default AdminDashboard;