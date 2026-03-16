from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import resend

app = Flask(__name__)
CORS(app) # Esto le da permiso a React para pedirle datos a Python

@app.route('/')
def home():
    return "¡Backend funcionando al 100%!"

resend.api_key = os.environ.get('RESEND_API_KEY')



@app.route('/api/contacto', methods=['POST'])

def contacto():
    print("Recibiendo datos del formulario de contacto...")

    # En React, los datos llegan como JSON, no como Form tradicional
    
    datos= request.json
    nombre= datos.get('nombre')
    correo= datos.get('email')
    mensaje= datos.get('mensaje')

    try:
        print("Enviando con Resend API...")
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": "juancri687@gmail.com", 
            "subject": f"Nuevo Cliente Web: {nombre}",
            "html": f"""
                <h3>Nuevo Contacto desde Adiie.cl</h3>
                <p><strong>Cliente:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {correo}</p>
                <p><strong>Mensaje:</strong></p>
                <blockquote style="background: #f1f1f1; padding: 10px;">{mensaje}</blockquote>
            """,
            "reply_to": correo
        })
        
        print("Correo enviado con exito")
        # Devolvemos un JSON a React diciendo que todo salió bien
        return jsonify({"status": "success", "mensaje": "Mensaje enviado correctamente"}), 200
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        return jsonify({"status": "error", "mensaje": str(e)}), 500
    
# ---------------------------------------------------------
# RUTA 2: FORMULARIO DE SERVICIO EXPRESS
# ---------------------------------------------------------




@app.route('/api/enviar-cotizacion', methods=['POST'])
def enviar_cotizacion():
    try:
        # 1. Recibimos el JSON gigante desde React
        datos = request.json
        
        nombre = datos.get('nombre', 'Sin Nombre')
        correo = datos.get('correo', 'Sin Correo')
        mensaje = datos.get('mensaje', 'Sin mensaje adicional')
        servicios = datos.get('servicios', []) # ¡Esta es la lista del carrito!

        # 2. Armamos la lista de espacios en HTML con un bucle (for)
        lista_html = ""
        for item in servicios:
            lista_html += f"""
            <li style="margin-bottom: 10px;">
                <strong>{item.get('titulo')}</strong><br>
                Estilo: {item.get('estilo')} | Metros: {item.get('metros')} m²
            </li>
            """

        # 3. Construimos el cuerpo del correo en HTML
        cuerpo_correo = f"""
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #D4AF37;">Nueva Cotización de Servicio Express</h2>
            <p><strong>Cliente:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Mensaje del cliente:</strong> {mensaje}</p>
            
            <hr>
            
            <h3>Espacios seleccionados ({len(servicios)}):</h3>
            <ul>
                {lista_html}
            </ul>
            
            <hr>
            <p><small>Este mensaje fue enviado desde el Carrito de E-Design de EstudioAdiie.</small></p>
        </div>
        """

        # 4. Enviamos el correo a través de Resend
        params = {
            "from": "onboarding@resend.dev", # Cambia esto por tu dominio verificado si lo tienes
            "to": ["juancri687@gmail.com"], # Aquí va el correo donde quieres recibir las cotizaciones
            "subject": f"Nueva Cotización Express de {nombre}",
            "html": cuerpo_correo
        }

        email = resend.Emails.send(params)
        print("Correo enviado exitosamente con Resend:", email)

        # 5. Le respondemos a React que todo salió bien
        return jsonify({'mensaje': 'Cotización procesada y correo enviado'}), 200

    except Exception as e:
        print("Error en el backend:", e)
        return jsonify({'error': str(e)}), 500



if __name__ == '__main__':
    # El puerto 5000 es el clásico para Flask
    app.run(debug=True, port=5000)