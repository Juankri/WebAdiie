import React, { useState } from 'react';

// 🌟 Ahora recibe los datos del cliente y el carrito como "props" opcionales
const BotonPago = ({ tituloServicio, precioServicio, datosCliente, carrito }) => {
    
  const [cargando, setCargando] = useState(false);

  const handlePago = async (e) => {
    e.preventDefault(); // Evita que la página se recargue si está dentro de un form

    // 1. VALIDACIÓN: Revisamos si los datos del cliente existen y están completos
    if (datosCliente && (datosCliente.nombre === '' || datosCliente.correo === '')) {
        alert("Por favor, completa tu nombre y correo para proceder al pago.");
        return;
    }

    setCargando(true);
    
    try {
      // 2. PETICIÓN A PRODUCCIÓN: Hacemos la petición a tu backend en Render
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/crear_preferencia`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: tituloServicio,
          precio: precioServicio,
          // Añadimos los datos extra si es que vienen desde el carrito
          nombre: datosCliente ? datosCliente.nombre : 'Cliente Express',
          correo: datosCliente ? datosCliente.correo : 'sin-correo@estudioadiie.cl',
          mensaje: datosCliente ? datosCliente.mensaje : '',
          servicios: carrito ? carrito : []
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        // Redirigimos a la pasarela azul
        window.location.href = data.init_point;
      } else {
        alert("Hubo un error al generar el link de pago.");
        console.error("Detalle:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud de pago:", error);
      alert("Error de conexión con el servidor. ¿Está el backend en Render activo?");
    } finally {
      setCargando(false);
    }
  };

  return (
    <button 
      type="button"
      onClick={handlePago} 
      disabled={cargando}
      // 🌟 Le puse la clase de CSS para que se vea igual al botón del carrito que teníamos
      className="btn-enviar-cotizacion w-full mt-4" 
    >
      {cargando ? 'Conectando con Mercado Pago...' : `Pagar $${precioServicio.toLocaleString('es-CL')} y Empezar`}
    </button>
  );
};

export default BotonPago;