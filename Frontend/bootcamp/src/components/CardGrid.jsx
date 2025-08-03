// src/components/CardGrid.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CardItem from './Cards';

const CardGrid = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardsPerPage = 8;

  useEffect(() => {
    setIsLoading(true);
   // fetch('http://localhost:5084/api/Cards')
    fetch('https://localhost:7221/api/Cards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar cartas:', err);
        setIsLoading(false);
      });
  }, []);

  // Memoizar las cartas actuales para evitar re-renders innecesarios
  const currentCards = useMemo(() => {
    const startIndex = currentPage * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return cards.slice(startIndex, endIndex);
  }, [cards, currentPage, cardsPerPage]);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsTransitioning(false);
      }, 100);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsTransitioning(false);
      }, 100);
    }
  }, [currentPage]);

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
  }, [handleNextPage, handlePrevPage]);

  return (
    <div className="flex flex-col items-center min-h-screen">
      {/* Loading spinner cuando se cargan las cartas por primera vez */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[500px]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#980E0E] mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando cartas...</p>
        </div>
      ) : (
        <>
          {/* Navigation Header */}
          <div className="flex items-center justify-between w-full max-w-7xl mb-4 px-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 0 || isTransitioning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 0 || isTransitioning
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#980E0E] text-white hover:bg-[#7a0b0b] hover:scale-105'
              }`}
            >
              <span className="text-xl">←</span>
              Anterior
            </button>

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-700">
                Página {currentPage + 1} of {totalPages}
              </span>
              <span className="text-sm text-gray-500">
                ({cards.length} total cartas)
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1 || isTransitioning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage >= totalPages - 1 || isTransitioning
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#980E0E] text-white hover:bg-[#7a0b0b] hover:scale-105'
              }`}
            >
              Siguiente
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Cards Grid con transición suave */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 max-w-6xl transition-opacity duration-300 ${
            isTransitioning ? 'opacity-50' : 'opacity-100'
          }`}>
            {currentCards.map(card => (
              <CardItem key={`${card.id}-${currentPage}`} card={card} />
            ))}
          </div>

          {/* Indicador de puntos de página */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentPage(index);
                      setIsTransitioning(false);
                    }, 100);
                  }
                }}
                disabled={isTransitioning}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? 'bg-[#980E0E] scale-125'
                    : isTransitioning 
                    ? 'bg-gray-200 cursor-not-allowed'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CardGrid;