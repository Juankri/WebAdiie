from flask import Flask, render_template, request
from flask_mail import Mail, Message
import os # Para manejar variables de entorno de forma segura
import resend

app = Flask(__name__)



resend.api_key = os.environ.get('RESEND_API_KEY')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/portafolio')
def portafolio():
    return render_template('portafolio.html')

@app.route('/galeria_planos_venta')
def galeria_planos_venta():
    return render_template('galeria_planos_venta.html')

@app.route('/galeria_proyectos')
def galeria_proyectos():
    return render_template('galeria_proyectos.html')

@app.route('/proyecto01')
def proyecto01():
    return render_template('proyecto01.html')

@app.route('/proyecto02')
def proyecto02():
    return render_template('proyecto02.html')



@app.route('/galeria_diseños_personalizados')
def galeria_diseños_personalizados():
    return render_template('galeria_diseños_personalizados.html')

@app.route('/diseño_personalizado01')
def diseño_personalizado01():
    return render_template('diseño_personalizado01.html')

@app.route('/diseño_personalizado02')
def diseño_personalizado02():
    return render_template('diseño_personalizado02.html')

@app.route('/diseño_personalizado03')
def diseño_personalizado03():
    return render_template('diseño_personalizado03.html')

@app.route('/diseño_personalizado04')
def diseño_personalizado04():
    return render_template('diseño_personalizado04.html')

@app.route('/diseño_personalizado05')
def diseño_personalizado05():
    return render_template('diseño_personalizado05.html')

@app.route('/diseño_personalizado06')
def diseño_personalizado06():
    return render_template('diseño_personalizado06.html')

@app.route('/diseño_personalizado07')
def diseño_personalizado07():
    return render_template('diseño_personalizado07.html')

@app.route('/diseño_personalizado08')
def diseño_personalizado08():
    return render_template('diseño_personalizado08.html')

@app.route('/en_construccion')
def en_construccion():
    return render_template('en_construccion.html')






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
