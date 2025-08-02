
import React from 'react';

const Cards = ({ card }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl w-64 h-96 p-4 flex flex-col items-center justify-between border-4 border-[#980E0E]">
      <img src={card.image} alt={card.name} className="w-32 h-32 object-cover rounded-full border-2 border-gray-300" />
      <h2 className="text-xl font-bold text-center">{card.name}</h2>
      <div className="grid grid-cols-2 gap-2 w-full text-sm text-center">
        <div><strong>Power:</strong> {card.power}</div>
        <div><strong>Damage:</strong> {card.damage}</div>
        <div><strong>Health:</strong> {card.health}</div>
        <div><strong>Endurance:</strong> {card.endurance}</div>
        <div><strong>Level:</strong> {card.letterLevel}</div>
        <div><strong>Scope:</strong> {card.scope}</div>
      </div>
    </div>
  );
};

export default Cards;