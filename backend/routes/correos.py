import os
import resend
from flask import Blueprint, request, jsonify
from database import db
from datetime import datetime

# Configuramos Resend
resend.api_key = os.getenv("RESEND_API_KEY")

correos_bp = Blueprint('correos_bp', __name__)

@correos_bp.route('/api/enviar-formulario-express', methods=['POST'])
def enviar_formulario_express():
    try:
        # Extraer los textos
        data = request.form
        nombre = data.get('nombre', 'Sin nombre')

        orden_id = request.form.get('orden_id', '')
        
        # Construimos el cuerpo HTML profesional (Resend ama el HTML)
        html_content = f"""
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #0B2126;">🚀 Nuevo Servicio Express: {nombre}</h2>
            
            <h3 style="color: #D4AF37; border-bottom: 1px solid #ddd; padding-bottom: 5px;">1. Contacto</h3>
            <ul>
                <li><strong>Cliente:</strong> {nombre}</li>
                <li><strong>WhatsApp:</strong> {data.get('whatsapp', 'No indicado')}</li>
                <li><strong>Orden ID:</strong> {orden_id}</li>
            </ul>

            <h3 style="color: #D4AF37; border-bottom: 1px solid #ddd; padding-bottom: 5px;">2. Detalles del Espacio</h3>
            <ul>
                <li><strong>Espacio:</strong> {data.get('tipoEspacio', '')}</li>
                <li><strong>Estado Actual:</strong> {data.get('estadoActual', '')}</li>
                <li><strong>Medidas:</strong> {data.get('medidas', '')}</li>
                <li><strong>Altura Techo:</strong> {data.get('altura', '')}</li>
                <li><strong>Elementos Inamovibles:</strong> {data.get('elementosInamovibles', 'Ninguno')}</li>
            </ul>

            <h3 style="color: #D4AF37; border-bottom: 1px solid #ddd; padding-bottom: 5px;">3. Diseño y Estilo</h3>
            <ul>
                <li><strong>Estilo preferido:</strong> {data.get('estilo', '')}</li>
                <li><strong>Colores:</strong> {data.get('colores', '')}</li>
                <li><strong>Actividades:</strong> {data.get('actividades', '')}</li>
                <li><strong>Muebles a conservar:</strong> {data.get('mueblesConservar', 'Ninguno')}</li>
            </ul>
            
            <p style="margin-top: 20px; font-weight: bold;">Adjuntos a este correo encontrarás las fotos, el croquis y la inspiración.</p>
        </div>
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

        if orden_id and orden_id != 'Venta Directa / Sin Orden':
            db.comprobantes.update_one(
                {"orden_id": str(orden_id)},
                {"$set": {
                    "formulario_completado": True,
                    "fecha_formulario": datetime.now() # Opcional: guardamos cuándo mandó las fotos
                }}
            )

        return jsonify({'mensaje': 'Formulario enviado con éxito vía Resend'}), 200

    except Exception as e:
        print(f"Error con Resend: {e}")
        return jsonify({'error': 'No se pudo enviar el correo'}), 500