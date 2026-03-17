import { useState, useEffect } from 'react';

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([]); // Para listar los proyectos
  const [proyecto, setProyecto] = useState({
    titulo: '', descripcion: '', imagen_url: '', galeria: '', video_url: ''
  });

  // 1. CARGAR PROYECTOS AL INICIO
  const obtenerProyectos = async () => {
    const res = await fetch('https://webadiie-backend.onrender.com/api/proyectos');
    const datos = await res.json();
    setProyectos(datos);
  };

  useEffect(() => {
    obtenerProyectos();
  }, []);

  const manejarCambio = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  // 2. FUNCIÓN PARA CREAR
  const enviarProyecto = async (e) => {
    e.preventDefault();
    const datosParaEnviar = {
      ...proyecto,
      galeria: proyecto.galeria ? proyecto.galeria.split(',').map(url => url.trim()) : [],
    };

    const respuesta = await fetch('https://webadiie-backend.onrender.com/api/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosParaEnviar)
    });

    if (respuesta.ok) {
      alert('¡Proyecto guardado! 🚀');
      setProyecto({ titulo: '', descripcion: '', imagen_url: '', galeria: '', video_url: '' });
      obtenerProyectos(); // Refrescamos la lista automáticamente
    }
  };

  // 3. FUNCIÓN PARA ELIMINAR
  const borrarProyecto = async (id, titulo) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${titulo}"?`)) {
      const res = await fetch(`https://webadiie-backend.onrender.com/api/proyectos/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Proyecto eliminado');
        obtenerProyectos(); // Refrescamos la lista
      } else {
        alert('Error al eliminar');
      }
    }
  };

  return (
    <div style={{ paddingTop: '150px', paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#0B2126' }}>Panel de Administración</h2>
      
      {/* FORMULARIO (Igual que antes) */}
      <form onSubmit={enviarProyecto} style={{ background: '#f9f9f9', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '50px' }}>
        <h3>Subir Nuevo Proyecto</h3>
        <input type="text" name="titulo" placeholder="Título" value={proyecto.titulo} onChange={manejarCambio} required />
        <textarea name="descripcion" placeholder="Descripción" value={proyecto.descripcion} onChange={manejarCambio} required />
        <input type="text" name="imagen_url" placeholder="URL Portada" value={proyecto.imagen_url} onChange={manejarCambio} required />
        <input type="text" name="galeria" placeholder="Galería (link1, link2...)" value={proyecto.galeria} onChange={manejarCambio} />
        <input type="text" name="video_url" placeholder="Link YouTube" value={proyecto.video_url} onChange={manejarCambio} />
        <button type="submit" style={{ background: '#0B2126', color: 'white', padding: '10px', cursor: 'pointer' }}>Publicar</button>
      </form>

      {/* LISTA DE PROYECTOS EXISTENTES */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3>Proyectos Actuales en la Web</h3>
        {proyectos.map((p) => (
          <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
            <div>
              <strong>{p.titulo}</strong>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>ID: {p._id}</p>
            </div>
            <button 
              onClick={() => borrarProyecto(p._id, p.titulo)}
              style={{ background: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProyectos;