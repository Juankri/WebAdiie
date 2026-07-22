from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from database import db
from extensions import bcrypt

auth_bp = Blueprint('auth', __name__)



@auth_bp.route('/api/login', methods=['POST'])
def login():
    datos = request.json
    # 1. Buscamos por "email" en vez de "usuario"
    user_en_db = db.usuarios.find_one({"email": datos.get('email')})

    if user_en_db and bcrypt.check_password_hash(user_en_db['password'], datos.get('password')):
        # 2. El token ahora guardará el correo del administrador
        token = create_access_token(identity=datos.get('email'))
        return jsonify({"token": token}), 200
    
    return jsonify({"error": "Correo o clave incorrectos"}), 401