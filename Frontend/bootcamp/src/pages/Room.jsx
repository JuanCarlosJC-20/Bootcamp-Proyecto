import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import flecha from '../assets/flecha.svg'

export const Room = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); 

  useEffect(() => {
    if (mensaje && tipoMensaje === 'error') {
      const timer = setTimeout(() => {
        setMensaje('');
        setTipoMensaje('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, tipoMensaje]);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleMaxPlayersChange = (e) => {
    setMaxPlayers(e.target.value);
  };

  const handleCreateRoom = async () => {
    if (roomName.trim() === '') {
      setMensaje('Por favor ingresa un nombre para la sala');
      setTipoMensaje('error');
      return;
    }
    
    if (maxPlayers === '') {
      setMensaje('Por favor selecciona el número máximo de jugadores');
      setTipoMensaje('error');
      return;
    }
    
    setIsLoading(true);
    setMensaje(''); 
    
    try {
      const roomData = {
        roomName: roomName.trim(),
        numPlayers: parseInt(maxPlayers)
      };

      console.log('Creando sala completa:', roomData);

      //const response = await fetch('https://localhost:5084/api/Room/create-complete-room', {
      const response = await fetch('https://localhost:7221/api/Room/create-complete-room', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear sala: ${response.status} - ${response.statusText}. ${errorText}`);
      }

      const result = await response.json();
      console.log('Sala completa creada:', result);
      
      setMensaje(`Sala "${roomName}" creada exitosamente con ${maxPlayers} jugadores`);
      setTipoMensaje('success');
      
      setTimeout(() => {
        navigate('/game', { 
          state: { 
            room: result.room,
            game: result.game,
            players: result.players
          } 
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error al crear la sala:', error);
      setMensaje(`Error: ${error.message}`);
      setTipoMensaje('error');
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

      <div className='flex-1 flex items-center justify-center p-4 pt-0'>
        <div className='w-full max-w-lg text-center -mt-8'>
          
          {/* Título */}
          <h1 className='text-white text-5xl font-bold mb-16'>
            Registra tu partida
          </h1>

          {/* Mensaje de estado */}
          {mensaje && (
            <div className={`mb-6 p-4 rounded-2xl text-center font-semibold text-lg transition-all duration-300 ${
              tipoMensaje === 'success' 
                ? 'bg-green-500/20 border-2 border-green-400 text-green-100' 
                : 'bg-red-500/20 border-2 border-red-400 text-red-100'
            }`}>
              {mensaje}
            </div>
          )}

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