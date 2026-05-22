import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar las variables secretas del archivo .env
load_dotenv()

try:
    MONGO_URI = os.getenv("MONGO_URI")
    cliente_mongo = MongoClient(MONGO_URI)
    db = cliente_mongo["estudio_adiie"]
    print("¡Conexión a MongoDB exitosa! 🚀")
except Exception as e:
    print(f"Error conectando a la base de datos: {e}")
    db = None