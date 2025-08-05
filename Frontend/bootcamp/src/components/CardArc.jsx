import React from 'react';
import Cards from './Cards';

const getArcPosition = (index, totalCards) => {
  const totalAngle = 80;
  const startAngle = -totalAngle / 2;
  const angleStep = totalAngle / (totalCards - 1);
  const currentAngle = startAngle + (angleStep * index);
  const radius = 150;
  const radians = (currentAngle * Math.PI) / 180;
  const x = Math.sin(radians) * radius;
  const y = Math.cos(radians) * radius;
  const rotation = currentAngle * 0.7;
  const centerIndex = (totalCards - 1) / 2;
  const distanceFromCenter = Math.abs(index - centerIndex);
  const baseZIndex = 10;
  const zIndex = baseZIndex + (totalCards - distanceFromCenter);
  
  return {
    transform: `translate(${x}px, ${-Math.abs(y)}px) rotate(${rotation}deg)`,
    zIndex: zIndex
  };
};

const CardArc = ({ cards, usedCards, onCardSelect }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="relative flex justify-center items-end" style={{ width: '400px', height: '180px' }}>
        {cards.slice(0, 8).map((card, index) => {
          const isUsed = usedCards?.includes(index);
          const arcPosition = getArcPosition(index, 8);
          
          return (
            <div
              key={`${card.id}-${index}`}
              className={`absolute transition-all duration-300 ease-out ${
                !isUsed ? 'cursor-pointer' : 'cursor-not-allowed'
              }`}
              style={{
                transform: arcPosition.transform,
                zIndex: isUsed ? 1 : arcPosition.zIndex,
                transformOrigin: 'center bottom'
              }}
              onClick={!isUsed ? () => onCardSelect(card, index) : undefined}
            >
              <div 
                className={`transition-all duration-300 ease-out ${
                  !isUsed ? 'hover:scale-125 hover:-translate-y-12 hover:z-50 hover:drop-shadow-2xl' : ''
                }`}
                style={{
                  zIndex: 'inherit'
                }}
              >
                <Cards 
                  card={card} 
                  size="small" 
                  isUsed={isUsed}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardArc;
