// src/components/CardGrid.jsx
import React, { useEffect, useState } from 'react';
import CardItem from './Cards';

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  useEffect(() => {
    fetch('http://localhost:5084/api/Cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Error al cargar cartas:', err));
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, cards.length]);

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Navigation Header */}
      <div className="flex items-center justify-between w-full max-w-6xl mb-6 px-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentPage === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#980E0E] text-white hover:bg-[#7a0b0b] hover:scale-105'
          }`}
        >
          <span className="text-xl">←</span>
          Previous
        </button>

        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-gray-700">
            Page {currentPage + 1} of {totalPages}
          </span>
          <span className="text-sm text-gray-500">
            ({cards.length} total cards)
          </span>
        </div>

        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            currentPage >= totalPages - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-[#980E0E] text-white hover:bg-[#7a0b0b] hover:scale-105'
          }`}
        >
          Next
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 max-w-6xl">
        {currentCards.map(card => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>


      {/* Indicador de puntos de página */}
      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentPage
                ? 'bg-[#980E0E] scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;