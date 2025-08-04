import React from 'react';
import Torre from '../assets/torre.png'

// Posiciones de jugadores
const getPlayerPosition = (index, total) => {
  const positions = {
    
    2: [
      { bottom: '30%', right: '75%' },
      { bottom: '30%', left: '75%' },
    ],
    3: [
      { top: '75%', left: '50%', transform: 'translateX(-50%)' },
      { bottom: '45%', left: '20%' },
      { bottom: '45%', right: '20%' }
    ],
    4: [
      { bottom: '20%', right: '75%' },
      { bottom: '63%', right: '75%' },
      { bottom: '63%', left: '75%' },
      { bottom: '20%', left: '75%' },
    ],
        5: [
      { bottom: '0%', left: '46%'},
      { bottom: '20%', right: '75%' },
      { bottom: '63%', right: '75%' },
      { bottom: '63%', left: '75%' },
      { bottom: '20%', left: '75%' },
    ],
        6: [
      { bottom: '0%', left: '70%'},
      { bottom: '0%', right: '70%' },
      { bottom: '27%', left: '7%' },
      { bottom: '63%', left: '25%' },
      { bottom: '63%', right: '22%' },
      { bottom: '27%', right: '7%' },
    ],
    7: [
      { top: '76%', left: '50%', transform: 'translateX(-50%)' },
      { bottom: '0%', left: '25%' },
      { bottom: '27%', left: '7%' },
      { bottom: '63%', left: '25%' },
      { bottom: '63%', right: '22%' },
      { bottom: '27%', right: '7%' },
      { bottom: '0%', right: '22%' }
    ]
  };
  return positions[total]?.[index] || { top: '50%', left: '50%' };
};

const PlayerIndicators = ({ players, currentPlayerIndex, playedCards }) => {
  return (
    <>
      {players.map((player, index) => {
        const position = getPlayerPosition(index, players.length);
        const isCurrentPlayer = index === currentPlayerIndex;
        const hasPlayedCard = playedCards.some(card => card.playerId === player.id);
        
        return (
          <div key={player.id} className="absolute transition-all duration-500" style={position}>
            <div className={`flex flex-col items-center transition-all duration-300 ${
              isCurrentPlayer ? 'scale-105' : hasPlayedCard ? 'opacity-70 scale-95' : ''
            }`}>
              <div className={`rounded-full border-3 ${
                isCurrentPlayer 
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-xl' 
                  : hasPlayedCard
                  ? 'border-green-400 bg-gradient-to-br from-green-100 to-green-200 shadow-lg'
                  : 'border-white bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg'
              } p-1 mb-1`}>
                <div className="w-25 h-25 rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center shadow-inner">
                  <span className="text-white font-bold text-sm drop-shadow-lg">
                    <img src={Torre}  alt="" />
                  </span>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-all duration-200 ${
                isCurrentPlayer 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' 
                  : hasPlayedCard
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                  : 'bg-white text-black'
              }`}>
                {player.namePlayer}
              </div>
              
              {isCurrentPlayer && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full mt-1 font-semibold shadow-lg animate-pulse">
                  🎯 Su Turno
                </div>
              )}
              
              {hasPlayedCard && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full mt-1 font-semibold shadow-lg">
                  ✅ Jugó
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlayerIndicators;
