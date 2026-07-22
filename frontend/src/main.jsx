import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Asegúrate de que este sea el nombre de tu CSS global
import { BrowserRouter } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      {/* 2. Primero el motor de navegación */}
      <BrowserRouter>
        
        {/* 🌟 3. Luego el cerebro de seguridad de la Sesión */}
        <AuthProvider>
          {/* 4. Luego nuestra memoria global del carrito */}
          <CarritoProvider>
            {/* 5. Finalmente tu aplicación entera */}
            <App />
          </CarritoProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);