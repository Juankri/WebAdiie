from flask import Blueprint, request, jsonify
import os
import resend

correos_bp = Blueprint('correos', __name__)

# Configurar Resend
resend.api_key = os.environ.get('RESEND_API_KEY')

@correos_bp.route('/api/contacto', methods=['POST'])
def contacto():
    print("Recibiendo datos del formulario de contacto...")
    datos = request.json
    nombre = datos.get('nombre')
    correo = datos.get('email')
    mensaje = datos.get('mensaje')

    try:
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
        return jsonify({"status": "success", "mensaje": "Mensaje enviado"}), 200
    except Exception as e:
        return jsonify({"status": "error", "mensaje": str(e)}), 500

@correos_bp.route('/api/enviar-cotizacion', methods=['POST'])
def enviar_cotizacion():
    try:
        datos = request.json
        nombre = datos.get('nombre', 'Sin Nombre')
        correo = datos.get('correo', 'Sin Correo')
        mensaje = datos.get('mensaje', 'Sin mensaje adicional')
        servicios = datos.get('servicios', [])

        lista_html = ""
        for item in servicios:
            lista_html += f"""
            <li style="margin-bottom: 10px;">
                <strong>{item.get('titulo')}</strong><br>
                Estilo: {item.get('estilo')} | Metros: {item.get('metros')} m²
            </li>
            """

        cuerpo_correo = f"""
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #D4AF37;">Nueva Cotización de Servicio Express</h2>
            <p><strong>Cliente:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Mensaje del cliente:</strong> {mensaje}</p>
            <hr>
            <h3>Espacios seleccionados ({len(servicios)}):</h3>
            <ul>{lista_html}</ul>
        </div>
        """

        resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": ["juancri687@gmail.com"],
            "subject": f"Nueva Cotización Express de {nombre}",
            "html": cuerpo_correo
        })
        return jsonify({'mensaje': 'Cotización procesada y correo enviado'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500