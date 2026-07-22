import { useNavigate } from 'react-router-dom';
import { LayoutGrid, PencilRuler, LogOut, Image as ImageIcon } from 'lucide-react'; // Agregamos ImageIcon
import './Admin_proyecto.css';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    // 🌟 3. Traemos el estado de autenticación y la función de salida desde el Contexto
    const { estaLogueado, logout } = useContext(AuthContext);

    useEffect(() => {
        // 🌟 4. Si el contexto global dice que NO está logueado, lo mandamos al login de inmediato
        if (!estaLogueado) {
            navigate('/login');
        }
    }, [estaLogueado, navigate]);

    const cerrarSesion = () => {
        logout(); // 🌟 5. Usamos la función oficial (borra el token de localStorage y avisa al Navbar en tiempo real)
        navigate('/login'); // Redirigimos de forma fluida 🚀
    };
    

    return (
        <div className="admin-container" style={{ textAlign: 'center' }}>
            <div className="admin-header">
                <h2>Panel de Control EstudioAdiie</h2>
                <button onClick={cerrarSesion} className="btn-logout">
                    Cerrar Sesión <LogOut size={18} />
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '40px'
            }}>
                {/* TARJETA 1: PROYECTOS */}
                <div
                    onClick={() => navigate('/admin_proyecto')}
                    className="admin-form"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <LayoutGrid size={50} color="#D4AF37" style={{ margin: '0 auto 15px' }} />
                    <h3>Gestionar Proyectos</h3>
                    <p>Sube o edita las obras finalizadas de la constructora.</p>
                </div>

                {/* TARJETA 2: DISEÑOS */}
                <div
                    onClick={() => navigate('/admin_disenos')}
                    className="admin-form"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <PencilRuler size={50} color="#D4AF37" style={{ margin: '0 auto 15px' }} />
                    <h3>Gestionar Diseños</h3>
                    <p>Administra los bocetos y proyectos en desarrollo.</p>
                </div>

                {/* 🌟 TARJETA 3: FONDOS DE PORTADA (NUEVA) 🌟 */}
                <div
                    onClick={() => navigate('/admin_fondos')}
                    className="admin-form"
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <ImageIcon size={50} color="#D4AF37" style={{ margin: '0 auto 15px' }} />
                    <h3>Gestionar Portada</h3>
                    <p>Sube o elimina las imágenes de fondo de la pantalla principal.</p>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;