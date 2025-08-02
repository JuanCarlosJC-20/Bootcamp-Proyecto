// src/components/CardGrid.jsx
import React, { useEffect, useState } from 'react';
import CardItem from './Cards';

const CardGrid = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5084/api/Cards') // cambia esto por tu endpoint real
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Error al cargar cartas:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {cards.map(card => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;