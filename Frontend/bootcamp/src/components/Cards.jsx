import React, { useState, useEffect, useCallback } from 'react';

const Cards = ({ 
  card, 
  size = 'large', 
  isSelected = false, 
  isUsed = false, 
  onClick = null, 
  className = '',
  onAttributeClick = null, // Nueva función para manejar clicks en atributos
  selectedAttribute = null // Atributo actualmente seleccionado
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(false);

  // Configuración de tamaños
  const sizes = {
    small: { 
      container: 'w-20 h-28', 
      image: 'w-12 h-12', 
      text: 'text-xs',
      stats: 'text-xs',
      statsGrid: 'grid-cols-1 gap-1'
    },
    medium: { 
      container: 'w-24 h-32', 
      image: 'w-16 h-16', 
      text: 'text-sm',
      stats: 'text-xs',
      statsGrid: 'grid-cols-2 gap-1'
    },
    large: { 
      container: 'w-64 h-96', 
      image: 'w-30 h-50', 
      text: 'text-md',
      stats: 'text-sm',
      statsGrid: 'grid-cols-1 gap-1'
    }
  };

  const currentSize = sizes[size];

  // Múltiples métodos para obtener la imagen de Google Drive
  const getImageUrl = useCallback((url, attempt = 0) => {
    if (!url) return '';

    // Extraer el ID de Google Drive
    const match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (!match) return url;

    const fileId = match[1];
    let finalUrl = '';

    // Diferentes métodos según el intento
    switch (attempt) {
      case 0:
        // Método directo de Google Drive
        finalUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        break;

      case 1:
        // Método alternativo con diferentes parámetros
        finalUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        break;

      case 2:
        // Usando lh3.googleusercontent.com (a veces funciona mejor)
        finalUrl = `https://lh3.googleusercontent.com/d/${fileId}=w400-h400`;
        break;

      default:
        finalUrl = url;
    }

    console.log(`Card ${card.name} - Attempt ${attempt} - URL: ${finalUrl}`);
    return finalUrl;
  }, [card.name]);

  const handleImageError = useCallback(() => {
    console.log('Error loading image for card:', card.name);

    // Intentar con diferentes métodos si el primer intento falla
    if (retryCount < 2) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageError(false);
        setImageLoaded(false);
        setIsImageVisible(false);
      }, 1000);
    } else {
      setImageError(true);
      setImageLoaded(false);
      setIsImageVisible(false);
    }
  }, [card.name, retryCount]);

  // Reset estados cuando cambia la carta
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setIsImageVisible(false);
    setRetryCount(0);
  }, [card.id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
    setTimeout(() => setIsImageVisible(true), 100); // Pequeño delay para transición suave
  };

  const imageUrl = getImageUrl(card.image, retryCount);

  // Placeholder image si todo falla
  const PlaceholderImage = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
      <div className="text-4xl mb-2">🎴</div>
      <div className="text-xs font-semibold text-center px-2">{card.name}</div>
    </div>
  );

  return (
    <div 
      className={`${currentSize.container} ${
        size === 'large' 
          ? 'bg-gradient-to-b from-[#4481B3] to-[#2C8246] border-8 border-black' 
          : 'bg-white border-4 border-[#980E0E]'
      } rounded-xl shadow-xl flex flex-col items-center justify-between ${
        isSelected ? 'border-yellow-400 shadow-2xl' : ''
      } ${isUsed ? 'opacity-50' : 'shadow-lg'} ${
        onClick ? 'cursor-pointer hover:scale-105' : ''
      } transition-all duration-300 transform relative ${className}`}
      onClick={!isUsed && onClick ? () => onClick(card) : undefined}
    >

      {size === 'large' ? (
        <>
          {/* Header para cartas grandes */}
          <div className="flex items-center w-64 h-16 rounded-xl bg-gradient-to-r from-[#B7A5A5] to-[#6C6E72] shadow-md gap-6 mb-2">
            <div className="bg-[#D8C9A3] text-black font-bold px-3 py-1 rounded-xl">
              Lv {card.letterLevel}
            </div>
            <div className="text-white text-md font-bold">
              {card.name}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Header simple para cartas pequeñas/medianas */}
          <h3 className={`${currentSize.text} font-bold text-center text-gray-800 truncate w-full px-1 mt-2`}>
            {card.name}
          </h3>
        </>
      )}
        
      {/* Imagen de la carta */}
      <div className={`${size === 'large' ? 'w-30 h-50' : currentSize.image} rounded-${size === 'large' ? '4xl' : 'full'} border-${size === 'large' ? '4' : '2'} border-${size === 'large' ? 'black' : 'gray-300'} justify-center flex bg-gray-100 relative overflow-hidden`}>
        {!imageError ? (
          <>
            <img
              key={`${card.id}-${retryCount}`}
              src={imageUrl}
              alt={card.name}
              loading="lazy"
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded && isImageVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              referrerPolicy="no-referrer"
            />

            {/* Loading spinner */}
            {(!imageLoaded || !isImageVisible) && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#980E0E]"></div>
              </div>
            )}
          </>
        ) : (
          <PlaceholderImage />
        )}
      </div>

      {/* Estadísticas */}
      {size === 'large' ? (
        <div className="grid grid-cols-1 gap-1 w-full text-sm text-center mt-2 border-4 border-[#932828] rounded-2xl bg-[#D7C39F]">
          <div 
            className={`rounded-lg transition-colors p-1 ${
              onAttributeClick ? 'cursor-pointer hover:bg-red-200' : 'hover:bg-red-200'
            } ${selectedAttribute === 'PODER' ? 'bg-red-500 text-white ring-2 ring-yellow-400' : ''}`}
            onClick={onAttributeClick ? () => onAttributeClick('PODER') : undefined}
          >
            <div className={`font-bold transition-colors ${
              selectedAttribute === 'PODER' ? 'text-white' : 'text-black hover:text-red-700'
            }`}>Poder {card.power}</div>
          </div>
          <div 
            className={`p-1 rounded-lg transition-colors ${
              onAttributeClick ? 'cursor-pointer hover:bg-orange-200' : 'hover:bg-orange-200'
            } ${selectedAttribute === 'ATAQUE' ? 'bg-orange-500 text-white ring-2 ring-yellow-400' : ''}`}
            onClick={onAttributeClick ? () => onAttributeClick('ATAQUE') : undefined}
          >
            <div className={`font-bold transition-colors ${
              selectedAttribute === 'ATAQUE' ? 'text-white' : 'text-black hover:text-orange-700'
            }`}>Ataque {card.damage}</div>
          </div>
          <div 
            className={`p-1 rounded-lg transition-colors ${
              onAttributeClick ? 'cursor-pointer hover:bg-green-200' : 'hover:bg-green-200'
            } ${selectedAttribute === 'SALUD' ? 'bg-green-500 text-white ring-2 ring-yellow-400' : ''}`}
            onClick={onAttributeClick ? () => onAttributeClick('SALUD') : undefined}
          >
            <div className={`font-bold transition-colors ${
              selectedAttribute === 'SALUD' ? 'text-white' : 'text-black hover:text-green-700'
            }`}>Salud {card.health}</div>
          </div>
          <div 
            className={`p-1 rounded-lg transition-colors ${
              onAttributeClick ? 'cursor-pointer hover:bg-blue-200' : 'hover:bg-blue-200'
            } ${selectedAttribute === 'RESISTENCIA' ? 'bg-blue-500 text-white ring-2 ring-yellow-400' : ''}`}
            onClick={onAttributeClick ? () => onAttributeClick('RESISTENCIA') : undefined}
          >
            <div className={`font-bold transition-colors ${
              selectedAttribute === 'RESISTENCIA' ? 'text-white' : 'text-black hover:text-blue-700'
            }`}>Resistencia {card.endurance}</div>
          </div>
          <div 
            className={`p-1 rounded-lg transition-colors ${
              onAttributeClick ? 'cursor-pointer hover:bg-yellow-200' : 'hover:bg-yellow-200'
            } ${selectedAttribute === 'ALCANCE' ? 'bg-yellow-500 text-white ring-2 ring-yellow-400' : ''}`}
            onClick={onAttributeClick ? () => onAttributeClick('ALCANCE') : undefined}
          >
            <div className={`font-bold transition-colors ${
              selectedAttribute === 'ALCANCE' ? 'text-white' : 'text-black hover:text-yellow-700'
            }`}>Alcance {card.scope}</div>
          </div>
        </div>
      ) : size === 'medium' ? (
        <div className="text-xs text-gray-600 text-center mt-1">
          Nivel {card.letterLevel}
        </div>
      ) : (
        <div className="text-xs text-gray-600 text-center">
          Nivel {card.letterLevel}
        </div>
      )}
      
      {/* Overlay para cartas usadas */}
      {isUsed && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xs">USADA</span>
        </div>
      )}
    </div>
  );
};

export default Cards;