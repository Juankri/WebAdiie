import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credenciales, setCredenciales] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await fetch('https://webadiie-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        // --- LA MAGIA: Guardamos el carnet en el navegador ---
        localStorage.setItem('token_adiie', datos.token);
        alert('¡Bienvenido, Administrador! 🏛️');
        navigate('/admin_proyecto'); // Te manda al panel
      } else {
        setError(datos.error || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div style={{ paddingTop: '200px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <form onSubmit={iniciarSesion} style={{ background: '#f9f9f9', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#0B2126' }}>Acceso EstudioAdiie</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <input 
          type="text" name="usuario" placeholder="Usuario" 
          onChange={manejarCambio} required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input 
          type="password" name="password" placeholder="Contraseña" 
          onChange={manejarCambio} required 
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
        
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#0B2126', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Entrar al Panel
        </button>
      </form>
    </div>
  );
};

export default Login;