import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const idTarget = hash.substring(1);
      let ultimaPosicion = -1;
      let contador = 0;

      // Escaneamos la posición durante 2.5 segundos
      const vigilanteScroll = setInterval(() => {
        const elemento = document.getElementById(idTarget);

        if (elemento) {
          const offset = 90; // Altura exacta de tu Navbar
          // Calculamos la posición real del elemento en la página
          const posicionActual = elemento.getBoundingClientRect().top + window.scrollY - offset;

          // 🌟 Si el elemento se MVIÓ (porque cargaron las fotos y lo empujaron), corregimos la pantalla
          if (Math.abs(posicionActual - ultimaPosicion) > 10) {
            ultimaPosicion = posicionActual;
            window.scrollTo({
              top: posicionActual,
              behavior: 'smooth'
            });
          }
        }

        contador++;
        // Se detiene después de 25 intentos (2.5 segundos), tiempo suficiente para que cargue todo
        if (contador > 25) {
          clearInterval(vigilanteScroll);
        }
      }, 100);

      return () => clearInterval(vigilanteScroll);

    } else {
      // Si cambiamos de ruta sin # hash (ej: ir a /portafolio), subimos al tope instantáneamente
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}