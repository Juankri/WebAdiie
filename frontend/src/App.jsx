import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Quitamos useLocation de aquí

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Portafolio from './pages/Portafolio';
import ServicioExpress from './pages/Servicioexpress';
import En_construccion from './pages/En_construccion';
import Galeria_proyectos from './pages/Galeria_proyectos'; 
import Galeria_diseños_personalizados from './pages/Galeria_diseños_personalizados';
import PaginaProyecto from './pages/Pagina_proyecto';
import PaginaDiseno from './pages/Pagina_diseno';
import Carrito from './pages/Carrito';
import AdminProyectos from './pages/Admin_proyecto';
import AdminDisenos from './pages/Admin_disenos';
import AdminDashboard from './pages/Admin_dashboard';
import Login from './pages/Login';
import PagoExitoso from './components/PagoExitoso';
import PagoFallido from './components/PagoFallido';
import PagoPendiente from './components/PagoPendiente';
import Not404 from './pages/Not404';
import ScrollToTop from './components/ScrollToTop'; // 🌟 Tu vigilante importado
import './App.css'; 
import InfoServicioExpress from './components/infoServicioExpress';
import FormularioProyectoExpress from './pages/FormularioProyectoExpress';
import AdminFondos from './pages/AdminFondos';


function App() {
  return (
    <> 
      {/* 🌟 1. AQUI VA EL VIGILANTE DEL SCROLL 🌟 */}
      {/* Es invisible, pero te subirá cada vez que cambies de ruta */}
      <ScrollToTop />

     
        <Navbar />
      

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/portafolio" element={<Portafolio />} />
        <Route path="/servicio-express" element={<ServicioExpress />} />
        <Route path="/en_construccion" element={<En_construccion />} />
        <Route path="/galeria_proyectos" element={<Galeria_proyectos />} />
        <Route path="/galeria_diseños_personalizados" element={<Galeria_diseños_personalizados />} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/pagina_proyecto/:idUrl" element={<PaginaProyecto />} />
        <Route path="/pagina_diseno/:idUrl" element={<PaginaDiseno />} />
        <Route path="/admin_proyecto" element={<AdminProyectos />} />
        <Route path="/admin_disenos" element={<AdminDisenos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin_dashboard" element={<AdminDashboard/>} />
        <Route path="/pago-exitoso" element={<PagoExitoso />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />
        <Route path="/pago-pendiente" element={<PagoPendiente />} />
        <Route path="/infoservicioexpress" element={<InfoServicioExpress/>} />
        <Route path="/formularioproyectoexpress" element={<FormularioProyectoExpress/>} />
        <Route path="/admin_fondos" element={<AdminFondos />} />
        <Route path="*" element={<Not404/>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;