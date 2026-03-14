import { createContext, useState } from 'react';

// 1. Creamos el "Espacio de Memoria" CON UN PARACAÍDAS POR DEFECTO 🪂
export const CarritoContext = createContext({
    carrito: [], 
    agregarAlCarrito: () => {}, 
    eliminarDelCarrito: () => {}, 
    vaciarCarrito: () => {}
});

// 2. Creamos el "Proveedor" (El que reparte la información a toda la app)
export const CarritoProvider = ({ children }) => {
    
    // Nuestro estado global: empieza como un arreglo vacío []
    const [carrito, setCarrito] = useState([]);

    // Función para agregar un servicio (ej: "Diseño de Baño")
    const agregarAlCarrito = (servicio) => {
        // Copiamos lo que ya había en el carrito y le sumamos el nuevo servicio
        setCarrito([...carrito, servicio]);
        console.log("Agregado al carrito:", servicio);
    };

    // Función para quitar un servicio si el cliente se arrepiente
    const eliminarDelCarrito = (nombreServicio) => {
        const nuevoCarrito = carrito.filter(item => item.titulo !== nombreServicio);
        setCarrito(nuevoCarrito);
    };

    // Función para vaciar el carrito después de enviar el correo
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    // 3. Empaquetamos todo para que cualquier componente pueda usarlo
    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};