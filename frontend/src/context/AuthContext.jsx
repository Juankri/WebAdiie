import { createContext, useState } from 'react';

// 1. Creamos el contexto
export const AuthContext = createContext();

// 2. Creamos el proveedor (el que envuelve a la app)
export const AuthProvider = ({ children }) => {
    // El estado inicial revisa si ya hay un token en el navegador
    const [estaLogueado, setEstaLogueado] = useState(!!localStorage.getItem('token_adiie'));

    // Función oficial para iniciar sesión
    const login = (token) => {
        localStorage.setItem('token_adiie', token);
        setEstaLogueado(true); // ¡Esto avisa a toda la app al instante!
    };

    // Función oficial para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token_adiie');
        setEstaLogueado(false); // ¡Avisa a toda la app al instante!
    };

    return (
        <AuthContext.Provider value={{ estaLogueado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};