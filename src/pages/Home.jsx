// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = ({ token }) => {
    const [tracks, setTracks] = useState([]); // Estado para almacenar las canciones
    const [ratings, setRatings] = useState({}); // Estado para almacenar las puntuaciones

    useEffect(() => {
        // Función asíncrona para obtener las canciones recientemente reproducidas
        const fetchTracks = async () => {
            try {
                // Realizar una solicitud GET a la API de Spotify para obtener las canciones recientemente reproducidas
                const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                    headers: {
                        // Incluir el token de autenticación en los headers de la solicitud
                        Authorization: `Bearer ${token}`
                    }
                });
                // Actualizar el estado 'tracks' con los datos obtenidos
                setTracks(response.data.items);
            } catch (error) {
                // Manejo de errores: imprimir el error en la consola
                console.error("Error al obtener canciones", error);
            }
        };

        // Ejecutar la función fetchTracks cuando el componente se monta o el token cambia
        fetchTracks();
    }, [token]);

    // Función para manejar la puntuación de una canción específica
    // Esta función actualiza el estado 'ratings' con la puntuación asignada a una canción identificada por su 'trackId'
    const handleRating = (trackId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [trackId]: rating
        }));
    };

    return (
        <div className="home-container">
            {/* Contenedor de la barra de navegación */}
            <div className='navbar-container'>
                <div className='navbar-logo'>Spotify</div>
                {/* Botón para volver a la página principal */}
                <button className='navbar-button' onClick={() => window.location.href = '/'}>Volver</button>
            </div>
            {/* Título para las canciones recientemente escuchadas */}
            <h2>Tus canciones escuchadas recientemente</h2>
            <div>
                {/* Mapeo de las canciones para mostrar información y puntuaciones */}
                {tracks.map((track) => (
                    <div className="song-item" key={track.track.id}>
                        <div>
                            {/* Título de la canción */}
                            <h3>{track.track.name}</h3>
                            {/* Artistas de la canción */}
                            <p>{track.track.artists.map(artist => artist.name).join(', ')}</p>
                        </div>
                        <div>
                            {/* Mostrar la puntuación actual de la canción */}
                            <p>Puntuación: {ratings[track.track.id] || 'Sin puntuar'}</p>
                            {/* Botones para puntuar la canción */}
                            {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                    key={rating}
                                    className="rating-button"
                                    onClick={() => handleRating(track.track.id, rating)}
                                >
                                    {rating}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
