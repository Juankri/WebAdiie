from flask import Blueprint, request, jsonify
import mercadopago

pagos_bp = Blueprint('pagos', __name__)

# 👇 Pon tu token de prueba aquí (el que empieza con TEST-)
sdk = mercadopago.SDK("APP_USR-4673614381035123-052217-9598653dccc9cc17eb3e5e69027e16b0-3421390750")

@pagos_bp.route('/api/crear_preferencia', methods=['POST'])
def crear_preferencia():
    data = request.json
    
    # Armamos el carrito EXACTAMENTE como lo pide Mercado Pago
    # Armamos el carrito engañando a Mercado Pago con un https falso
    preference_data = {
        "items": [
            {
                "title": data.get("titulo", "Servicio Express Arquitectura"),
                "quantity": 1,
                "unit_price": float(data.get("precio", 0))
            }
        ],
        "back_urls": {
            "success": "https://webadiie-1.onrender.com/pago-exitoso",
            "failure": "https://webadiie-1.onrender.com/pago-fallido",
            "pending": "https://webadiie-1.onrender.com/pago-pendiente"
        },
        "auto_return": "approved"
    }

    print("====== ENVIANDO DATOS A MP ======")
    print(preference_data)

    try:
        result = sdk.preference().create(preference_data)
        print("RESPUESTA MP:", result)

        if result["status"] in [200, 201]:
            return jsonify({
                "id": result["response"]["id"], 
                "init_point": result["response"]["init_point"]
            }), 200
        else:
            return jsonify({
                "error": "Mercado Pago rechazó la petición", 
                "detalle": result["response"]
            }), 400
            
    except Exception as e:
        print(f"Error interno en Python: {str(e)}")
        return jsonify({"error": "Hubo un problema en el servidor"}), 500