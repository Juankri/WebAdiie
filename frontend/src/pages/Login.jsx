import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

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
    setError('');

    // 🌟 1. MOSTRAMOS SPINNER DE CARGA MIENTRAS CONECTA
    Swal.fire({
      title: 'Verificando credenciales...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const respuesta = await fetch('https://webadiie-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(credenciales)
      });

      const datos = await respuesta.json();

      if (respuesta.ok) {
        localStorage.setItem('token_adiie', datos.token);
        
        // 🌟 2. ALERTA DE ÉXITO QUE REDIRIGE AUTOMÁTICAMENTE
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido al Panel!',
          text: 'Redirigiendo de forma segura...',
          iconColor: '#D4AF37', // Dorado Adiie
          showConfirmButton: false, // Ocultamos el botón
          timer: 1500, // Espera 1.5 segundos para que se vea el mensaje
          background: '#f9f9f9',
          color: '#0B2126'
        }).then(() => {
          // Redirigimos una vez que la alerta se cierra
          window.location.href = '/admin_dashboard';
        });

      } else {
        // Cerramos el spinner si hay error y mostramos el texto rojo
        Swal.close(); 
        setError(datos.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      // Cerramos el spinner si se cae el servidor
      Swal.close(); 
      setError('Error de conexión con el servidor. ¿Está activo en Render?');
    }
  };


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

