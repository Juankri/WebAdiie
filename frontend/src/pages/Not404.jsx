import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div 
      className="container-fluid d-flex justify-content-center align-items-center text-center" 
      style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', paddingTop: '150px', paddingBottom: '50px' }}
    >
      <div className="card shadow-lg border-0" style={{ borderRadius: '20px', padding: '50px', maxWidth: '600px', width: '100%' }}>
        
        {/* Icono de Arquitectura / Reglas */}
        <div className="mb-4">
          <i className="bi bi-rulers" style={{ fontSize: '80px', color: '#D4AF37' }}></i>
        </div>

        {/* El gran 404 */}
        <h1 
          style={{ 
            fontSize: '100px', 
            fontWeight: '900', 
            color: '#0B2126', 
            lineHeight: '1',
            fontFamily: "'Montserrat', sans-serif"
          }}
        >
          404
        </h1>
        
        {/* Mensaje temático */}
        <h3 className="mb-3" style={{ color: '#0B2126', fontWeight: '700' }}>
          Plano no encontrado
        </h3>
        
        <p className="text-muted mb-5" style={{ fontSize: '16px', padding: '0 20px' }}>
          Parece que intentas acceder a un espacio que aún no hemos diseñado o que ya fue demolido. Revisa la dirección URL o vuelve al inicio.
        </p>

        {/* Botón de regreso */}
        <Link 
          to="/" 
          className="btn btn-lg px-5 shadow-sm" 
          style={{ 
            backgroundColor: '#0B2126', 
            color: '#D4AF37', 
            fontWeight: 'bold',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = '#153b43'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = '#0B2126'; }}
        >
          <i className="bi bi-house-door me-2"></i> Volver al Inicio
        </Link>

      </div>
    </div>
  );
};

export default Error404;