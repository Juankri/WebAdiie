import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LogOut, 
    PlusSquare, 
    Edit, 
    Trash2, 
    Upload, 
    CheckCircle, 
    XCircle, 
    Image as ImageIcon,
    Save
} from 'lucide-react';
import './Admin_proyecto.css'

const AdminProyectos = () => {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [proyecto, setProyecto] = useState({
        titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: ''
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
            const res = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
            const datos = await res.json();
            setProyectos(datos);
        } catch (error) { console.error("Error:", error); }
    };

    const manejarCambio = (e) => {
        setProyecto({ ...proyecto, [e.target.name]: e.target.value });
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token_adiie');
        navigate('/login');
    };

    const abrirWidgetSubida = (esPortada) => {
        window.cloudinary.openUploadWidget(
            {
                cloudName: 'dtiqi9fim',
                uploadPreset: 'ml_default',
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
        const url = editandoId ? `https://webadiie-backend.onrender.com/api/proyectos/${editandoId}` : 'https://webadiie-backend.onrender.com/api/proyectos';
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
        if (window.confirm(`¿Estás seguro de que quieres eliminar "${titulo}"?`)) {
            try {
                const res = await fetch(`https://webadiie-backend.onrender.com/api/proyectos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    obtenerProyectos();
                }
            } catch (error) { alert('Error al borrar'); }
        }
    };

    const prepararEdicion = (p) => {
        setEditandoId(p._id);
        setProyecto({ ...p, galeria: p.galeria || [] });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelarEdicion = () => {
        setEditandoId(null);
        setProyecto({ titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: '' });
    };

    return (
        <div className="admin-container">
            
            <div className="admin-header">
                <h2>Panel de Administración</h2>
                <button onClick={cerrarSesion} className="btn-logout">
                    Cerrar Sesión <LogOut size={18} />
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
                <h3>Proyectos en Portafolio ({proyectos.length})</h3>
                {proyectos.map(p => (
                    <div key={p._id} className="project-item">
                        <span><strong>{p.titulo}</strong></span>
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