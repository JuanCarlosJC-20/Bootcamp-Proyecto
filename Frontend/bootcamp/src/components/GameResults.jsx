import React from 'react';
import Cards from './Cards';

const GameResults = ({ playedCards }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
      <div className="bg-green-800 bg-opacity-90 rounded-2xl p-6 border-4 border-green-400 shadow-2xl">
        <h3 className="text-white text-2xl font-bold text-center mb-4">Cartas en Juego</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {playedCards.map((playedCard, index) => (
            <div key={index} className="text-center">
              <Cards card={playedCard} size="medium" />
              <div className="text-white text-sm mt-2 font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
                {playedCard.playerName}
              </div>
              <div className="text-sm mt-1 font-bold px-2 py-1 rounded bg-white text-black">
                {playedCard.attribute}: {playedCard.attributeValue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameResults;
