import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Asegúrate de que este sea el nombre de tu CSS global
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. Primero el motor de navegación */}
    <BrowserRouter>
      {/* 2. Luego nuestra memoria global del carrito */}
      <CarritoProvider>
        {/* 3. Finalmente tu aplicación entera */}
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </React.StrictMode>,
)