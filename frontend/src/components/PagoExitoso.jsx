import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id') || 'SinID';
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center"  style={{ minHeight: '100vh', backgroundColor: '#f9f9f9', paddingTop: '150px', paddingBottom: '50px' }}>
      <div className="card text-center shadow-lg border-0" style={{ borderRadius: '20px', padding: '40px', maxWidth: '500px', width: '100%' }}>
        
        <div className="mb-4">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle" style={{ width: '100px', height: '100px', backgroundColor: '#0B2126' }}>
            <i className="bi bi-check-lg" style={{ fontSize: '50px', color: '#D4AF37' }}></i>
          </div>
        </div>

        <h2 className="mb-3" style={{ color: '#0B2126', fontWeight: '700', fontFamily: "'Montserrat', sans-serif" }}>¡Pago Exitoso!</h2>
        
        <p className="text-muted mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '16px' }}>
          Hemos recibido el pago de tu Servicio Express correctamente. Ya puedes continuar para darnos los detalles de tu espacio.
        </p>

        {/* Solo mostramos la caja de detalles si hay un ID real */}
        {paymentId !== 'SinID' && (
          <div className="p-3 mb-4 text-start" style={{ backgroundColor: '#f1f1f1', borderLeft: '5px solid #D4AF37', borderRadius: '5px' }}>
            <p className="mb-1" style={{ fontSize: '14px', color: '#333' }}>
              <i className="bi bi-receipt me-2" style={{ color: '#0B2126' }}></i>
              <strong>Nº de Orden:</strong> #{paymentId}
            </p>
            <p className="mb-0" style={{ fontSize: '13px', color: '#666' }}>Se ha enviado un recibo a tu correo.</p>
          </div>
        )}

        {/* Solo mostramos el botón dorado si hay un ID real */}
        {paymentId !== 'SinID' ? (
          <Link 
            to={`/formularioproyectoexpress?orden=${paymentId}`} 
            className="btn btn-lg w-100 mb-3" 
            style={{ backgroundColor: '#0B2126', color: '#D4AF37', fontWeight: '600', borderRadius: '8px', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#153b43'; }} 
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#0B2126'; }}
          >
            Completar Detalles del Proyecto <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        ) : (
          <div className="alert alert-warning mb-3">No se detectó un número de orden válido. Revisa tu correo electrónico para el enlace correcto.</div>
        )}

        <Link to="/" className="d-block" style={{ color: '#0B2126', textDecoration: 'none', fontWeight: '500', fontSize: '14px' }}>
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default PagoExitoso;