import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    LogOut, 
    PlusSquare, 
    Edit, 
    Trash2, 
    Upload, 
    CheckCircle, 
    ImageIcon,
    Save,
    ArrowLeft
} from 'lucide-react';
import './Admin_proyecto.css'

const AdminDisenos = () => {
    const navigate = useNavigate();
    const [disenos, setDisenos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [diseno, setDiseno] = useState({
        titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: ''
    });

    const token = localStorage.getItem('token_adiie');

    // --- PROTECCIÓN Y CARGA INICIAL ---
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            obtenerDisenos();
        }
    }, [token, navigate]);

    const obtenerDisenos = async () => {
        try {
            const res = await fetch('https://webadiie-backend.onrender.com/api/disenos');
            const datos = await res.json();
            setDisenos(datos);
        } catch (error) { console.error("Error:", error); }
    };

    const manejarCambio = (e) => {
        setDiseno({ ...diseno, [e.target.name]: e.target.value });
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token_adiie');
        navigate('/login');
    };

    // --- CONFIGURACIÓN DE CLOUDINARY ---
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
            ? `https://webadiie-backend.onrender.com/api/disenos/${editandoId}` 
            : 'https://webadiie-backend.onrender.com/api/disenos';
        const metodo = editandoId ? 'PUT' : 'POST';

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
                alert('¡Diseño guardado correctamente!');
                cancelarEdicion();
                obtenerDisenos();
            } else {
                alert('Error de autenticación. Por favor, inicia sesión de nuevo.');
                cerrarSesion();
            }
        } catch (error) { alert('Error de conexión con el servidor'); }
    };

    const borrarDiseno = async (id, titulo) => {
        if (window.confirm(`¿Seguro que quieres eliminar el diseño "${titulo}"?`)) {
            try {
                const res = await fetch(`https://webadiie-backend.onrender.com/api/disenos/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    obtenerDisenos();
                }
            } catch (error) { alert('No se pudo eliminar el diseño'); }
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
        <div className="admin-container">
            <div className="admin-header">
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <button onClick={() => navigate('/admin_proyecto')} className="btn-edit" style={{background: '#eee', color: '#333'}}>
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <h2>Admin: Diseños Conceptuales</h2>
                </div>
                <button onClick={cerrarSesion} className="btn-logout">
                    Salir <LogOut size={18} />
                </button>
            </div>
            
            <form onSubmit={enviarDiseno} className="admin-form">
                <h3>
                    {editandoId ? <Edit size={20} /> : <PlusSquare size={20} />} 
                    {editandoId ? ' Editar Diseño' : ' Nuevo Diseño para la Galería'}
                </h3>
                
                <input 
                    className="admin-input" 
                    type="text" name="titulo" placeholder="Ej: Concepto Living Minimalista" 
                    value={diseno.titulo} onChange={manejarCambio} required 
                />
                
                <textarea 
                    className="admin-textarea" 
                    name="descripcion" placeholder="Explica la idea de este diseño..." 
                    value={diseno.descripcion} onChange={manejarCambio} required 
                />
                
                <div className="upload-section">
                    <label>Imagen Principal (Portada):</label>
                    <button type="button" onClick={() => abrirWidgetSubida(true)} className="btn-upload">
                        {diseno.imagen_url ? <CheckCircle size={18} /> : <Upload size={18} />}
                        {diseno.imagen_url ? "Imagen Cargada" : "Subir Portada"}
                    </button>
                    {diseno.imagen_url && <img src={diseno.imagen_url} width="150" className="mini-img" style={{marginTop:'10px'}} />}
                </div>

                <div className="upload-section">
                    <label>Más imágenes del diseño (Galería):</label>
                    <button type="button" onClick={() => abrirWidgetSubida(false)} className="btn-upload">
                        <ImageIcon size={18} /> Añadir Vistas
                    </button>
                    <div className="gallery-preview">
                        {diseno.galeria.map((url, i) => (
                            <div key={i} className="mini-img-container">
                                <img src={url} width="80" height="80" className="mini-img" />
                                <button type="button" onClick={() => eliminarFotoGaleria(i)} className="btn-delete-mini">×</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn-enviar-cotizacion" style={{margin: 0, flex: 1}}>
                        <Save size={18} style={{marginRight: '8px'}} />
                        {editandoId ? 'Actualizar Diseño' : 'Publicar en Galería'}
                    </button>
                    {editandoId && (
                        <button type="button" onClick={cancelarEdicion} className="btn-logout" style={{background: '#999'}}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="projects-list-container">
                <h3>Diseños publicados ({disenos.length})</h3>
                {disenos.map(d => (
                    <div key={d._id} className="project-item">
                        <span>{d.titulo}</span>
                        <div className="project-actions">
                            <button onClick={() => prepararEdicion(d)} className="btn-edit">
                                <Edit size={14} />
                            </button>
                            <button onClick={() => borrarDiseno(d._id, d.titulo)} className="btn-delete">
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDisenos;