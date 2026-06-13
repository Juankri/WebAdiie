import React from 'react';
import { Link } from 'react-router-dom';

const PagoFallido = () => {
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
        
        {/* Icono de Error (Usando un rojo suave de alerta) */}
        <div className="mb-4">
          <div 
            className="d-inline-flex justify-content-center align-items-center rounded-circle" 
            style={{ width: '100px', height: '100px', backgroundColor: '#f8d7da' }} 
          >
            <i className="bi bi-x-lg" style={{ fontSize: '50px', color: '#dc3545' }}></i>
          </div>
        </div>

        {/* Título */}
        <h2 className="mb-3" style={{ color: '#0B2126', fontWeight: '700', fontFamily: "'Montserrat', sans-serif" }}>
          Pago no procesado
        </h2>
        
        {/* Texto de información */}
        <p className="text-muted mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}>
          Lo sentimos, hubo un problema al procesar tu pago y la transacción ha sido rechazada. <strong>No se ha realizado ningún cargo a tu cuenta.</strong>
        </p>

        {/* Caja de sugerencias de solución */}
        <div className="p-3 mb-4 text-start" style={{ backgroundColor: '#f1f1f1', borderLeft: '5px solid #dc3545', borderRadius: '5px' }}>
          <p className="mb-2" style={{ fontSize: '14px', color: '#333' }}>
            <strong>¿Qué puedes hacer?</strong>
          </p>
          <ul className="mb-0 text-muted" style={{ fontSize: '13px', paddingLeft: '20px' }}>
            <li>Verifica que los datos de tu tarjeta sean correctos.</li>
            <li>Asegúrate de que tu tarjeta esté habilitada para compras online.</li>
            <li>Intenta utilizar un medio de pago diferente.</li>
          </ul>
        </div>

        {/* Botón principal de acción (Reintentar) */}
        <Link 
          to="/servicio-express" /* Asegúrate de que esta ruta lleve a donde ofreces el servicio */
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
          Intentar nuevamente <i className="bi bi-arrow-counterclockwise ms-2"></i>
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

export default PagoFallido;