from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

# Inicializamos las herramientas vacías, luego las conectamos en app.py
jwt = JWTManager()
bcrypt = Bcrypt()