import React, { useState, useEffect } from 'react';
// 1. Añadimos useSearchParams a la importación
import { Link, useSearchParams } from 'react-router-dom';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  // Capturamos el ID de pago que Mercado Pago inyectó en la URL de redirección
  const paymentId = searchParams.get('payment_id') || 'SinID';

  // ESTADOS DE SEGURIDAD
  const [verificando, setVerificando] = useState(true);
  const [esValido, setEsValido] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  useEffect(() => {
    const comprobarSeguridad = async () => {
      // Si ni siquiera viene un parámetro 'orden' en la URL, bloqueamos de inmediato
      if (!ordenId || ordenId === 'SinID' || ordenId === 'Venta Directa / Sin Orden') {
        setEsValido(false);
        setMensajeError('Acceso denegado: Enlace de diseño inválido o incompleto.');
        setVerificando(false);
        return; // Detiene la función aquí mismo, ya no molesta al backend
      }

      try {
        // Consultamos al backend en Render si la orden es real
        const respuesta = await fetch(`https://webadiie-backend.onrender.com/api/validar-orden/${ordenId}`);
        const resultado = await respuesta.json();

        if (respuesta.ok && resultado.valido) {
          setEsValido(true);
        } else {
          setEsValido(false);
          setMensajeError(resultado.error || 'La orden no es válida.');
        }
      } catch (error) {
        setEsValido(false);
        setMensajeError('Error al conectar con el módulo de seguridad.');
      } finally {
        setVerificando(false);
      }
    };

    comprobarSeguridad();
  }, [ordenId]);

  // Pantalla de carga mientras el backend habla con Mercado Pago
  if (verificando) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Verificando credenciales de pago...</span>
        </div>
      </div>
    );
  }

  // 🛡️ PANTALLA DE BLOQUEO SI ALGUIEN INTENTÓ BURLAR EL LINK
  if (!esValido) {
    return (
      <div className="container text-center py-5" style={{ marginTop: '150px' }}>
        <div className="card border-danger mx-auto shadow" style={{ maxWidth: '500px', borderRadius: '15px' }}>
          <div className="card-body p-5">
            <i className="bi bi-shield-slash-fill text-danger mb-4" style={{ fontSize: '60px' }}></i>
            <h3 className="text-danger fw-bold mb-3">Acceso No Autorizado</h3>
            <p className="text-muted">{mensajeError}</p>
            <hr />
            <p className="small text-secondary">Esta sección está protegida criptográficamente. Cada intento de acceso forzado queda registrado.</p>
            <Link to="/" className="btn btn-dark w-100 mt-3">Volver a la Página Principal</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    // Contenedor principal: Ocupa toda la pantalla y centra la tarjeta
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', paddingTop: '150px', paddingBottom: '50px' }}
    >
      <div
        className="card text-center shadow-lg border-0"
        style={{ borderRadius: '20px', padding: '40px', maxWidth: '500px', width: '100%' }}
      >

        {/* Icono de Check (Usando Bootstrap Icons y tus colores) */}
        <div className="mb-4">
          <div
            className="d-inline-flex justify-content-center align-items-center rounded-circle"
            style={{ width: '100px', height: '100px', backgroundColor: '#0B2126' }}
          >
            <i className="bi bi-check-lg" style={{ fontSize: '50px', color: '#D4AF37' }}></i>
          </div>
        </div>

        {/* Título */}
        <h2 className="mb-3" style={{ color: '#0B2126', fontWeight: '700', fontFamily: "'Montserrat', sans-serif" }}>
          ¡Pago Exitoso!
        </h2>

        {/* Texto de información */}
        <p className="text-muted mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}>
          Hemos recibido el pago de tu Servicio Express correctamente. Ya puedes continuar para darnos los detalles de tu espacio.
        </p>

        {/* Caja de detalles de la orden */}
        <div className="p-3 mb-4 text-start" style={{ backgroundColor: '#f1f1f1', borderLeft: '5px solid #D4AF37', borderRadius: '5px' }}>
          <p className="mb-1" style={{ fontSize: '14px', color: '#333' }}>
            <i className="bi bi-receipt me-2" style={{ color: '#0B2126' }}></i>
            {/* 2. Mostramos el ID de pago REAL en lugar del número aleatorio */}
            <strong>Nº de Orden:</strong> #{paymentId}
          </p>
          <p className="mb-0" style={{ fontSize: '13px', color: '#666' }}>
            Se ha enviado un recibo a tu correo electrónico.
          </p>
        </div>

        {/* Botón principal de acción */}
        {/* 3. Inyectamos el ID de la orden directamente en el link hacia el formulario */}
        <Link
          to={`/formularioproyectoexpress?orden=${paymentId}`}
          className="btn btn-lg w-100 mb-3"
          style={{
            backgroundColor: '#0B2126',
            color: '#D4AF37',
            fontWeight: '600',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#153b43'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#0B2126'; }}
        >
          Completar Detalles del Proyecto <i className="bi bi-arrow-right ms-2"></i>
        </Link>

        {/* Enlace secundario */}
        <Link
          to="/"
          className="d-block"
          style={{ color: '#0B2126', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}
          onMouseEnter={(e) => { e.target.style.color = '#D4AF37'; }}
          onMouseLeave={(e) => { e.target.style.color = '#0B2126'; }}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default PagoExitoso;