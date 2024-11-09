import React from 'react';

// Componente LoginButton que renderiza un botón para iniciar sesión en Spotify
const LoginButton = () => {
    
    // Función loguear que se encarga de redirigir al usuario a la página de autenticación de Spotify
    const loguear = () => {
        // Identificador del cliente de Spotify
        const clientId = '04643427ed9b42b89908b0411a595003';
        // URL a la que se redirigirá al usuario después de la autenticación
        const redirectUrl = 'http://localhost:5173/';
        // Alcance de los permisos solicitados para la autenticación
        const alcance = "user-read-recently-played";
        
        // Construcción de la URL de autenticación de Spotify
        const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUrl}&scope=${alcance}`;
        // Redirigir al usuario a la URL de autenticación
        window.location.href = url;
    }

    // Renderizado del botón de inicio de sesión
    return <button onClick={loguear}>Iniciar sesión</button>
};

export default LoginButton;