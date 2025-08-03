import React, { useState, useEffect, useCallback } from 'react';

const Cards = ({ card }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isImageVisible, setIsImageVisible] = useState(false);

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
    <div className="bg-gradient-to-b from-[#4481B3] to-[#2C8246] rounded-xl shadow-xl w-64 h-96  flex flex-col items-center justify-between border-8  border-black hover:shadow-2xl transition-all duration-300 hover:scale-105 transform  ">


    <div className="flex items-center w-64 h-16 rounded-xl bg-gradient-to-r from-[#B7A5A5] to-[#6C6E72]  shadow-md gap-6 mb-2">
  {/* Nivel de la carta */}
  <div className="bg-[#D8C9A3] text-black font-bold px-3 py-1 rounded-xl "> Lv
    {card.letterLevel}
  </div>

  {/* Nombre de la carta */}
  <div className="text-white text-md font-bold">
    {card.name}
  </div>
</div>

        
      {/* Imagen de la carta */}
      <div className="w-30 h-50 rounded-4xl border-4 border-black justify-center flex bg-gray-100 relative">
        {!imageError ? (
          <>
            <img
              key={`${card.id}-${retryCount}`} // Key único para forzar re-render
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

      {/* Estadísticas de la carta */}
      <div className="grid grid-cols-1 gap-1 w-full text-sm text-center mt-2 border-4 border-[#932828] rounded-2xl bg-[#D7C39F]">

        <div className=" rounded-lg  hover:bg-red-200  transition-colors p-1">
          <div className="font-bold text-black hover:text-red-700 transition-colors">Power {card.power}</div>
        </div>

        <div className="p-1 rounded-lg  hover:bg-orange-200 transition-colors">
          <div className="font-bold text-black hover:text-orange-700 transition-colors">Damage {card.damage}</div>
        </div>

        <div className="p-1 rounded-lg  hover:bg-green-200 transition-colors">
          <div className="font-bold text-black hover:text-green-700 transition-colors">Health {card.health}</div>
        </div>

        <div className="p-1 rounded-lg  hover:bg-blue-200 transition-colors">
          <div className="font-bold text-black hover:text-blue-700 transition-colors">Endurance {card.endurance}</div>
        </div>



        <div className="p-1 rounded-lg   hover:bg-yellow-200 transition-colors">
          <div className="font-bold text-black hover:text-yellow-700 transition-colors">Scope {card.scope}</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;