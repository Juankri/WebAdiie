import { useState } from "react";
import { useNavigate} from 'react-router-dom';

import './Login.css';




const Login = () => {

  const [credenciales, setCredenciales] = useState({ usuario: '', password: ''});

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const manejarCambio = (e) => {
    setCredenciales({...credenciales, [e.target.name]: e.target.value});
 };

 const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('')

    try {
      const respuesta = await fetch('https://webadiie-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(credenciales)
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem('token_adiie', datos.token);
        alert('¡Bienvenido!');
        window.location.href = '/admin_dashboard';
      } else {
        setError(datos.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error de conexion con el servidor');
    }
 }


return(
  <div className="login_container">
    <form onSubmit={iniciarSesion} className="login_form">
      <h2 className="login_titulo">Acceso EstudioAdiie</h2>

      {error && <p className="login_error">{error}</p>}

      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        onChange={manejarCambio}
        required
        className="login_input"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={manejarCambio}
        required
        className="login_input"
      />

      <button 
        type="submit"
        className="login_boton">Iniciar Sesión</button>


    </form>
  </div>
  );

};

export default Login;

