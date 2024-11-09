import React, { useState, useEffect } from 'react'
import '../src/styles/App.css'
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Obtener el hash de la URL actual
    const hash = window.location.hash;
    // Si hay un hash, extraer el token de acceso
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get('access_token');
      // Establecer el token en el estado
      setToken(token);
      // Limpiar el hash de la URL para evitar que se vuelva a ejecutar
      window.location.hash = '';
    }
  }, []);


  // Esta línea de código decide qué componente renderizar basado en el estado del token.
  // Si el token es verdadero, se renderiza el componente Home, pasando el token como prop.
  // Si el token es falso, se renderiza el componente Login.
  return token ? <Home token={token} /> : <Login />;
}

export default App
