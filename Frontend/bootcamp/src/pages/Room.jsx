import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import flecha from '../assets/flecha.svg'

export const Room = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Nombres de meses en español
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  // Función para generar nombres aleatorios con formato mes + año
  const generateRandomNames = (count) => {
    const names = [];
    const usedCombinations = new Set();
    
    while (names.length < count) {
      // Seleccionar mes aleatorio
      const randomMonth = monthNames[Math.floor(Math.random() * monthNames.length)];
      
      // Generar año aleatorio entre 2000 y 3000
      const randomYear = Math.floor(Math.random() * 1001) + 2000;
      
      // Crear la combinación
      const combination = `${randomMonth}${randomYear}`;
      
      // Verificar que no se repita
      if (!usedCombinations.has(combination)) {
        usedCombinations.add(combination);
        names.push(combination);
      }
    }
    
    return names;
  };

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleMaxPlayersChange = (e) => {
    setMaxPlayers(e.target.value);
  };

  const handleCreateRoom = async () => {
    if (roomName.trim() === '') {
      alert('Por favor ingresa un nombre para la sala');
      return;
    }
    
    if (maxPlayers === '') {
      alert('Por favor selecciona el número máximo de jugadores');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 1. Crear la sala
      const roomData = {
        RoomName: roomName.trim(),
        NumPlayers: parseInt(maxPlayers)
      };

      console.log('Creando sala:', roomData);

      const roomResponse = await fetch('http://localhost:5084/api/Room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData)
      });

      if (!roomResponse.ok) {
        const errorText = await roomResponse.text();
        throw new Error(`Error al crear sala: ${roomResponse.status} - ${roomResponse.statusText}. ${errorText}`);
      }

      const createdRoom = await roomResponse.json();
      console.log('Sala creada:', createdRoom);

      // 2. Crear el juego asociado a la sala
      const gameData = {
        GameTime: new Date().toISOString(),
        IdPlayerWinner: 0,
        IdRoom: createdRoom.id
      };

      console.log('Creando juego:', gameData);

      const gameResponse = await fetch('http://localhost:5084/api/Game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData)
      });

      if (!gameResponse.ok) {
        const errorText = await gameResponse.text();
        throw new Error(`Error al crear juego: ${gameResponse.status} - ${gameResponse.statusText}. ${errorText}`);
      }

      const createdGame = await gameResponse.json();
      console.log('Juego creado:', createdGame);

      // 3. Crear los jugadores con nombres aleatorios (mes + año)
      const playerNames = generateRandomNames(parseInt(maxPlayers));
      const players = [];

      for (let i = 0; i < playerNames.length; i++) {
        const playerData = {
          NamePlayer: playerNames[i],
          IdGame: createdGame.id
        };

        console.log(`Creando jugador ${i + 1}:`, playerData);

        const playerResponse = await fetch('http://localhost:5084/api/Player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(playerData)
        });

        if (!playerResponse.ok) {
          const errorText = await playerResponse.text();
          throw new Error(`Error al crear jugador ${i + 1}: ${playerResponse.status} - ${errorText}`);
        }

        const createdPlayer = await playerResponse.json();
        players.push(createdPlayer);
        console.log(`Jugador ${i + 1} creado:`, createdPlayer);
      }

      console.log('Todos los jugadores creados:', players);
      
      alert(`Sala "${roomName}" creada exitosamente con ${maxPlayers} jugadores`);
      
      // 4. Navegar a la página del juego con todos los datos
      navigate('/game', { 
        state: { 
          room: createdRoom,
          game: createdGame,
          players: players
        } 
      });
      
    } catch (error) {
      console.error('Error en el proceso de creación:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* Botón de regreso */}
      <div className="gap-4 flex flex-col items-start p-4">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer py-2 bg-[#980E0E] rounded-r-2xl hover:bg-[#7A0B0B] transition w-25 flex items-center justify-center"
        >
          <img src={flecha} alt="Flecha" className="w-20 h-auto mr-2" />
        </button>
      </div>

      {/* Contenido principal centrado */}
      <div className='flex-1 flex items-center justify-center p-4 pt-0'>
        <div className='w-full max-w-lg text-center -mt-8'>
          
          {/* Título */}
          <h1 className='text-white text-5xl font-bold mb-16'>
            Registra tu partida
          </h1>

          {/* Campo nombre de la sala */}
          <div className='mb-12'>
            <label className='text-white text-2xl font-bold block mb-6 text-left'>
              Ingrese El Nombre De La Sala
            </label>
            <input
              type="text"
              value={roomName}
              onChange={handleRoomNameChange}
              placeholder="Nombre De La Sala"
              className="w-full p-4 rounded-2xl bg-gray-300 text-gray-600 text-lg placeholder-gray-500 focus:outline-none focus:bg-white transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Campo cantidad de jugadores */}
          <div className='mb-16'>
            <label className='text-white text-2xl font-bold block mb-6 text-left'>
              Ingrese El Número Máximo De Jugadores
            </label>
            <select
              value={maxPlayers}
              onChange={handleMaxPlayersChange}
              disabled={isLoading}
              className="w-full p-4 rounded-2xl bg-gray-300 text-gray-500 text-lg focus:outline-none focus:bg-white transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 1rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="" disabled>Cantidad De Jugadores</option>
              <option value="2">2 Jugadores</option>
              <option value="3">3 Jugadores</option>
              <option value="4">4 Jugadores</option>
              <option value="5">5 Jugadores</option>
              <option value="6">6 Jugadores</option>
              <option value="7">7 Jugadores</option>
            </select>
          </div>

          {/* Botón crear sala */}
          <button
            onClick={handleCreateRoom}
            disabled={isLoading}
            className={`text-white text-2xl font-bold py-4 px-16 rounded-2xl transition-colors duration-300 ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-[#059669] hover:bg-[#047857]'
            }`}
          >
            {isLoading ? 'Creando...' : 'Crear Sala'}
          </button>

        </div>
      </div>
    </div>
  );
};