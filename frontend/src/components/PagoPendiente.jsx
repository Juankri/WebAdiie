import React from 'react';
import { Link } from 'react-router-dom';

const PagoPendiente = () => {
  return (
    // Contenedor principal: Centra la tarjeta en pantalla
    <div 
      className="container-fluid d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', paddingTop: '150px', paddingBottom: '50px' }}
    >
      <div 
        className="card text-center shadow-lg border-0" 
        style={{ borderRadius: '20px', padding: '40px', maxWidth: '500px', width: '100%' }}
      >
        
        {/* Icono de Reloj / Espera (Usando un amarillo/ámbar suave) */}
        <div className="mb-4">
          <div 
            className="d-inline-flex justify-content-center align-items-center rounded-circle" 
            style={{ width: '100px', height: '100px', backgroundColor: '#fff3cd' }} 
          >
            <i className="bi bi-hourglass-split" style={{ fontSize: '50px', color: '#ffc107' }}></i>
          </div>
        </div>

        {/* Título */}
        <h2 className="mb-3" style={{ color: '#0B2126', fontWeight: '700', fontFamily: "'Montserrat', sans-serif" }}>
          Pago en proceso de verificación
        </h2>
        
        {/* Texto informativo */}
        <p className="text-muted mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}>
          Tu pago está siendo procesado por la entidad bancaria o se encuentra pendiente de acreditación en efectivo. ¡No te preocupes, esto es normal!
        </p>

        {/* Caja de instrucciones específicas */}
        <div className="p-3 mb-4 text-start" style={{ backgroundColor: '#f1f1f1', borderLeft: '5px solid #ffc107', borderRadius: '5px' }}>
          <p className="mb-2" style={{ fontSize: '14px', color: '#333' }}>
            <strong>¿Qué pasará ahora?</strong>
          </p>
          <ul className="mb-0 text-muted" style={{ fontSize: '13px', paddingLeft: '20px' }}>
            <li>Si pagaste en efectivo, puede tardar hasta 24-48 horas hábiles en reflejarse.</li>
            <li>Una vez acreditado, te enviaremos una confirmación de forma automática por correo.</li>
            <li>Tu link para completar el formulario del Servicio Express se activará en cuanto el pago sea aprobado.</li>
          </ul>
        </div>

        {/* Botón principal (Regresar al perfil o al inicio para esperar tranquilos) */}
        <Link 
          to="/" 
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
          Entendido, volver al inicio <i className="bi bi-house-door ms-2"></i>
        </Link>

        {/* Enlace de soporte por si tienen dudas */}
        <small className="text-muted">
          ¿Tienes dudas sobre tu pago? <a href="" style={{ color: '#0B2126', fontWeight: '600', textDecoration: 'none' }}>Contáctanos aquí</a>
        </small>
      </div>
    </div>
  );
};

export default PagoPendiente;