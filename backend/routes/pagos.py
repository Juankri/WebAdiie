import os
import resend
import mercadopago
from flask import Blueprint, request, jsonify
from database import db
from datetime import datetime

pagos_bp = Blueprint('pagos', __name__)

# Configuración de llaves (Idealmente mueve el token de MP a tu .env pronto)
sdk = mercadopago.SDK("APP_USR-4673614381035123-052217-9598653dccc9cc17eb3e5e69027e16b0-3421390750")
resend.api_key = os.getenv("RESEND_API_KEY")

@pagos_bp.route('/api/crear_preferencia', methods=['POST'])
def crear_preferencia():
    data = request.json

    correo_real = data.get("correo")
    nombre_real = data.get("nombre")
    
    preference_data = {
        "items": [
            {
                "title": data.get("titulo", "Servicio Express Arquitectura"),
                "quantity": 1,
                "unit_price": float(data.get("precio", 0))
            }
        ],
        "payer": {
            "name": nombre_real,
            "email": correo_real
        },
        "external_reference": correo_real,
        "back_urls": {
            "success": "https://webadiie-1.onrender.com/pago-exitoso",
            "failure": "https://webadiie-1.onrender.com/pago-fallido",
            "pending": "https://webadiie-1.onrender.com/pago-pendiente"
        },
        "auto_return": "approved",
        
        # 👇 1. LE AVISAMOS A MERCADO PAGO DÓNDE ESTÁ NUESTRO WEBHOOK
        # IMPORTANTE: Cambia "tu-backend" por el link real de tu backend en Render
        "notification_url": "https://webadiie-backend.onrender.com/api/webhook-pagos"
    }

    print("====== ENVIANDO DATOS A MP ======")
    try:
        result = sdk.preference().create(preference_data)
        if result["status"] in [200, 201]:
            return jsonify({
                "id": result["response"]["id"], 
                "init_point": result["response"]["init_point"]
            }), 200
        else:
            return jsonify({"error": "Mercado Pago rechazó la petición", "detalle": result["response"]}), 400
            
    except Exception as e:
        print(f"Error interno en Python: {str(e)}")
        return jsonify({"error": "Hubo un problema en el servidor"}), 500


# ==========================================
# 👇 2. NUEVA RUTA: EL RECEPTOR INVISIBLE (WEBHOOK)
# ==========================================
@pagos_bp.route('/api/webhook-pagos', methods=['POST'])
def webhook_pagos():
    try:
        data = request.json
        
        if data and data.get("type") == "payment":
            payment_id = data.get("data", {}).get("id")
            
            payment_info = sdk.payment().get(payment_id)
            payment = payment_info["response"]
            
            if payment.get("status") == "approved":
                # 🌟 AQUÍ ESTÁ EL TRUCO: Extraemos el correo real que guardamos en la preferencia
                email_cliente_real = payment.get("external_reference")
                orden_id = str(payment.get("id")) # Lo pasamos a texto por seguridad
                
                # 🛡️ 1. CREAMOS EL COMPROBANTE EN LA BASE DE DATOS
                # Si la colección "comprobantes" no existe, Mongo la crea en este exacto instante.
                comprobante = {
                    "orden_id": orden_id,
                    "email_cliente": email_cliente_real,
                    "estado_pago": "aprobado",
                    "formulario_completado": False, # <--- Este es el candado clave
                    "fecha_pago": datetime.now()
                }
                
                # Buscamos si ya existe para no duplicar (Mercado Pago a veces manda avisos dobles)
                existe = db.comprobantes.find_one({"orden_id": orden_id})
                if not existe:
                    db.comprobantes.insert_one(comprobante)
                    
                    # 2. Disparamos el correo solo si es la primera vez
                    if email_cliente_real:
                        enviar_link_formulario(email_cliente_real, orden_id)
                
        return jsonify({"status": "ok"}), 200

    except Exception as e:
        print(f"Error en el webhook: {e}")
        return jsonify({"error": "Error interno"}), 500


# ==========================================
# 👇 3. FUNCIÓN PARA MANDAR EL CORREO CON RESEND
# ==========================================
def enviar_link_formulario(email_cliente, orden_id):
    # Armamos el link dinámico apuntando a tu frontend
    link_formulario = f"https://webadiie-1.onrender.com/formularioproyectoexpress?orden={orden_id}"
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; color: #0B2126;">
        <h2 style="color: #D4AF37;">¡Pago Exitoso! Bienvenido al Estudio Adiie</h2>
        <p>Hemos recibido correctamente tu pago (Orden #{orden_id}).</p>
        <p>Tu arquitecto está listo para empezar. Por favor, haz clic en el siguiente botón para enviarnos las medidas y fotos de tu espacio:</p>
        <a href="{link_formulario}" style="display: inline-block; padding: 12px 24px; background-color: #0B2126; color: #D4AF37; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 15px;">
            Ir al Formulario del Proyecto
        </a>
    </div>
    """

    params = {
        "from": "onboarding@resend.dev", 
        "to": email_cliente,
        "subject": f"Siguiente paso: Detalles de tu Diseño Express (Orden #{orden_id})",
        "html": html_content
    }

    try:
        resend.Emails.send(params)
        print(f"¡Link enviado con éxito a {email_cliente} para la orden {orden_id}!")
    except Exception as e:
        print(f"Error enviando correo Resend: {e}")



@pagos_bp.route('/api/validar-orden/<payment_id>', methods=['GET'])
def validar_orden(payment_id):
    try:
        # 1. Buscamos el comprobante en nuestra base de datos
        orden = db.comprobantes.find_one({"orden_id": str(payment_id)})
        
        if not orden:
            return jsonify({
                "valido": False, 
                "error": "Esta orden no existe en nuestros registros de pago."
            }), 404
            
        # 2. Revisamos el candado (Si ya se completó el formulario)
        if orden.get("formulario_completado") == True:
            return jsonify({
                "valido": False, 
                "error": "Este enlace ya fue utilizado para enviar un proyecto. Si necesitas otro diseño, debes generar una nueva cotización."
            }), 403
            
        # 3. Si existe y el formulario es 'False', le damos luz verde a React
        return jsonify({
            "valido": True, 
            "mensaje": "Orden válida"
        }), 200
        
    except Exception as e:
        print(f"Error validando orden en BD: {e}")
        return jsonify({"valido": False, "error": "Error interno del servidor"}), 500