import { useEffect } from 'react';
// ¡OJO AQUÍ! Solo importamos Routes, Route y useLocation (ya no BrowserRouter)
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Portafolio from './pages/Portafolio';
import ServicioExpress from './pages/Servicioexpress';
import En_construccion from './pages/En_construccion';
import Galeria_proyectos from './pages/Galeria_proyectos'; 
import Galeria_diseños_personalizados from './pages/Galeria_diseños_personalizados';
import PaginaProyecto from './pages/Pagina_proyecto';
import Carrito from './pages/Carrito';
import AdminProyectos from './pages/Admin_proyecto';


import './App.css'; 

function App() {
  return (
    // Reemplazamos <Router> por etiquetas vacías <> (Fragmentos)
    <> 
      <header className="header">
        <div className="social">
            <div className="social-icons">
                <a href="https://facebook.com/tu-pagina" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/estudioadiie/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
        <Navbar />
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/servicio-express" element={<ServicioExpress />} />
        <Route path="/en_construccion" element={<En_construccion />} />
        <Route path="/galeria_proyectos" element={<Galeria_proyectos />} />
        <Route path="/galeria_diseños_personalizados" element={<Galeria_diseños_personalizados />} />
        <Route path="/carrito" element={<Carrito/>} />
        {/* Tu ruta personalizada exactamente como la querías */}
        <Route path="/pagina_proyecto/:idUrl" element={<PaginaProyecto />} />
        <Route path="/admin_proyecto" element={<AdminProyectos />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;