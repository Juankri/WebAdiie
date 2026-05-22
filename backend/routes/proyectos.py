from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from bson.objectid import ObjectId
from database import db

proyectos_bp = Blueprint('proyectos', __name__)
proyectos_collection = db["proyectos"]

@proyectos_bp.route('/api/proyectos', methods=['POST'])
@jwt_required()
def crear_proyecto():
    try:
        datos = request.json
        nuevo_proyecto = {
            "titulo": datos.get("titulo"),
            "descripcion": datos.get("descripcion"),
            "imagen_url": datos.get("imagen_url"),
            "galeria": datos.get("galeria", []),
            "video_url": datos.get("video_url", "")
        }
        resultado = proyectos_collection.insert_one(nuevo_proyecto)
        return jsonify({"mensaje": "¡Proyecto guardado!", "id": str(resultado.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@proyectos_bp.route('/api/proyectos', methods=['GET'])
def obtener_todos_los_proyectos():
    try:
        proyectos_cursor = proyectos_collection.find()
        lista_proyectos = []
        for proyecto in proyectos_cursor:
            proyecto['_id'] = str(proyecto['_id']) 
            lista_proyectos.append(proyecto)
        return jsonify(lista_proyectos), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@proyectos_bp.route('/api/proyectos/<id>', methods=['GET'])
def obtener_proyecto(id):
    try:
        proyecto = proyectos_collection.find_one({"_id": ObjectId(id)})
        if proyecto:
            proyecto['_id'] = str(proyecto['_id'])
            return jsonify(proyecto), 200
        return jsonify({"error": "Proyecto no encontrado"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@proyectos_bp.route('/api/proyectos/<id>', methods=['DELETE'])
@jwt_required()
def eliminar_proyecto(id):
    try:
        resultado = proyectos_collection.delete_one({"_id": ObjectId(id)})
        if resultado.deleted_count > 0:
            return jsonify({"mensaje": "Proyecto eliminado"}), 200
        return jsonify({"error": "No se encontró el proyecto"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@proyectos_bp.route('/api/proyectos/<id>', methods=['PUT'])
@jwt_required()
def editar_proyecto(id):
    try:
        datos = request.json
        resultado = proyectos_collection.update_one(
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
            return jsonify({"mensaje": "¡Proyecto actualizado!"}), 200
        return jsonify({"error": "No se encontró el proyecto"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500