from flask import Flask, render_template, request
from flask_mail import Mail, Message
import os # Para manejar variables de entorno de forma segura
import resend

app = Flask(__name__)



resend.api_key = os.environ.get('RESEND_API_KEY')

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
    print("📩 Recibiendo datos del formulario...")
    
    # 1. Capturar datos
    nombre = request.form.get('nombre')
    correo = request.form.get('correo')
    mensaje = request.form.get('mensaje')

    try:
        print("🚀 Enviando con Resend API...")
        
        # 2. Enviar el correo (¡Es una sola función, adiós timeout!)
        r = resend.Emails.send({
            "from": "onboarding@resend.dev",  # Correo temporal de envío (luego ponemos tu dominio)
            "to": "juancri687@gmail.com",     # <--- AQUÍ TE LLEGA A TI
            "subject": f"Nuevo Cliente Web: {nombre}",
            "html": f"""
                <h3>Nuevo Contacto desde Adiie.cl</h3>
                <p><strong>Cliente:</strong> {nombre}</p>
                <p><strong>Correo:</strong> {correo}</p>
                <p><strong>Mensaje:</strong></p>
                <blockquote style="background: #f1f1f1; padding: 10px;">{mensaje}</blockquote>
            """,
            "reply_to": correo  # Esto permite que le respondas directo al cliente
        })
        
        print(f"✅ Éxito! ID del correo: {r.get('id')}")
        
        # 3. Retorno inmediato
        return render_template('gracias.html') # O 'gracias.html' si la tienes

    except Exception as e:
        print(f"❌ Error fatal: {e}")
        return f"Hubo un error enviando el mensaje: {e}"
    

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
