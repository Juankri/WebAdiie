from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import resend
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId

# Cargar las variables secretas del archivo .env
load_dotenv()

app = Flask(__name__)
CORS(app) # Esto le da permiso a React para pedirle datos a Python

# ---------------------------------------------------------
# 1. CONEXIÓN A LA BASE DE DATOS MONGODB
# ---------------------------------------------------------
try:
    MONGO_URI = os.getenv("MONGO_URI")
    cliente_mongo = MongoClient(MONGO_URI)
    db = cliente_mongo["estudio_adiie"]
    proyectos_collection = db["proyectos"]
    print("¡Conexión a MongoDB exitosa! 🚀")
except Exception as e:
    print(f"Error conectando a la base de datos: {e}")

# ---------------------------------------------------------
# 2. CONFIGURACIÓN DE RESEND (CORREOS)
# ---------------------------------------------------------
resend.api_key = os.environ.get('RESEND_API_KEY')

# ---------------------------------------------------------
# 3. RUTAS DE LA APLICACIÓN (API)
# ---------------------------------------------------------

@app.route('/')
def home():
    return "¡Backend funcionando al 100%!"

@app.route('/api/test-db', methods=['GET'])
def test_db():
    try:
        cantidad = proyectos_collection.count_documents({})
        return {"mensaje": "¡Conexión perfecta con MongoDB!", "proyectos_actuales": cantidad}, 200
    except Exception as e:
        return {"error": str(e)}, 500

@app.route('/api/proyectos', methods=['POST'])
def crear_proyecto():
    try:
        datos = request.json
        nuevo_proyecto = {
            "titulo": datos.get("titulo"),
            "descripcion": datos.get("descripcion"),
            "imagen_url": datos.get("imagen_url"),
            "galeria": datos.get("galeria", []), # Recibe la lista de fotos
            "video_url": datos.get("video_url", "") # Recibe el link de YouTube
        }
        resultado = proyectos_collection.insert_one(nuevo_proyecto)
        return jsonify({"mensaje": "¡Proyecto completo guardado!", "id": str(resultado.inserted_id)}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/api/proyectos', methods=['GET'])
def obtener_todos_los_proyectos():
    try:
        # Buscamos todos los proyectos en la base de datos
        proyectos_cursor = proyectos_collection.find()
        
        lista_proyectos = []
        for proyecto in proyectos_cursor:
            # Convertimos el ID raro a texto normal
            proyecto['_id'] = str(proyecto['_id']) 
            lista_proyectos.append(proyecto)
            
        # Devolvemos la lista completa a React
        return jsonify(lista_proyectos), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

    

@app.route('/api/proyectos/<id>', methods=['GET'])
def obtener_proyecto(id):
    try:
        # Buscamos UN solo proyecto que coincida con ese ID
        proyecto = proyectos_collection.find_one({"_id": ObjectId(id)})
        
        if proyecto:
            # Convertimos el ID raro a texto normal para que React lo entienda
            proyecto['_id'] = str(proyecto['_id'])
            return jsonify(proyecto), 200
        else:
            return jsonify({"error": "Proyecto no encontrado"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app.route('/api/proyectos/<id>', methods=['DELETE'])
def eliminar_proyecto(id):
    try:
        # Intentamos borrar el proyecto que coincida con ese ID
        resultado = proyectos_collection.delete_one({"_id": ObjectId(id)})
        
        if resultado.deleted_count > 0:
            return jsonify({"mensaje": "Proyecto eliminado correctamente"}), 200
        else:
            return jsonify({"error": "No se encontró el proyecto para eliminar"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/api/proyectos/<id>', methods=['PUT'])
def editar_proyecto(id):
    try:
        datos = request.json
        # Usamos $set para actualizar solo los campos que enviamos
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
            return jsonify({"mensaje": "¡Proyecto actualizado con éxito!"}), 200
        else:
            return jsonify({"error": "No se encontró el proyecto"}), 404
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/api/contacto', methods=['POST'])
def contacto():
    print("Recibiendo datos del formulario de contacto...")
    datos = request.json
    nombre = datos.get('nombre')
    correo = datos.get('email')
    mensaje = datos.get('mensaje')

    try:
        print("Enviando con Resend API...")
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": "juancri687@gmail.com", 
            "subject": f"Nuevo Cliente Web: {nombre}",
            "html": f"""
                <h3>Nuevo Contacto desde Adiie.cl</h3>
                <p><strong>Cliente:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {correo}</p>
                <p><strong>Mensaje:</strong></p>
                <blockquote style="background: #f1f1f1; padding: 10px;">{mensaje}</blockquote>
            """,
            "reply_to": correo
        })
        return jsonify({"status": "success", "mensaje": "Mensaje enviado correctamente"}), 200
    except Exception as e:
        print(f"Error al enviar el correo: {e}")
        return jsonify({"status": "error", "mensaje": str(e)}), 500

@app.route('/api/enviar-cotizacion', methods=['POST'])
def enviar_cotizacion():
    try:
        datos = request.json
        nombre = datos.get('nombre', 'Sin Nombre')
        correo = datos.get('correo', 'Sin Correo')
        mensaje = datos.get('mensaje', 'Sin mensaje adicional')
        servicios = datos.get('servicios', [])

        lista_html = ""
        for item in servicios:
            lista_html += f"""
            <li style="margin-bottom: 10px;">
                <strong>{item.get('titulo')}</strong><br>
                Estilo: {item.get('estilo')} | Metros: {item.get('metros')} m²
            </li>
            """

        cuerpo_correo = f"""
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #D4AF37;">Nueva Cotización de Servicio Express</h2>
            <p><strong>Cliente:</strong> {nombre}</p>
            <p><strong>Correo:</strong> {correo}</p>
            <p><strong>Mensaje del cliente:</strong> {mensaje}</p>
            <hr>
            <h3>Espacios seleccionados ({len(servicios)}):</h3>
            <ul>{lista_html}</ul>
            <hr>
            <p><small>Este mensaje fue enviado desde el Carrito de E-Design de EstudioAdiie.</small></p>
        </div>
        """

        params = {
            "from": "onboarding@resend.dev",
            "to": ["juancri687@gmail.com"],
            "subject": f"Nueva Cotización Express de {nombre}",
            "html": cuerpo_correo
        }

        resend.Emails.send(params)
        return jsonify({'mensaje': 'Cotización procesada y correo enviado'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ---------------------------------------------------------
# 4. ARRANQUE DE LA APLICACIÓN
# ---------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)