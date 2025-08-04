import React from 'react';
import Cards from './Cards';

const CardStack = ({ playedCards, showCardDetail = false, showLaunchAnimation = false }) => {
  if (!playedCards || playedCards.length === 0) {
    return null;
  }

  // Determinar el z-index basado en el estado del juego
  const getZIndex = () => {
    if (showCardDetail || showLaunchAnimation) {
      return 5; // Al fondo cuando hay otras interfaces activas
    }
    return 30; // Nivel medio cuando no hay interferencias
  };

  return (
    <div 
      className="fixed left-1/2 transform -translate-x-1/2"
      style={{ 
        top: '45%', 
        transform: 'translate(-50%, -50%)',
        zIndex: getZIndex()
      }}
    >
      <style>{`
        .card-stack {
          position: relative;
        }
        
        .stacked-card {
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: center center;
        }
        
        .card-stack-glow {
          border-radius: 12px;
          padding: 1px;
        }
      `}</style>
      
      <div className="card-stack">
        {playedCards.map((playedCard, index) => (
          <div
            key={`${playedCard.playerId}-${index}`}
            className="stacked-card"
            style={{
              transform: `rotate(${70 + (index * 3)}deg) translate(${index * 1.5}px, ${index * -1.5}px)`,
              zIndex: getZIndex() + index,
            }}
          >
            <div className="card-stack-glow">
              <Cards 
                card={playedCard} 
                size="small"
                className="transform scale-90"
              />
            </div>
            
            {/* Indicador del jugador - solo en la carta superior */}
            {index === playedCards.length - 1 && (
              <div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold bg-black bg-opacity-80 px-2 py-1 rounded-full shadow-lg"
                style={{ 
                  transform: `translate(-50%, 0) rotate(${-(70 + (index * 3))}deg)`,
                  zIndex: getZIndex() + index + 1
                }}
              >
                {playedCard.playerName}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;