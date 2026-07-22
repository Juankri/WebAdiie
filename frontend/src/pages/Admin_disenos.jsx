import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, PlusSquare, 
    Edit, Trash2, Upload, CheckCircle, 
    Image as ImageIcon, Save
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext'; // 🌟 Integrado con tu nuevo contexto de seguridad
import Swal from 'sweetalert2';

const AdminDisenos = () => {
    const navigate = useNavigate();
    const [disenos, setDisenos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [diseno, setDiseno] = useState({
        titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: ''
    });

    const { estaLogueado, logout } = useContext(AuthContext);

    // --- PROTECCIÓN Y CARGA INICIAL ---
    useEffect(() => {
        if (!estaLogueado) {
            navigate('/login');
        } else {
            obtenerDisenos();
        }
    }, [estaLogueado, navigate]);

    const obtenerDisenos = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/disenos`);
            const datos = await res.json();
            setDisenos(datos);
        } catch (error) { console.error("Error:", error); }
    };

    const manejarCambio = (e) => {
        setDiseno({ ...diseno, [e.target.name]: e.target.value });
    };

    // --- CONFIGURACIÓN DE CLOUDINARY ---
    const abrirWidgetSubida = (esPortada) => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: 'd22tuzo6',
                uploadPreset: 'adiie_disenos',
                sources: ['local', 'url'],
                styles: { palette: { window: '#0B2126', sourceTabIcon: '#D4AF37' } }
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.secure_url;
                    if (esPortada) {
                        setDiseno(prev => ({ ...prev, imagen_url: url }));
                    } else {
                        setDiseno(prev => ({ ...prev, galeria: [...prev.galeria, url] }));
                    }
                }
            }
        ).open();
    };

    const eliminarFotoGaleria = (index) => {
        const nuevaGaleria = diseno.galeria.filter((_, i) => i !== index);
        setDiseno({ ...diseno, galeria: nuevaGaleria });
    };

    // --- GUARDAR (POST o PUT) ---
    const enviarDiseno = async (e) => {
        e.preventDefault();
        const url = editandoId 
            ? `${import.meta.env.VITE_API_URL}/api/disenos/${editandoId}` 
            : `${import.meta.env.VITE_API_URL}/api/disenos`;
        const metodo = editandoId ? 'PUT' : 'POST';
        const token = localStorage.getItem('token_adiie');

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(diseno)
            });

            if (respuesta.ok) {
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: '¡Diseño guardado correctamente!', showConfirmButton: false, timer: 2500
                });
                cancelarEdicion();
                obtenerDisenos();
            } else {
                Swal.fire('Error', 'Sesión expirada o permisos insuficientes', 'error');
                logout();
                navigate('/login');
            }
        } catch (error) { Swal.fire('Error', 'Error de conexión con el servidor', 'error'); }
    };

    const borrarDiseno = async (id, titulo) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar el diseño "${titulo}". Esta acción no se puede deshacer.`,
            icon: 'warning',
            iconColor: '#dc3545',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            Swal.showLoading();
            const token = localStorage.getItem('token_adiie');
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/disenos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    obtenerDisenos();
                    Swal.fire({
                        toast: true, position: 'top-end', icon: 'success',
                        title: 'Diseño eliminado con éxito', showConfirmButton: false, timer: 2500
                    });
                } else {
                    throw new Error('Respuesta fallida del servidor');
                }
            } catch (error) {
                Swal.fire('Error al borrar', 'No se pudo eliminar el diseño.', 'error');
            }
        }
    };

    const prepararEdicion = (d) => {
        setEditandoId(d._id);
        setDiseno({ ...d, galeria: d.galeria || [] });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setDiseno({ titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '' });
    };

    return (
        <>
            {/* 🌟 ESTILOS MÍNIMOS INTEGRADOS 🌟 */}
            <style>{`
                .mini-img-container { position: relative; display: inline-block; }
                .btn-delete-mini { 
                    position: absolute; top: -8px; right: -8px; 
                    background: #dc3545; color: white; border: none; 
                    border-radius: 50%; width: 22px; height: 22px; 
                    font-size: 12px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; padding: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .btn-delete-mini:hover { background: #b02a37; }
                .bg-corporativo { background-color: #0B2126; color: white; }
                .bg-corporativo:hover { background-color: #153e47; color: white; }
                .text-corporativo { color: #0B2126; }
                .hover-scale { transition: transform 0.2s ease; }
                .hover-scale:hover { transform: translateY(-2px); }
            `}</style>

            <div className="container" style={{ paddingTop: '140px', paddingBottom: '80px', maxWidth: '850px' }}>
                
                {/* 🌟 TÍTULO PRINCIPAL ARRIBA 🌟 */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-corporativo display-6">Panel de Diseños</h2>
                    <p className="text-muted">Administra los bocetos y diseños personalizados</p>
                </div>

                {/* 🌟 BOTONES DE NAVEGACIÓN 🌟 */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <button onClick={() => navigate('/admin_dashboard')} className="btn btn-light border shadow-sm d-flex align-items-center gap-2 hover-scale">
                        <ArrowLeft size={18} /> Volver al Tablero
                    </button>
                    <button onClick={() => navigate('/admin_proyecto')} className="btn bg-corporativo shadow-sm d-flex align-items-center gap-2 hover-scale">
                        Ir a Proyectos <ArrowRight size={18} />
                    </button>
                </div>
                
                {/* 🌟 FORMULARIO 🌟 */}
                <div className="card shadow-sm border-0 rounded-4 mb-5">
                    <div className="card-body p-4 p-md-5">
                        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 text-corporativo">
                            {editandoId ? <Edit size={24} className="text-warning" /> : <PlusSquare size={24} className="text-success" />} 
                            {editandoId ? 'Editar Diseño Existente' : 'Crear Nuevo Diseño'}
                        </h4>
                        
                        <form onSubmit={enviarDiseno}>
                            <div className="mb-3">
                                <input 
                                    className="form-control form-control-lg bg-light border-0" 
                                    type="text" name="titulo" placeholder="Título del Diseño" 
                                    value={diseno.titulo} onChange={manejarCambio} required 
                                />
                            </div>

                            <div className="mb-4">
                                <textarea 
                                    className="form-control bg-light border-0" 
                                    name="descripcion" placeholder="Descripción detallada..." 
                                    rows="4" value={diseno.descripcion} onChange={manejarCambio} required 
                                />
                            </div>
                            
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="fw-bold small text-muted mb-2">Imagen de Portada</label>
                                    <button type="button" onClick={() => abrirWidgetSubida(true)} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
                                        {diseno.imagen_url ? <CheckCircle size={18} className="text-success" /> : <Upload size={18} />}
                                        {diseno.imagen_url ? "Cambiar Portada" : "Subir Portada"}
                                    </button>
                                    {diseno.imagen_url && (
                                        <div className="text-center">
                                            <img src={diseno.imagen_url} alt="Portada" className="img-thumbnail rounded-3 shadow-sm" style={{ height: '120px', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="fw-bold small text-muted mb-2">Galería de Fotos</label>
                                    <button type="button" onClick={() => abrirWidgetSubida(false)} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
                                        <ImageIcon size={18} /> Añadir a Galería
                                    </button>
                                    <div className="d-flex flex-wrap gap-3">
                                        {diseno.galeria.map((url, i) => (
                                            <div key={i} className="mini-img-container">
                                                <img src={url} className="img-thumbnail rounded-3" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                                                <button type="button" onClick={() => eliminarFotoGaleria(i)} className="btn-delete-mini">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <input 
                                    className="form-control bg-light border-0" 
                                    type="text" name="video_url" placeholder="URL de Video (YouTube/Vimeo) - Opcional" 
                                    value={diseno.video_url} onChange={manejarCambio} 
                                />
                            </div>
                            
                            <div className="d-flex gap-3 mt-4">
                                <button type="submit" className="btn bg-corporativo flex-grow-1 py-2 fw-bold d-flex justify-content-center align-items-center gap-2 hover-scale">
                                    <Save size={20} /> {editandoId ? 'Guardar Cambios' : 'Publicar Diseño'}
                                </button>
                                {editandoId && (
                                    <button type="button" onClick={cancelarEdicion} className="btn btn-secondary py-2 px-4 fw-bold hover-scale">
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* 🌟 LISTA DE DISEÑOS 🌟 */}
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h4 className="fw-bold mb-4 text-corporativo">
                            Diseños Publicados <span className="badge bg-secondary rounded-pill ms-2">{disenos.length}</span>
                        </h4>
                        
                        <div className="list-group list-group-flush">
                            {disenos.map(d => (
                                <div key={d._id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom">
                                    <div className="d-flex align-items-center gap-3">
                                        {d.imagen_url && (
                                            <img src={d.imagen_url} alt={d.titulo} className="rounded-2 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                                        )}
                                        <div>
                                            <h6 className="mb-0 fw-bold text-dark">{d.titulo}</h6>
                                            <small className="text-muted">{d.galeria?.length || 0} fotos adicionales</small>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => prepararEdicion(d)} className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1">
                                            <Edit size={16} /> <span className="d-none d-sm-inline">Editar</span>
                                        </button>
                                        <button onClick={() => borrarDiseno(d._id, d.titulo)} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                                            <Trash2 size={16} /> <span className="d-none d-sm-inline">Borrar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {disenos.length === 0 && (
                                <p className="text-center text-muted my-4">No hay diseños subidos aún.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDisenos;