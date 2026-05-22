from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from bson.objectid import ObjectId
from database import db

disenos_bp = Blueprint('disenos', __name__)
disenos_collection = db["disenos"]

@disenos_bp.route('/api/disenos', methods=['POST'])
@jwt_required()
def crear_diseno():
    try:
        datos = request.json
        nuevo_diseno = {
            "titulo": datos.get("titulo"),
            "descripcion": datos.get("descripcion"),
            "imagen_url": datos.get("imagen_url"),
            "galeria": datos.get("galeria", []),
            "video_url": datos.get("video_url", "")
        }
        resultado = disenos_collection.insert_one(nuevo_diseno)
        return jsonify({"mensaje": "¡Diseño guardado!", "id": str(resultado.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@disenos_bp.route('/api/disenos', methods=['GET'])
def obtener_todos_los_disenos():
    try:
        disenos_cursor = disenos_collection.find()
        lista_disenos = []
        for diseno in disenos_cursor:
            diseno['_id'] = str(diseno['_id']) 
            lista_disenos.append(diseno)
        return jsonify(lista_disenos), 200
    except Exception as e:
        print("Error Obteniendo diseño:", str(e))
        return jsonify({"error": str(e)}), 500

@disenos_bp.route('/api/disenos/<id>', methods=['GET'])
def obtener_diseno(id):
    try:
        diseno = disenos_collection.find_one({"_id": ObjectId(id)})
        if diseno:
            diseno['_id'] = str(diseno['_id'])
            return jsonify(diseno), 200
        return jsonify({"error": "Diseño no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@disenos_bp.route('/api/disenos/<id>', methods=['DELETE'])
@jwt_required()
def eliminar_diseno(id):
    try:
        resultado = disenos_collection.delete_one({"_id": ObjectId(id)})
        if resultado.deleted_count > 0:
            return jsonify({"mensaje": "Diseño eliminado"}), 200
        return jsonify({"error": "No se encontró el diseño"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@disenos_bp.route('/api/disenos/<id>', methods=['PUT'])
@jwt_required()
def editar_diseno(id):
    try:
        datos = request.json
        resultado = disenos_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {
                "titulo": datos.get("titulo"),
                "descripcion": datos.get("descripcion"),
                "imagen_url": datos.get("imagen_url"),
                "galeria": datos.get("galeria", []),
                "video_url": datos.get("video_url", "")
            }}
        )
        if resultado.matched_count > 0:
            return jsonify({"mensaje": "¡Diseño actualizado!"}), 200
        return jsonify({"error": "No se encontró el diseño"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500