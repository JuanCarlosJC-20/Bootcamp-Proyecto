import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedAttribute, setSelectedAttribute] = useState('ATAQUE');

  // Obtener datos de la navegación
  useEffect(() => {
    if (location.state) {
      setGameData(location.state);
      console.log('Datos del juego recibidos:', location.state);
    } else {
      // Si no hay datos, redirigir al home
      navigate('/home');
    }
  }, [location, navigate]);

  // Timer para el tiempo restante
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Función para posicionar jugadores en círculo
  const getPlayerPosition = (index, total) => {
    const positions = {
      2: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { bottom: '10%', left: '50%', transform: 'translateX(-50%)' } // Abajo centro
      ],
      3: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { bottom: '20%', left: '20%' }, // Abajo izquierda
        { bottom: '20%', right: '20%' } // Abajo derecha
      ],
      4: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { left: '10%', top: '50%', transform: 'translateY(-50%)' }, // Izquierda centro
        { right: '10%', top: '50%', transform: 'translateY(-50%)' }, // Derecha centro
        { bottom: '10%', left: '50%', transform: 'translateX(-50%)' } // Abajo centro
      ],
      5: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { top: '25%', left: '15%' }, // Arriba izquierda
        { top: '25%', right: '15%' }, // Arriba derecha
        { bottom: '25%', left: '15%' }, // Abajo izquierda
        { bottom: '25%', right: '15%' } // Abajo derecha
      ],
      6: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { top: '25%', left: '15%' }, // Arriba izquierda
        { top: '25%', right: '15%' }, // Arriba derecha
        { left: '10%', top: '50%', transform: 'translateY(-50%)' }, // Izquierda centro
        { right: '10%', top: '50%', transform: 'translateY(-50%)' }, // Derecha centro
        { bottom: '10%', left: '50%', transform: 'translateX(-50%)' } // Abajo centro
      ],
      7: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' }, // Arriba centro
        { top: '20%', left: '20%' }, // Arriba izquierda
        { top: '20%', right: '20%' }, // Arriba derecha
        { left: '10%', top: '45%', transform: 'translateY(-50%)' }, // Izquierda centro
        { right: '10%', top: '45%', transform: 'translateY(-50%)' }, // Derecha centro
        { bottom: '20%', left: '25%' }, // Abajo izquierda
        { bottom: '20%', right: '25%' } // Abajo derecha
      ]
    };
    
    return positions[total]?.[index] || { top: '50%', left: '50%' };
  };

  if (!gameData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#060E42] to-[#475BDF]">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  const { players } = gameData;

  return (
    <div className="h-screen bg-gradient-to-b from-[#060E42] to-[#475BDF] relative overflow-hidden">
      
      {/* ESTO VA EN EL HEAD MEJOR JAJAJ */}

      {/* Header con información del juego - Estilo exacto de la imagen */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="bg-[#1565c0] border-4 border-[#2196f3] rounded-b-2xl mx-4 mt-4">
          <div className="flex justify-between items-center px-6 py-3">
            {/* Botón home */}
            <button
              onClick={() => navigate('/home')}
              className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded-lg transition-colors"
            >
              🏠
            </button>
            
            {/* Texto central */}
            <div className="text-center text-white">
              <div className="text-lg font-bold">
                Atributos a jugar: {selectedAttribute}
              </div>
            </div>
            
            {/* Tiemplo */}
            <div className="text-center">
              <div className="bg-orange-500 px-4 py-1 rounded-full text-white font-bold">
                TIEMPO: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área principal del juego */}
      <div className="pt-24 h-full relative">

        {/* Jugadores posicionados alrededor */}
        {players.map((player, index) => {
          const position = getPlayerPosition(index, players.length);
          const isFirstPlayer = index === 0; // El primer jugador es destacado
          
          return (
            <div
              key={player.id}
              className="absolute"
              style={position}
            >
              <div className={`flex flex-col items-center ${isFirstPlayer ? 'scale-110' : ''}`}>
                {/* Avatar del jugador */}
                <div className={`rounded-full border-4 ${
                  isFirstPlayer 
                    ? 'border-yellow-400 bg-yellow-100' 
                    : 'border-white bg-gray-200'
                } p-2 mb-2 shadow-lg`}>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {player.namePlayer.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                
                {/* Nombre del jugador */}
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                  isFirstPlayer 
                    ? 'bg-yellow-400 text-black' 
                    : 'bg-white text-black'
                } shadow-md`}>
                  {player.namePlayer}
                </div>
                
                {/* Badge de "Primero" si aplica */}
                {isFirstPlayer && (
                  <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full mt-1 font-semibold">
                    #1 Primero
                  </div>
                )}

                {/* Placeholder para la carta del jugador */}
                <div className="mt-2 bg-white rounded-lg shadow-md w-16 h-20 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Carta</span>
                </div>
              </div>
            </div>
          );
        })}
        

        {/* Indicador de ronda en la esquina inferior derecha */}
        <div className="absolute bottom-4 right-4 bg-purple-600 border-4 border-purple-400 text-white px-4 py-2 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="text-sm font-semibold">Ronda</div>
            <div className="text-2xl font-bold">{currentRound}</div>
          </div>
        </div>

        
      </div>
    </div>
  );
};