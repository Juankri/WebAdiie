import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft,
    ArrowRight,
    LogOut, 
    PlusSquare, 
    Edit, 
    Trash2, 
    Upload, 
    CheckCircle, 
    XCircle, 
    Image as ImageIcon,
    Save,
    Star // 🌟 Agregamos la estrella para el destacado
} from 'lucide-react';
import './Admin_proyecto.css'
import Swal from 'sweetalert2';

const AdminProyectos = () => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    
    // 1. NUEVO: Agregamos destacado: false al estado inicial
    const [proyecto, setProyecto] = useState({
        titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '', destacado: false
    });

    const token = localStorage.getItem('token_adiie');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            obtenerProyectos();
        }
    }, [token, navigate]);

    const obtenerProyectos = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/proyectos`);
            const datos = await res.json();
            setProyectos(datos);
        } catch (error) { console.error("Error:", error); }
    };

    // 2. ACTUALIZADO: Ahora sabe detectar si es un checkbox o un input de texto normal
    const manejarCambio = (e) => {
        const { name, value, type, checked } = e.target;
        setProyecto({ 
            ...proyecto, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token_adiie');
        navigate('/login');
    };

    const abrirWidgetSubida = (esPortada) => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: 'd22tuzo6',
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
                alert('¡Guardado con éxito!');
                cancelarEdicion();
                obtenerProyectos();
            } else {
                alert('Sesión expirada');
                cerrarSesion();
            }
        } catch (error) { alert('Error de conexión'); }
    };

    const borrarProyecto = async (id, titulo) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar el proyecto "${titulo}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      iconColor: '#dc3545',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0B2126',
      confirmButtonText: '<i className="bi bi-trash"></i> Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#f9f9f9',
      color: '#0B2126'
    });

    if (confirmacion.isConfirmed) {
      Swal.fire({
        title: 'Eliminando proyecto...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/proyectos/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          obtenerProyectos();
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Proyecto eliminado con éxito',
            showConfirmButton: false,
            timer: 2500,
            iconColor: '#dc3545', 
            background: '#f9f9f9',
            color: '#0B2126'
          });
        } else {
          throw new Error('Error en la respuesta del servidor');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al borrar',
          text: 'Hubo un problema de conexión. Intenta nuevamente.',
          confirmButtonColor: '#0B2126',
          background: '#f9f9f9',
          color: '#0B2126'
        });
      }
    }
  };

    const prepararEdicion = (p) => {
        setEditandoId(p._id);
        // NUEVO: Aseguramos que cargue el estado de destacado al editar (por si no tenía, será false)
        setProyecto({ ...p, galeria: p.galeria || [], destacado: p.destacado || false });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        // NUEVO: Reseteamos el estado destacado al limpiar el formulario
        setProyecto({ titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '', destacado: false });
    };

    return (
        <div className="admin-container">
            
            <div className="admin-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <button onClick={() => navigate('/admin_dashboard')} className="btn-volver">
                        <ArrowLeft size={18} /> Volver
                    </button>
                    <h2>Panel de Proyectos</h2>
                </div>
                <button onClick={() => navigate('/admin_disenos')} className="btn-logout">
                    Diseños <ArrowRight size={18} />
                </button>
            </div>
            
            <form onSubmit={enviarProyecto} className="admin-form">
                <h3>
                    {editandoId ? <Edit size={20} className="admin-title-icon" /> : <PlusSquare size={20} className="admin-title-icon" />} 
                    {editandoId ? ' Editar Proyecto' : ' Nuevo Proyecto'}
                </h3>
                
                <input 
                    className="admin-input" 
                    type="text" name="titulo" placeholder="Título del Proyecto" 
                    value={proyecto.titulo} onChange={manejarCambio} required 
                />
                <textarea 
                    className="admin-textarea" 
                    name="descripcion" placeholder="Descripción detallada..." 
                    value={proyecto.descripcion} onChange={manejarCambio} required 
                />
                
                <div className="upload-section">
                    <label>Imagen de Portada:</label>
                    <button type="button" onClick={() => abrirWidgetSubida(true)} className="btn-upload">
                        {proyecto.imagen_url ? <CheckCircle size={18} /> : <Upload size={18} />}
                        {proyecto.imagen_url ? "Cambiar Portada" : "Subir Portada"}
                    </button>
                    {proyecto.imagen_url && <img src={proyecto.imagen_url} width="150" className="mini-img"  />}
                </div>

                <div className="upload-section">
                    <label>Galería de Fotos:</label>
                    <button type="button" onClick={() => abrirWidgetSubida(false)} className="btn-upload">
                        <ImageIcon size={18} /> Añadir Fotos
                    </button>
                    <div className="gallery-preview">
                        {proyecto.galeria.map((url, i) => (
                            <div key={i} className="mini-img-container">
                                <img src={url} width="80" height="80" className="mini-img" />
                                <button type="button" onClick={() => eliminarFotoGaleria(i)} className="btn-delete-mini">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <input 
                    className="admin-input" 
                    type="text" name="video_url" placeholder="URL de Video (YouTube/Vimeo)" 
                    value={proyecto.video_url} onChange={manejarCambio} 
                />

                {/* 3. NUEVO: CHECKBOX DE PROYECTO DESTACADO */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <input 
                        type="checkbox" 
                        id="destacado" 
                        name="destacado" 
                        checked={proyecto.destacado} 
                        onChange={manejarCambio}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <label htmlFor="destacado" style={{ cursor: 'pointer', fontWeight: 'bold', color: '#0B2126', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                        <Star size={20} color="#D4AF37" fill={proyecto.destacado ? "#D4AF37" : "none"} /> 
                        Mostrar en "Proyectos Destacados" de la página de Inicio
                    </label>
                </div>
                
                <div className="admin-form-actions">
                    <button type="submit" className="btn-enviar-cotizacion btn-submit-project">
                        <Save size={18} className="admin-save-icon" />
                        {editandoId ? 'Actualizar Proyecto' : 'Publicar Proyecto'}
                    </button>
                    {editandoId && (
                        <button type="button" onClick={cancelarEdicion} className="btn-logout btn-cancel">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="projects-list-container">
                <h3>Proyectos Publicados ({proyectos.length})</h3>
                {proyectos.map(p => (
                    <div key={p._id} className="project-item">
                        {/* Agregamos una estrellita al título en la lista para que sepa cuáles son destacados */}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {p.destacado && <Star size={16} color="#D4AF37" fill="#D4AF37" />}
                            <strong>{p.titulo}</strong>
                        </span>
                        <div className="project-actions">
                            <button onClick={() => prepararEdicion(p)} className="btn-edit">
                                <Edit size={14} /> Editar
                            </button>
                            <button onClick={() => borrarProyecto(p._id, p.titulo)} className="btn-delete">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProyectos;