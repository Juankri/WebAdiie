import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';





const MySwal = withReactContent(Swal); // Esto prepara la librería para usarla en React

const FormularioProyectoExpress = () => {
  // 1. ESTADO PARA CONTROLAR EN QUÉ PASO ESTAMOS (Del 1 al 4)
  const [pasoActual, setPasoActual] = useState(1);

  const [bloqueoFantasma, setBloqueoFantasma] = useState(false);

  // 2. ESTADO PARA GUARDAR TODAS LAS RESPUESTAS DEL CLIENTE
  const [datosFormulario, setDatosFormulario] = useState({
    nombre: '',
    whatsapp: '',
    tipoEspacio: '',
    estadoActual: '',
    medidas: '',
    altura: '',
    elementosInamovibles: '',
    estilo: '',
    colores: '',
    actividades: '',
    mueblesConservar: '',
    fotos: null,
    croquis: null,
    inspiracion: null
  });

  // 3. FUNCIONES PARA AVANZAR Y RETROCEDER
  const siguientePaso = () => {
    setBloqueoFantasma(true); // 🛡️ Levantamos el escudo protector
    setPasoActual((prev) => prev + 1);
    
    // 🛡️ Bajamos el escudo medio segundo después (500 milisegundos)
    setTimeout(() => {
      setBloqueoFantasma(false);
    }, 500); 
  };
  const pasoAnterior = () => setPasoActual((prev) => prev - 1);

  // 4. FUNCIÓN PARA GUARDAR LO QUE EL CLIENTE ESCRIBE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
  };

  // Función especial para manejar la subida de archivos (imágenes)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setDatosFormulario({ ...datosFormulario, [name]: files[0] });
  };

  
  // Función final para cuando le dan al botón "Enviar a mi Arquitecto"
  // Función final para cuando le dan al botón "Enviar a mi Arquitecto"
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛡️ SI EL ESCUDO ESTÁ ARRIBA, IGNORAMOS EL CLIC EN SILENCIO
    if (bloqueoFantasma) {
      return; 
    }

    // 1. Si estamos en los pasos 1, 2 o 3, solo avanzamos
    if (pasoActual < 4) {
      siguientePaso();
      return;
    }

    // 2. CANDADO DE ARCHIVOS
    if (!datosFormulario.fotos || !datosFormulario.croquis) {
      MySwal.fire({
        title: '¡Faltan las imágenes!',
        text: 'Para que el arquitecto pueda trabajar, es obligatorio subir las fotos actuales y el croquis.',
        icon: 'warning',
        iconColor: '#dc3545',
        confirmButtonText: 'Subir archivos',
        confirmButtonColor: '#0B2126'
      });
      return;
    }

    // --- NUEVO: PREPARAR LOS DATOS PARA EL BACKEND ---
    // Usamos FormData porque tenemos archivos (imágenes), no podemos usar JSON normal.
    const formData = new FormData();
    formData.append('nombre', datosFormulario.nombre);
    formData.append('whatsapp', datosFormulario.whatsapp);
    formData.append('tipoEspacio', datosFormulario.tipoEspacio);
    formData.append('estadoActual', datosFormulario.estadoActual);
    formData.append('medidas', datosFormulario.medidas);
    formData.append('altura', datosFormulario.altura);
    formData.append('elementosInamovibles', datosFormulario.elementosInamovibles);
    formData.append('estilo', datosFormulario.estilo);
    formData.append('colores', datosFormulario.colores);
    formData.append('actividades', datosFormulario.actividades);
    formData.append('mueblesConservar', datosFormulario.mueblesConservar);
    
    // Adjuntamos los archivos
    formData.append('fotos', datosFormulario.fotos);
    formData.append('croquis', datosFormulario.croquis);
    if (datosFormulario.inspiracion) {
      formData.append('inspiracion', datosFormulario.inspiracion);
    }

    // Mostramos un mensaje de "Enviando..." para que el usuario espere
    MySwal.fire({
      title: 'Enviando proyecto...',
      text: 'Estamos subiendo tus archivos de forma segura.',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading(); // Muestra el spinner de carga
      }
    });

    try {
      // 3. ENVIAMOS AL BACKEND EN PYTHON
      // (Cambia el localhost por la URL de tu backend en Render cuando lo subas)
      const respuesta = await fetch('http://localhost:5000/api/enviar-formulario-express', {
        method: 'POST',
        body: formData, // Mandamos la caja con las fotos y datos
      });

      if (respuesta.ok) {
        // --- ALERTA MODERNA DE ÉXITO ---
        MySwal.fire({
          title: '¡Proyecto Recibido!',
          text: 'Tu arquitecto ya tiene toda la información para empezar a trabajar.',
          icon: 'success',
          iconColor: '#D4AF37',             
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#0B2126',    
          background: '#f9f9f9',            
          backdrop: `rgba(11, 33, 38, 0.4)`,
          customClass: { title: 'fs-4' }
        }).then((result) => {
          if (result.isConfirmed) {
             window.location.href = "/"; // Redirige al inicio
          }
        });
      } else {
        throw new Error('Error en el servidor');
      }

    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: 'Hubo un problema',
        text: 'No pudimos enviar tu formulario. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonColor: '#0B2126'
      });
    }
  };

  // Calculamos el porcentaje de la barra de progreso
  const porcentajeProgreso = (pasoActual / 4) * 100;

  return (
    <div style={{marginTop:'150px'}} className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          
          <div className="card shadow-lg border-0" style={{ borderRadius: '15px' }}>
            <div className="card-header text-white text-center py-4" style={{ backgroundColor: '#0B2126', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
              <h3 className="mb-0" style={{ color: '#D4AF37', fontFamily: "'Montserrat', sans-serif" }}>
                Detalles de tu Proyecto Express
              </h3>
              <p className="mb-0 mt-2" style={{ fontSize: '14px' }}>Paso {pasoActual} de 4</p>
            </div>

            <div className="card-body p-4 p-md-5">
              
              {/* BARRA DE PROGRESO BOOTSTRAP */}
              <div className="progress mb-4" style={{ height: '10px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated" 
                  role="progressbar" 
                  style={{ width: `${porcentajeProgreso}%`, backgroundColor: '#D4AF37' }}
                  aria-valuenow={porcentajeProgreso} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>

              {/* FORMULARIO */}
              <form onSubmit={handleSubmit}>
                
                {/* --- PASO 1: INFO GENERAL --- */}
                {pasoActual === 1 && (
                  <div className="animation-fade-in">
                    <h5 className="mb-4" style={{ color: '#0B2126', fontWeight: 'bold' }}>1. Información General</h5>
                    <div className="mb-3">
                      <label className="form-label">Nombre Completo</label>
                      <input type="text" className="form-control" name="nombre" value={datosFormulario.nombre} onChange={handleChange} placeholder="Ej: Juan Pérez" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">WhatsApp (Para contacto rápido)</label>
                      <input type="tel" className="form-control" name="whatsapp" value={datosFormulario.whatsapp} onChange={handleChange} placeholder="+56 9 1234 5678" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">¿Qué espacio vamos a transformar?</label>
                      <select className="form-select" name="tipoEspacio" value={datosFormulario.tipoEspacio} onChange={handleChange} required>
                        <option value="">Selecciona una opción...</option>
                        <option value="Quincho">Quincho / Terraza</option>
                        <option value="Living">Living / Comedor</option>
                        <option value="Dormitorio">Dormitorio</option>
                        <option value="Cocina">Cocina</option>
                        <option value="Baño">Baño</option>
                        <option value="Local Comercial">Local Comercial</option>
                        <option value="Otro">Otro espacio</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Estado actual del espacio</label>
                      <select className="form-select" name="estadoActual" value={datosFormulario.estadoActual} onChange={handleChange} required>
                        <option value="">Selecciona una opción...</option>
                        <option value="Vacio">Vacío / Obra nueva</option>
                        <option value="Obra Bruta">En construcción / Obra bruta</option>
                        <option value="Amoblado">Amoblado (Remodelación total)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* --- PASO 2: MEDIDAS Y TÉCNICO --- */}
                {pasoActual === 2 && (
                  <div className="animation-fade-in">
                    <h5 className="mb-4" style={{ color: '#0B2126', fontWeight: 'bold' }}>2. Medidas y Aspectos Técnicos</h5>
                    <div className="mb-3">
                      <label className="form-label">Medidas aproximadas (Largo x Ancho)</label>
                      <input type="text" className="form-control" name="medidas" value={datosFormulario.medidas} onChange={handleChange} placeholder="Ej: 4 metros x 3 metros" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Altura aproximada del techo</label>
                      <input type="text" className="form-control" name="altura" value={datosFormulario.altura} onChange={handleChange} placeholder="Ej: 2.4 metros" required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">¿Existen elementos inamovibles?</label>
                      <small className="d-block text-muted mb-2">Ej: Columnas en el medio, cañerías que no se pueden mover, ventanas grandes.</small>
                      <textarea className="form-control" name="elementosInamovibles" value={datosFormulario.elementosInamovibles} onChange={handleChange} rows="3" placeholder="Describe los elementos aquí..."></textarea>
                    </div>
                  </div>
                )}

                {/* --- PASO 3: FUNCIONALIDAD Y ESTILO --- */}
                {pasoActual === 3 && (
                  <div className="animation-fade-in">
                    <h5 className="mb-4" style={{ color: '#0B2126', fontWeight: 'bold' }}>3. Funcionalidad y Estilo Visual</h5>
                    <div className="mb-3">
                      <label className="form-label">¿Qué estilo visual te atrae más?</label>
                      <select className="form-select" name="estilo" value={datosFormulario.estilo} onChange={handleChange} required>
                        <option value="">Selecciona una opción...</option>
                        <option value="Minimalista">Minimalista</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Moderno">Moderno</option>
                        <option value="Rustico">Rústico / Madera</option>
                        <option value="Nordico">Nórdico</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">¿Cuáles son tus colores favoritos (y cuáles odias)?</label>
                      <input type="text" className="form-control" name="colores" value={datosFormulario.colores} onChange={handleChange} placeholder="Ej: Me gusta el blanco y madera, odio el rojo" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">¿Qué actividades principales se harán aquí?</label>
                      <textarea className="form-control" name="actividades" value={datosFormulario.actividades} onChange={handleChange} rows="2" placeholder="Ej: Es un quincho pero quiero usarlo para hacer home office de día" required></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="form-label">¿Tienes muebles actuales que debamos conservar en el diseño?</label>
                      <input type="text" className="form-control" name="mueblesConservar" value={datosFormulario.mueblesConservar} onChange={handleChange} placeholder="Ej: Sí, un sofá gris de 2 metros." />
                    </div>
                  </div>
                )}

                {/* --- PASO 4: EVIDENCIA VISUAL --- */}
                {pasoActual === 4 && (
                  <div className="animation-fade-in">
                    <h5 className="mb-4" style={{ color: '#0B2126', fontWeight: 'bold' }}>4. Evidencia Visual</h5>
                    <div className="alert alert-warning" style={{ backgroundColor: '#fff3cd', borderColor: '#ffe69c', color: '#664d03' }}>
                      <i className="bi bi-info-circle me-2"></i><strong>Importante:</strong> ¡No tienen que ser profesionales! Una foto clara con tu celular es suficiente para que trabajemos.
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Sube fotos del espacio actual</label>
                      <small className="d-block text-muted mb-2">Te sugerimos fotos desde las 4 esquinas de la habitación.</small>
                      <input className="form-control" type="file" name="fotos" onChange={handleFileChange} multiple />
                    </div>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Sube un croquis o plano a mano</label>
                      <small className="d-block text-muted mb-2">Dibuja un cuadrado en un papel, marca dónde están las puertas/ventanas y pon las medidas. ¡Tómale foto y súbelo!</small>
                      <input className="form-control" type="file" name="croquis" onChange={handleFileChange} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw-bold">Imágenes de Inspiración (Opcional)</label>
                      <small className="d-block text-muted mb-2">Capturas de pantalla de Pinterest, Instagram o Google de cosas que te gustarían.</small>
                      <input className="form-control" type="file" name="inspiracion" onChange={handleFileChange} multiple />
                    </div>
                  </div>
                )}

                {/* BOTONES DE NAVEGACIÓN */}
                <div className="d-flex justify-content-between mt-5 border-top pt-4">
                  {pasoActual > 1 ? (
                    <button type="button" className="btn btn-outline-secondary px-4" onClick={pasoAnterior}>
                      <i className="bi bi-arrow-left me-2"></i> Atrás
                    </button>
                  ) : (
                    <div></div> /* Div vacío para mantener el botón "Siguiente" a la derecha usando justify-content-between */
                  )}

                  {pasoActual < 4 ? (
                    <button type="button" className="btn px-4 shadow-sm" style={{ backgroundColor: '#D4AF37', color: '#0B2126', fontWeight: 'bold' }} onClick={siguientePaso}>
                      Siguiente <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button type="submit" className="btn px-4 shadow-sm" style={{ backgroundColor: '#0B2126', color: '#D4AF37', fontWeight: 'bold' }}>
                      <i className="bi bi-check2-circle me-2"></i> Enviar Detalles a mi Arquitecto
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FormularioProyectoExpress;