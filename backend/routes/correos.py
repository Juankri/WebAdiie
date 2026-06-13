import os
import resend
from flask import Blueprint, request, jsonify

# Configuramos Resend
resend.api_key = os.getenv("RESEND_API_KEY")

formularios_bp = Blueprint('formularios_bp', __name__)

@formularios_bp.route('/api/enviar-formulario-express', methods=['POST'])
def enviar_formulario_express():
    try:
        # Extraer los textos
        data = request.form
        nombre = data.get('nombre', 'Sin nombre')
        
        # Construimos el cuerpo HTML profesional (Resend ama el HTML)
        html_content = f"""
        <h1>🚀 Nuevo Servicio Express: {nombre}</h1>
        <p>Has recibido un nuevo formulario de diseño.</p>
        <ul>
            <li><strong>Cliente:</strong> {nombre}</li>
            <li><strong>WhatsApp:</strong> {data.get('whatsapp')}</li>
            <li><strong>Espacio:</strong> {data.get('tipoEspacio')}</li>
            <li><strong>Medidas:</strong> {data.get('medidas')}</li>
        </ul>
        <p>Revisa los archivos adjuntos en la plataforma de Resend.</p>
        """

        # Preparamos los adjuntos (si existen)
        attachments = []
        for key in ['fotos', 'croquis', 'inspiracion']:
            if key in request.files:
                file = request.files[key]
                if file.filename != '':
                    # Resend requiere el contenido en base64 o binario
                    attachments.append({
                        "filename": file.filename,
                        "content": list(file.read()) 
                    })

        # Disparamos el correo
        params = {
            "from": "onboarding@resend.dev", # Nota: Resend requiere dominio verificado para usar tu correo real
            "to": "juancri687@gmail.com",
            "subject": f"Nuevo Proyecto Express: {nombre}",
            "html": html_content,
            "attachments": attachments
        }

        resend.Emails.send(params)

        return jsonify({'mensaje': 'Formulario enviado con éxito vía Resend'}), 200

    except Exception as e:
        print(f"Error con Resend: {e}")
        return jsonify({'error': 'No se pudo enviar el correo'}), 500