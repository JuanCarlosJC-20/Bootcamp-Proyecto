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
        top: '5%', 
        right: '530px',
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
          padding: 6%;
        }
      `}</style>
      
      <div className="card-stack">
        {playedCards.map((playedCard, index) => (
          <div
            key={`${playedCard.playerId}-${index}`}
            className="stacked-card"
            style={{
              transform: `rotate(${15 + (index * 3)}deg) translate(${index * 1.5}px, ${index * -1.5}px)`,
              zIndex: getZIndex() + index,
            }}
          >
            <div className="card-stack-glow">
              <Cards 
                card={playedCard} 
                size="large"
                className="transform scale-50"
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;