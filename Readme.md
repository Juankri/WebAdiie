# 🏛️ Estudio Adiie - Plataforma Web y E-commerce de Arquitectura

![Sitio en Vivo](https://www.estudioadiie.cl)

##  Sobre el Proyecto

**Estudio Adiie** es una plataforma Full-Stack de extremo a extremo construida para un estudio de arquitectura real. Supera la funcionalidad de una página estática (Landing Page) al incorporar un **Sistema de Gestión de Contenidos (CMS) personalizado** y un **E-commerce** para la automatización de ventas de "Servicios Express". 

Este proyecto fue desarrollado para resolver necesidades reales de negocio: automatizar las ventas, asegurar los pagos y permitir la autogestión del portafolio sin depender de un desarrollador.

---

##  Características Principales

***Flujo de Ventas Automatizado (Mercado Pago):** Cotizador dinámico que ajusta el precio según los metros cuadrados (m²) y tipo de espacio. Integración directa con SDK de Mercado Pago y Webhooks para confirmación en tiempo real.
*** Panel de Administración (CRUD):** Dashboard privado protegido mediante **JWT (JSON Web Tokens)**. Permite al administrador crear, leer, actualizar y eliminar (CRUD) los proyectos del portafolio.
*** Almacenamiento en la Nube:** Sistema de subida de imágenes conectado a **Cloudinary** para optimizar el peso de los archivos y no sobrecargar el servidor.
*** Correos Transaccionales:** Formularios de contacto y confirmaciones enviados automáticamente mediante la API de **Resend**.
*** Diseño Responsive & UI Premium:** Interfaz construida con **React** y **Bootstrap**, manteniendo un diseño minimalista, corporativo y 100% responsivo.

---

##  Stack Tecnológico

### Frontend
* **React.js** (SPA - Single Page Application)
* **React Router DOM** (Navegación dinámica y Rutas protegidas)
* **Bootstrap 5** & CSS Custom (Diseño UI)

### Backend
* **Python / Flask** (Arquitectura modular utilizando Blueprints)
* **JWT (JSON Web Tokens)** (Autenticación y seguridad de rutas)
* **PyMongo** (Conexión a BD)

### Base de Datos & Infraestructura
* **MongoDB Atlas** (Base de datos NoSQL)
* **Render** (Despliegue del servidor Backend 24/7)
* **Cloudinary** (CDN y gestión de imágenes)
* **Mercado Pago SDK** (Pasarela de pagos)
* **Resend** (Sistema de emailing)

---

## Arquitectura del Sistema

El flujo de información y servicios está estructurado de la siguiente manera:

1. **Cliente a Servidor:** El Frontend (React) consume las APIs creadas en el Backend (Flask).
2. **Sistema de Pagos:** Al iniciar una compra express, el Backend genera una *Preferencia de Pago*. Mercado Pago procesa la transacción y un **Webhook** notifica de vuelta al servidor para confirmar la venta de forma asíncrona.
3. **Gestión de Portafolio:** El administrador inicia sesión (obteniendo un Token JWT). Al subir un nuevo proyecto, la imagen viaja a Cloudinary (obteniendo una URL segura) y los datos de texto (título, descripción, URL de imagen) se guardan en MongoDB Atlas.

---

## 💻 Instalación y Ejecución Local

Si deseas clonar y correr este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio**
Abre tu terminal y ejecuta estos comandos:

git clone [https://github.com/Juankri/WebAdiie.git](https://github.com/Juankri/WebAdiie.git)

cd WebAdiie

2. **Configurar el Backend (Python)**
Entra a la carpeta del backend y crea tu entorno virtual:

cd backend

python -m venv venv

venv\Scripts\activate (Si usas Windows)

pip install -r requirements.txt

**Importante:** Crea un archivo .env en la carpeta del backend con tus credenciales de MongoDB, Mercado Pago, Cloudinary y JWT_SECRET.

**Para iniciar el servidor, ejecuta:**

python app.py

**3. Configurar el Frontend (React)**
Abre una nueva terminal en la raíz de tu proyecto y ejecuta:

cd frontend

npm install

npm run dev

******Desarrollado por Juankri.*******