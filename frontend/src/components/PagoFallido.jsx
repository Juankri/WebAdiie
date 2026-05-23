import React from 'react';
import { Link } from 'react-router-dom';

const PagoFallido = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Pago Cancelado ❌</h1>
        <p className="text-gray-600 mb-6">
          Hubo un problema al procesar tu transacción o decidiste cancelar el proceso de pago. No se ha realizado ningún cobro.
        </p>
        <Link 
          to="/servicio-express" 
          className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Volver a intentar
        </Link>
      </div>
    </div>
  );
};

export default PagoFallido;