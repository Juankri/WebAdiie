import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, ArrowRight, LogOut, PlusSquare, 
    Edit, Trash2, Upload, CheckCircle, 
    Image as ImageIcon, Save, Star 
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AdminProyectos = () => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    
    const [proyecto, setProyecto] = useState({
        titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '', destacado: false
    });

    const { estaLogueado, logout } = useContext(AuthContext);

    useEffect(() => {
        if (!estaLogueado) {
            navigate('/login');
        } else {
            obtenerProyectos();
        }
    }, [estaLogueado, navigate]);

    const obtenerProyectos = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/proyectos`);
            const datos = await res.json();
            setProyectos(datos);
        } catch (error) { console.error("Error:", error); }
    };

    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setProyecto({ 
            ...proyecto, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const abrirWidgetSubida = (esPortada) => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: 'd22tuzo6', // Asegúrate de que este es tu cloudName real
                uploadPreset: 'adiie_proyectos',
                sources: ['local', 'url'],
                styles: { palette: { window: '#0B2126', sourceTabIcon: '#D4AF37' } }
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    const url = result.info.secure_url;
                    if (esPortada) {
                        setProyecto(prev => ({ ...prev, imagen_url: url }));
                    } else {
                        setProyecto(prev => ({ ...prev, galeria: [...prev.galeria, url] }));
                    }
                }
            }
        ).open();
    };

    const eliminarFotoGaleria = (index) => {
        const nuevaGaleria = proyecto.galeria.filter((_, i) => i !== index);
        setProyecto({ ...proyecto, galeria: nuevaGaleria });
    };

    const enviarProyecto = async (e) => {
        e.preventDefault();
        const url = editandoId ? `${import.meta.env.VITE_API_URL}/api/proyectos/${editandoId}` : `${import.meta.env.VITE_API_URL}/api/proyectos`;
        const metodo = editandoId ? 'PUT' : 'POST';
        const token = localStorage.getItem('token_adiie');

        try {
            const respuesta = await fetch(url, {
                method: metodo,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(proyecto)
            });
            if (respuesta.ok) {
                Swal.fire({
                    toast: true, position: 'top-end', icon: 'success',
                    title: '¡Guardado con éxito!', showConfirmButton: false, timer: 2000
                });
                cancelarEdicion();
                obtenerProyectos();
            } else {
                Swal.fire('Error', 'Sesión expirada o error de permisos', 'error');
                logout();
                navigate('/login');
            }
        } catch (error) { Swal.fire('Error', 'Error de conexión', 'error'); }
    };

    const borrarProyecto = async (id, titulo) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar "${titulo}".`,
            icon: 'warning',
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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/proyectos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    obtenerProyectos();
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Eliminado', showConfirmButton: false, timer: 2000 });
                }
            } catch (error) {
                Swal.fire('Error', 'Problema de conexión', 'error');
            }
        }
    };

    const prepararEdicion = (p) => {
        setEditandoId(p._id);
        setProyecto({ ...p, galeria: p.galeria || [], destacado: p.destacado || false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setProyecto({ titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '', destacado: false });
    };

    return (
        <>
            {/* 🌟 ESTILOS MÍNIMOS PARA REEMPLAZAR TU CSS 🌟 */}
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
                
                {/* 🌟 1. TÍTULO PRINCIPAL ARRIBA 🌟 */}
                <div className="text-center mb-4">
                    <h2 className="fw-bold text-corporativo display-6">Panel de Proyectos</h2>
                    <p className="text-muted">Administra el portafolio de EstudioAdiie</p>
                </div>

                {/* 🌟 2. BOTONES DE NAVEGACIÓN ABAJO DEL TÍTULO 🌟 */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <button onClick={() => navigate('/admin_dashboard')} className="btn btn-light border shadow-sm d-flex align-items-center gap-2 hover-scale">
                        <ArrowLeft size={18} /> Volver al Tablero
                    </button>
                    <button onClick={() => navigate('/admin_disenos')} className="btn bg-corporativo shadow-sm d-flex align-items-center gap-2 hover-scale">
                        Ir a Diseños <ArrowRight size={18} />
                    </button>
                </div>
                
                {/* 🌟 FORMULARIO LIMPIO 🌟 */}
                <div className="card shadow-sm border-0 rounded-4 mb-5">
                    <div className="card-body p-4 p-md-5">
                        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 text-corporativo">
                            {editandoId ? <Edit size={24} className="text-warning" /> : <PlusSquare size={24} className="text-success" />} 
                            {editandoId ? 'Editar Proyecto Existente' : 'Crear Nuevo Proyecto'}
                        </h4>
                        
                        <form onSubmit={enviarProyecto}>
                            <div className="mb-3">
                                <input 
                                    className="form-control form-control-lg bg-light border-0" 
                                    type="text" name="titulo" placeholder="Título del Proyecto" 
                                    value={proyecto.titulo} onChange={manejarCambio} required 
                                />
                            </div>

                            <div className="mb-4">
                                <textarea 
                                    className="form-control bg-light border-0" 
                                    name="descripcion" placeholder="Descripción detallada de la obra..." 
                                    rows="4" value={proyecto.descripcion} onChange={manejarCambio} required 
                                />
                            </div>
                            
                            {/* SECCIÓN DE SUBIDA DE IMÁGENES */}
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="fw-bold small text-muted mb-2">Imagen de Portada (Principal)</label>
                                    <button type="button" onClick={() => abrirWidgetSubida(true)} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
                                        {proyecto.imagen_url ? <CheckCircle size={18} className="text-success" /> : <Upload size={18} />}
                                        {proyecto.imagen_url ? "Cambiar Portada" : "Subir Portada"}
                                    </button>
                                    {proyecto.imagen_url && (
                                        <div className="text-center">
                                            <img src={proyecto.imagen_url} alt="Portada" className="img-thumbnail rounded-3 shadow-sm" style={{ height: '120px', objectFit: 'cover' }} />
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="fw-bold small text-muted mb-2">Galería de Fotos (Opcional)</label>
                                    <button type="button" onClick={() => abrirWidgetSubida(false)} className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2 mb-3">
                                        <ImageIcon size={18} /> Añadir a Galería
                                    </button>
                                    <div className="d-flex flex-wrap gap-3">
                                        {proyecto.galeria.map((url, i) => (
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
                                    value={proyecto.video_url} onChange={manejarCambio} 
                                />
                            </div>

                            {/* CHECKBOX DESTACADO (Diseño moderno Switch) */}
                            <div className="p-3 bg-light rounded-3 mb-4 d-flex align-items-center justify-content-between border-0">
                                <div className="d-flex align-items-center gap-2">
                                    <Star size={22} color="#D4AF37" fill={proyecto.destacado ? "#D4AF37" : "none"} />
                                    <div>
                                        <h6 className="mb-0 fw-bold text-corporativo">Proyecto Destacado</h6>
                                        <small className="text-muted">Mostrar en la pantalla principal de Inicio</small>
                                    </div>
                                </div>
                                <div className="form-check form-switch fs-4 mb-0">
                                    <input 
                                        className="form-check-input" type="checkbox" role="switch" 
                                        name="destacado" checked={proyecto.destacado} onChange={manejarCambio} style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </div>
                            
                            {/* BOTONES DE ACCIÓN */}
                            <div className="d-flex gap-3">
                                <button type="submit" className="btn bg-corporativo flex-grow-1 py-2 fw-bold d-flex justify-content-center align-items-center gap-2 hover-scale">
                                    <Save size={20} /> {editandoId ? 'Guardar Cambios' : 'Publicar Proyecto'}
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

                {/* 🌟 LISTA DE PROYECTOS 🌟 */}
                <div className="card shadow-sm border-0 rounded-4">
                    <div className="card-body p-4 p-md-5">
                        <h4 className="fw-bold mb-4 text-corporativo">
                            Proyectos Publicados <span className="badge bg-secondary rounded-pill ms-2">{proyectos.length}</span>
                        </h4>
                        
                        <div className="list-group list-group-flush">
                            {proyectos.map(p => (
                                <div key={p._id} className="list-group-item d-flex justify-content-between align-items-center py-3 px-0 border-bottom">
                                    <div className="d-flex align-items-center gap-3">
                                        {p.imagen_url && (
                                            <img src={p.imagen_url} alt={p.titulo} className="rounded-2 object-fit-cover" style={{ width: '50px', height: '50px' }} />
                                        )}
                                        <div>
                                            <h6 className="mb-0 fw-bold d-flex align-items-center gap-2">
                                                {p.titulo} 
                                                {p.destacado && <Star size={14} color="#D4AF37" fill="#D4AF37" title="Destacado" />}
                                            </h6>
                                            <small className="text-muted">{p.galeria?.length || 0} fotos adicionales</small>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => prepararEdicion(p)} className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1">
                                            <Edit size={16} /> <span className="d-none d-sm-inline">Editar</span>
                                        </button>
                                        <button onClick={() => borrarProyecto(p._id, p.titulo)} className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                                            <Trash2 size={16} /> <span className="d-none d-sm-inline">Borrar</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {proyectos.length === 0 && (
                                <p className="text-center text-muted my-4">No hay proyectos subidos aún.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminProyectos;