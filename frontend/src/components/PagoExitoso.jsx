import React from 'react';
import { Link } from 'react-router-dom';

const PagoExitoso = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-4 mg-top">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">¡Pago Exitoso! 🎉</h1>
        <p className="text-gray-600 mb-6">
          Muchas gracias por tu compra. El pago ha sido procesado correctamente por Mercado Pago.
        </p>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Siguiente paso:</p>
          <p className="text-sm">Necesitamos los detalles de tu espacio para empezar a diseñar.</p>
        </div>
        {/* Aquí es donde rediriges al formulario de diseño express */}
        <Link 
          to="/formulario-express" 
          className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Rellenar Formulario del Diseño
        </Link>
      </div>
    </div>
  );
};

export default PagoExitoso;