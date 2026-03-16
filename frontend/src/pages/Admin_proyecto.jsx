import { useState } from 'react';

const AdminProyectos = () => {
  const [proyecto, setProyecto] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: ''
  });

  const manejarCambio = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  const enviarProyecto = async (e) => {
    e.preventDefault();
    
    try {
      // RECUERDA: Cambia este enlace por tu URL real de Render
      const respuesta = await fetch('https://webadiie-backend.onrender.com/api/proyectos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proyecto)
      });

      if (respuesta.ok) {
        alert('¡Proyecto guardado en la base de datos! 🚀');
        setProyecto({ titulo: '', descripcion: '', imagen_url: '' }); // Limpia el formulario
      } else {
        alert('Hubo un error al guardar');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ paddingTop: '200px', paddingBottom: '100px',maxWidth: '500px', margin: '0 auto' }}>
      <h2>Añadir Nuevo Proyecto de Arquitectura</h2>
      
      <form onSubmit={enviarProyecto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          name="titulo" 
          placeholder="Título del Proyecto (Ej: Casa Minimalista)" 
          value={proyecto.titulo} 
          onChange={manejarCambio}
          required
        />
        
        <textarea 
          name="descripcion" 
          placeholder="Descripción de la obra..." 
          value={proyecto.descripcion} 
          onChange={manejarCambio}
          required
        />
        
        <input 
          type="text" 
          name="imagen_url" 
          placeholder="Enlace de la imagen (URL)" 
          value={proyecto.imagen_url} 
          onChange={manejarCambio}
          required
        />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#0B2126', color: 'white', cursor: 'pointer' }}>
          Guardar Proyecto
        </button>
      </form>
    </div>
  );
};

export default AdminProyectos;