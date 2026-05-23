import React from 'react';
import { Link } from 'react-router-dom';

const PagoPendiente = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Pago Pendiente ⏳</h1>
        <p className="text-gray-600 mb-6">
          Tu pago se está procesando. Esto puede pasar si usaste un método de pago en efectivo o transferencia que tarda en acreditarse.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Te enviaremos un correo electrónico apenas Mercado Pago nos confirme la aprobación.
        </p>
        <Link 
          to="/" 
          className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded transition duration-200"
        >
          Ir al Inicio
        </Link>
      </div>
    </div>
  );
};

export default PagoPendiente;