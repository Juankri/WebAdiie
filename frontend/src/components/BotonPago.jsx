import React, { useState } from 'react';

const BotonPago = ({ tituloServicio, precioServicio }) => {
    
  const [cargando, setCargando] = useState(false);

  const handlePago = async () => {
    setCargando(true);
    
    try {
      // Hacemos la petición a tu backend en Flask
      const response = await fetch('http://localhost:5000/api/crear_preferencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: tituloServicio,
          precio: precioServicio
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Si todo sale bien, Mercado Pago nos da un link (init_point)
        // Redirigimos al usuario a esa pasarela de pago
        window.location.href = data.init_point;
      } else {
        alert("Hubo un error al generar el pago.");
      }
    } catch (error) {
      console.error("Error en la solicitud de pago:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <button 
      onClick={handlePago} 
      disabled={cargando}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {cargando ? 'Cargando pasarela...' : `Pagar $${precioServicio} y Empezar`}
    </button>
  );
};

export default BotonPago;