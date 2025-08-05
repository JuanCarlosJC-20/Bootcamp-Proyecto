import React from 'react';

const GameHeader = ({ 
  currentRound, 
  selectedAttribute, 
  currentPlayer, 
  showLaunchAnimation, 
  timeLeft, 
  onExitClick 
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] border border-[#2196f3] mx-1 mt-1 shadow-lg">
        <div className="flex justify-between items-center px-3 py-1">
          <button
            onClick={onExitClick}
            className="bg-gray-700 hover:bg-gray-800 text-white p-1 rounded text-lg"
          >
            🏠
          </button>
          
          <div className="text-center text-white">
            <div className="text-sm font-bold">
              Ronda {currentRound} | Atributo: <span className="text-yellow-300">{selectedAttribute}</span>
              {currentPlayer && !showLaunchAnimation && (
                <span className="ml-2">| Turno: <span className="text-yellow-300">{currentPlayer.namePlayer}</span></span>
              )}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded text-white font-bold text-xs">
            ⏰ {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;
