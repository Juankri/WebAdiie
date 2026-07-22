from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from database import db
from extensions import bcrypt

auth_bp = Blueprint('auth', __name__)



@auth_bp.route('/api/login', methods=['POST'])
def login():
    datos = request.json
    user_en_db = db.usuarios.find_one({"usuario": datos.get('usuario')})

    if user_en_db and bcrypt.check_password_hash(user_en_db['password'], datos.get('password')):
        # Entregamos el token si la contraseña hace "match"
        token = create_access_token(identity=datos.get('usuario'))
        return jsonify({"token": token}), 200
    
    return jsonify({"error": "Usuario o clave incorrectos"}), 401