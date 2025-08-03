import React, { useState } from 'react';

const Cards = ({ card }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    console.log('Error loading image for card:', card.name);
    
    // Intentar con diferentes métodos si el primer intento falla
    if (retryCount < 2) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setImageError(false);
        setImageLoaded(false);
      }, 1000);
    } else {
      setImageError(true);
      setImageLoaded(false);
    }
  };

  // Múltiples métodos para obtener la imagen de Google Drive
  const getImageUrl = (url, attempt = 0) => {
    if (!url) return '';
    
    // Extraer el ID de Google Drive
    const match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (!match) return url;
    
    const fileId = match[1];
    
    // Diferentes métodos según el intento
    switch (attempt) {
      case 0:
        // Método directo de Google Drive
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      
      case 1:
        // Método alternativo de Google Drive
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w200-h200`;
      
      case 2:
        // Usando lh3.googleusercontent.com (a veces funciona mejor)
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      
      default:
        return url;
    }
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
    <div className="bg-white rounded-xl shadow-xl w-64 h-96 p-4 flex flex-col items-center justify-between border-4 border-[#980E0E] hover:shadow-2xl transition-shadow duration-300">
      
      {/* Imagen de la carta */}
      <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 relative">
        {!imageError ? (
          <>
            <img 
              key={`${card.id}-${retryCount}`} // Key único para forzar re-render
              src={imageUrl} 
              alt={card.name} 
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
            />
            
            {/* Loading spinner */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#980E0E]"></div>
              </div>
            )}
          </>
        ) : (
          <PlaceholderImage />
        )}
      </div>
      
      {/* Nombre de la carta */}
      <h2 className="text-xl font-bold text-center mt-2 text-gray-800">{card.name}</h2>
      
      {/* Estadísticas de la carta */}
      <div className="grid grid-cols-2 gap-2 w-full text-sm text-center mt-2">
        <div className="bg-red-100 p-2 rounded-lg border border-red-200 hover:bg-red-200 transition-colors">
          <div className="font-bold text-red-700">Power</div>
          <div className="text-lg font-bold text-red-800">{card.power}</div>
        </div>
        
        <div className="bg-orange-100 p-2 rounded-lg border border-orange-200 hover:bg-orange-200 transition-colors">
          <div className="font-bold text-orange-700">Damage</div>
          <div className="text-lg font-bold text-orange-800">{card.damage}</div>
        </div>
        
        <div className="bg-green-100 p-2 rounded-lg border border-green-200 hover:bg-green-200 transition-colors">
          <div className="font-bold text-green-700">Health</div>
          <div className="text-lg font-bold text-green-800">{card.health}</div>
        </div>
        
        <div className="bg-blue-100 p-2 rounded-lg border border-blue-200 hover:bg-blue-200 transition-colors">
          <div className="font-bold text-blue-700">Endurance</div>
          <div className="text-lg font-bold text-blue-800">{card.endurance}</div>
        </div>
        
        <div className="bg-purple-100 p-2 rounded-lg border border-purple-200 hover:bg-purple-200 transition-colors">
          <div className="font-bold text-purple-700">Level</div>
          <div className="text-lg font-bold text-purple-800">{card.letterLevel}</div>
        </div>
        
        <div className="bg-yellow-100 p-2 rounded-lg border border-yellow-200 hover:bg-yellow-200 transition-colors">
          <div className="font-bold text-yellow-700">Scope</div>
          <div className="text-lg font-bold text-yellow-800">{card.scope}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;