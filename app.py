from flask import Flask, render_template, request
from flask_mail import Mail, Message
import os # Para manejar variables de entorno de forma segura
from threading import Thread # 1. Importar Threading

app = Flask(__name__)

def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
            print(" Enviado async")
        except Exception as e:
            print(f" Error async: {e}")

# --- Configuración de Flask-Mail ---
# Es MUY RECOMENDABLE usar variables de entorno para no exponer tus credenciales.
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
# Reemplaza con tu correo y la contraseña de aplicación que generarás en el paso 3.
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

# Inicializa la extensión Mail
mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/galeria_proyectos')
def galeria_proyectos():
    return render_template('galeria_proyectos.html')

@app.route('/proyecto01')
def proyecto01():
    return render_template('proyecto01.html')

@app.route('/proyecto02')
def proyecto02():
    return render_template('proyecto02.html')



@app.route('/galeria_planos')
def galeria_planos():
    return render_template('galeria_planos.html')

@app.route('/plano01')
def plano01():
    return render_template('plano01.html')

@app.route('/plano02')
def plano02():
    return render_template('plano02.html')

@app.route('/plano03')
def plano03():
    return render_template('plano03.html')

@app.route('/plano04')
def plano04():
    return render_template('plano04.html')

@app.route('/plano05')
def plano05():
    return render_template('plano05.html')

@app.route('/plano06')
def plano06():
    return render_template('plano06.html')

@app.route('/plano07')
def plano07():
    return render_template('plano07.html')

@app.route('/plano08')
def plano08():
    return render_template('plano08.html')






@app.route('/contacto', methods=['POST'])
def contacto():
    nombre = request.form['nombre']
    correo = request.form['correo']
    mensaje = request.form['mensaje']

    # Usamos un bloque try...except para manejar posibles errores al enviar el correo
    #try:
        # Creamos el cuerpo del correo
    msg = Message(
            subject=f"Nuevo Mensaje de Contacto de {nombre}",
            sender=app.config['MAIL_USERNAME'],
            recipients=[app.config['MAIL_USERNAME']] # El correo se envía a ti mismo
        )
    msg.body = f"""
        Has recibido un nuevo mensaje desde tu página web.
    
        De: {nombre}
        Correo: {correo}
        
        Mensaje:
        {mensaje}
        """
    mail.send(msg)

    # 3. Lanzar hilo
    Thread(target=send_async_email, args=(app, msg)).start()
    
    # 4. Responder al usuario ya
    return render_template('gracias.html')

print("hola")
        
        # Si el correo se envía con éxito, mostramos la página de agradecimiento
    #return render_template('gracias.html', nombre=nombre, correo=correo)
    
    #except Exception as e:
        # Si ocurre un error, lo imprimimos en la consola para saber qué pasó
        #print(f"Error al enviar el correo: {e}")
        # Y le mostramos al usuario un mensaje de error claro.
        # (Opcional: podrías crear una plantilla HTML para la página de error)
        #return "Ocurrió un error al intentar enviar tu mensaje. Por favor, verifica que las credenciales del correo estén bien configuradas en el servidor. Revisa la consola para más detalles."
       

if __name__ == '__main__':
    app.run(debug=True)
