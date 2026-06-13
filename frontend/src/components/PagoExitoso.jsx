import React from 'react';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
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
            <strong>Nº de Orden:</strong> #{(Math.floor(Math.random() * 90000) + 10000)}
          </p>
          <p className="mb-0" style={{ fontSize: '13px', color: '#666' }}>
            Se ha enviado un recibo a tu correo electrónico.
          </p>
        </div>

        {/* Botón principal de acción */}
        <Link 
          to="/formularioproyectoexpress" /* Cambia esto a la ruta de tu formulario post-pago */
          className="btn btn-lg w-100 mb-3" 
          style={{ 
            backgroundColor: '#0B2126', 
            color: '#D4AF37', 
            fontWeight: '600', 
            borderRadius: '8px',
            transition: 'all 0.3s ease' 
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#153b43'; }} // Un azul un poco más claro al pasar el mouse
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