import { useState, useEffect } from 'react';

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [proyecto, setProyecto] = useState({
    titulo: '', descripcion: '', imagen_url: '', galeria: [], video_url: ''
  });

  const obtenerProyectos = async () => {
    try {
      const res = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
      const datos = await res.json();
      setProyectos(datos);
    } catch (error) { console.error("Error:", error); }
  };

  useEffect(() => { obtenerProyectos(); }, []);

  const manejarCambio = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  // --- CONFIGURACIÓN DE CLOUDINARY ---
  const abrirWidgetSubida = (esPortada) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: 'dtiqi9fim', // PON AQUÍ TU NOMBRE DE NUBE
        uploadPreset: 'ml_default', // PON AQUÍ TU PRESET UNSIGNED
        sources: ['local', 'url', 'camera'],
        showAdvancedOptions: false,
        cropping: esPortada, // Permite recortar solo si es la portada
        multiple: !esPortada, // Permite subir varias si es galería
        defaultSource: 'local',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proyecto)
      });
      if (respuesta.ok) {
        alert('¡Hecho! ✨');
        cancelarEdicion();
        obtenerProyectos();
      }
    } catch (error) { alert('Error de conexión'); }
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
    <div style={{ paddingTop: '150px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#0B2126' }}>Panel de Administración</h2>
      
      <form onSubmit={enviarProyecto} style={{ background: '#f9f9f9', padding: '25px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h3>{editandoId ? '📝 Editar Proyecto' : '🆕 Nuevo Proyecto'}</h3>
        
        <input type="text" name="titulo" placeholder="Título" value={proyecto.titulo} onChange={manejarCambio} required />
        <textarea name="descripcion" placeholder="Descripción" value={proyecto.descripcion} onChange={manejarCambio} required />
        
        {/* SUBIDA DE PORTADA */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Imagen de Portada (Principal):</label>
          <button type="button" onClick={() => abrirWidgetSubida(true)} style={estiloBotonSubir}>
            {proyecto.imagen_url ? "✅ Cambiar Portada" : "📁 Subir desde PC"}
          </button>
          {proyecto.imagen_url && <img src={proyecto.imagen_url} width="120" style={{ marginTop: '10px', borderRadius: '5px' }} />}
        </div>

        {/* SUBIDA DE GALERÍA */}
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Galería de Fotos:</label>
          <button type="button" onClick={() => abrirWidgetSubida(false)} style={estiloBotonSubir}>
            📁 Añadir Fotos a Galería
          </button>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
            {proyecto.galeria.map((url, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <img src={url} width="80" height="80" style={{ objectFit: 'cover', borderRadius: '5px' }} />
                <button type="button" onClick={() => eliminarFotoGaleria(i)} style={estiloBorrarMini}>×</button>
              </div>
            ))}
          </div>
        </div>

        <input type="text" name="video_url" placeholder="Link YouTube (Opcional)" value={proyecto.video_url} onChange={manejarCambio} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={{ flex: 1, background: '#0B2126', color: 'white', padding: '12px', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>
            {editandoId ? 'Guardar Cambios' : 'Publicar'}
          </button>
          {editandoId && <button type="button" onClick={cancelarEdicion} style={{ background: '#666', color: 'white', padding: '12px', border: 'none', borderRadius: '5px' }}>Cancelar</button>}
        </div>
      </form>

      {/* LISTA (Igual que antes pero más limpia) */}
      <div style={{ marginTop: '50px' }}>
        <h3>Proyectos en la Nube</h3>
        {proyectos.map(p => (
          <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #eee' }}>
            <span>{p.titulo}</span>
            <div>
              <button onClick={() => prepararEdicion(p)} style={{ marginRight: '10px' }}>Editar</button>
              <button onClick={() => {/* misma funcion borrar */}} style={{ color: 'red' }}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const estiloBotonSubir = { padding: '8px 15px', background: '#D4AF37', border: 'none', borderRadius: '5px', cursor: 'pointer', color: '#0B2126', fontWeight: 'bold' };
const estiloBorrarMini = { position: 'absolute', top: '-5px', right: '-5px', background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '12px' };

export default AdminProyectos;