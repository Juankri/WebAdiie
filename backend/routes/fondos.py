from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from flask_jwt_extended import jwt_required
# Asegúrate de importar la conexión a tu BD como lo haces en tus otros archivos
from database import db 

fondos_bp = Blueprint('fondos', __name__)

# 1. LEER FONDOS (Ruta pública para que el Hero las muestre)
@fondos_bp.route('/api/fondos_hero', methods=['GET'])
def obtener_fondos():
    try:
        fondos_cursor = db.fondos_hero.find()
        lista_fondos = []
        for fondo in fondos_cursor:
            fondo['_id'] = str(fondo['_id'])
            lista_fondos.append(fondo)
        return jsonify(lista_fondos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 2. CREAR UN FONDO NUEVO (Ruta protegida para tu cuñado)
@fondos_bp.route('/api/fondos_hero', methods=['POST'])
@jwt_required()
def agregar_fondo():
    try:
        datos = request.json
        nuevo_fondo = {
            "url": datos.get("url"), # La URL de Cloudinary
            "posicion": datos.get("posicion", "center") # 'center' por defecto
        }
        resultado = db.fondos_hero.insert_one(nuevo_fondo)
        return jsonify({"mensaje": "Fondo guardado", "id": str(resultado.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 3. ELIMINAR UN FONDO (Ruta protegida)
@fondos_bp.route('/api/fondos_hero/<id>', methods=['DELETE'])
@jwt_required()
def eliminar_fondo(id):
    try:
        resultado = db.fondos_hero.delete_one({"_id": ObjectId(id)})
        if resultado.deleted_count > 0:
            return jsonify({"mensaje": "Fondo eliminado"}), 200
        return jsonify({"error": "Fondo no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500