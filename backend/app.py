from flask import Flask
from flask_cors import CORS
import os
from dotenv import load_dotenv

# 1. Importamos la conexión a BD y las herramientas de seguridad
from database import db
from extensions import jwt, bcrypt

# 2. Importamos nuestras rutas (Blueprints)
from routes.proyectos import proyectos_bp
from routes.disenos import disenos_bp
from routes.correos import correos_bp
from routes.auth import auth_bp
from routes.pagos import pagos_bp
from routes.fondos import fondos_bp

# Cargar variables secretas
load_dotenv()

app = Flask(__name__)
CORS(app) 

# Configuración de Seguridad
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
jwt.init_app(app)
bcrypt.init_app(app)

# 3. Registramos los Blueprints (Unimos las piezas a la app)
app.register_blueprint(proyectos_bp)
app.register_blueprint(disenos_bp)
app.register_blueprint(correos_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(pagos_bp)
app.register_blueprint(fondos_bp)

# Rutas base (Health checks)
@app.route('/')
def home():
    return "¡Backend Arquitectónico funcionando al 100%!"

@app.route('/api/test-db', methods=['GET'])
def test_db():
    try:
        # Usamos db["proyectos"] directamente aquí
        cantidad = db["proyectos"].count_documents({})
        return {"mensaje": "¡Conexión perfecta con MongoDB!", "proyectos_actuales": cantidad}, 200
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)