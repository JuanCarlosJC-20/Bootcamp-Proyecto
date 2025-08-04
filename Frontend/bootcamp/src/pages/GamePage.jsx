import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [currentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAttribute, setSelectedAttribute] = useState('ATAQUE');
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState({});
  const [usedCards, setUsedCards] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [showAttributeSelection, setShowAttributeSelection] = useState(false);
  const [playedCards, setPlayedCards] = useState([]);
  const [gamePhase, setGamePhase] = useState('selection');
  const [launchedCard, setLaunchedCard] = useState(null);
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(false);

  // Datos de navegación
  useEffect(() => {
    if (location.state) {
      setGameData(location.state);
    } else {
      navigate('/home');
    }
  }, [location, navigate]);

  // Cargar cartas
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('http://localhost:5084/api/Cards');
        const cardsData = await response.json();
        setCards(cardsData);
      } catch (error) {
        console.error('Error al cargar cartas:', error);
      }
    };
    loadCards();
  }, []);

  // Asignar cartas a jugadores
  useEffect(() => {
    if (gameData && cards.length > 0) {
      const playerCardsMap = {};
      const usedCardsMap = {};
      
      gameData.players.forEach(player => {
        const playerCardSet = [];
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(Math.random() * cards.length);
          playerCardSet.push(cards[randomIndex]);
        }
        playerCardsMap[player.id] = playerCardSet;
        usedCardsMap[player.id] = [];
      });
      
      setPlayerCards(playerCardsMap);
      setUsedCards(usedCardsMap);
    }
  }, [gameData, cards]);

  // Timer
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(timeLeft + 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Función para calcular la posición en arco con superposición
  const getArcPosition = (index, totalCards) => {
    // Ángulo total del arco más compacto
    const totalAngle = 80; // Reducido para que estén más juntas
    const startAngle = -totalAngle / 2;
    
    // Calcular el ángulo para esta carta específica
    const angleStep = totalAngle / (totalCards - 1);
    const currentAngle = startAngle + (angleStep * index);
    
    // Radio del arco más pequeño para mayor compactación
    const radius = 150;
    
    // Convertir a radianes
    const radians = (currentAngle * Math.PI) / 180;
    
    // Calcular posiciones x, y
    const x = Math.sin(radians) * radius;
    const y = Math.cos(radians) * radius;
    
    // Rotación de la carta para que siga la curva del arco
    const rotation = currentAngle * 0.7; // Rotación más pronunciada
    
    // Calcular z-index para efecto de abanico
    // Las cartas del centro (índices medios) tienen mayor z-index
    const centerIndex = (totalCards - 1) / 2;
    const distanceFromCenter = Math.abs(index - centerIndex);
    const baseZIndex = 10;
    const zIndex = baseZIndex + (totalCards - distanceFromCenter);
    
    return {
      transform: `translate(${x}px, ${-Math.abs(y)}px) rotate(${rotation}deg)`,
      zIndex: zIndex
    };
  };

  // Posiciones de jugadores
  const getPlayerPosition = (index, total) => {
    const positions = {
      2: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' },
        { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }
      ],
      3: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' },
        { bottom: '20%', left: '20%' },
        { bottom: '20%', right: '20%' }
      ],
      4: [
        { top: '10%', left: '50%', transform: 'translateX(-50%)' },
        { left: '10%', top: '50%', transform: 'translateY(-50%)' },
        { right: '10%', top: '50%', transform: 'translateY(-50%)' },
        { bottom: '10%', left: '50%', transform: 'translateX(-50%)' }
      ]
    };
    return positions[total]?.[index] || { top: '50%', left: '50%' };
  };

  // Manejo de selección de carta
  const handleCardSelect = (card, cardIndex) => {
    setSelectedCard({ ...card, originalIndex: cardIndex });
    setShowCardDetail(true);
    setShowAttributeSelection(true);
    setGamePhase('attribute');
  };

  const handleCloseCardDetail = () => {
    setShowCardDetail(false);
    setSelectedCard(null);
    setShowAttributeSelection(false);
    setGamePhase('selection');
  };

  const handleConfirmCard = () => {
    if (selectedCard) {
      const currentPlayer = players[currentPlayerIndex];
      
      const newPlayedCard = {
        ...selectedCard,
        playerId: currentPlayer.id,
        playerName: currentPlayer.namePlayer,
        attribute: selectedAttribute,
        attributeValue: getAttributeValue(selectedCard, selectedAttribute)
      };
      
      // Animación de lanzamiento
      setLaunchedCard(newPlayedCard);
      setShowLaunchAnimation(true);
      
      setTimeout(() => {
        setPlayedCards(prev => [...prev, newPlayedCard]);
        
        // Marcar carta como usada
        setUsedCards(prev => ({
          ...prev,
          [currentPlayer.id]: [...(prev[currentPlayer.id] || []), selectedCard.originalIndex]
        }));
        
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
        
        if (playedCards.length + 1 === players.length) {
          setGamePhase('results');
        } else {
          setGamePhase('selection');
        }
        
        setShowLaunchAnimation(false);
        setLaunchedCard(null);
        handleCloseCardDetail();
      }, 1500);
    }
  };

  const getAttributeValue = (card, attribute) => {
    const mapping = {
      'ATAQUE': card.damage, 'SALUD': card.health, 'PODER': card.power,
      'RESISTENCIA': card.endurance, 'NIVEL': card.letterLevel, 'ALCANCE': card.scope
    };
    return mapping[attribute] || 0;
  };

  // Imagen mejorada sin parpadeo
  const getImageUrl = (url) => {
    if (!url) return '';
    const match = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
    if (!match) return url;
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/${fileId}=w400-h300`;
  };

  // Componente de carta optimizado SIN BUGS
  const GameCard = ({ card, onClick, isSelected = false, size = 'small', isUsed = false, className = '' }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const sizes = {
      small: { container: 'w-20 h-28', image: 'w-12 h-12', text: 'text-xs' },
      medium: { container: 'w-24 h-32', image: 'w-16 h-16', text: 'text-sm' },
      large: { container: 'w-56 h-72', image: 'w-32 h-32', text: 'text-base' }
    };

    const currentSize = sizes[size];
    const imageUrl = getImageUrl(card.image);

    return (
      <div 
        className={`${currentSize.container} bg-white rounded-xl shadow-xl border-4 ${
          isSelected ? 'border-yellow-400 shadow-2xl' : 'border-[#980E0E]'
        } ${isUsed ? 'opacity-50' : 'shadow-lg'} transition-all duration-200 flex flex-col items-center justify-between p-2 ${className}`}
        onClick={!isUsed ? onClick : undefined}
      >
        {/* Imagen */}
        <div className={`${currentSize.image} rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 relative`}>
          {!imageError ? (
            <>
              <img 
                src={imageUrl} 
                alt={card.name} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#980E0E]"></div>
                </div>
              )}
            </>
          ) : (
            <div className={`${currentSize.image} flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 rounded-full`}>
              <div className="text-lg">🎴</div>
              <div className="text-xs font-bold text-center px-1 mt-1">
                {card.name.split(' ')[0]}
              </div>
            </div>
          )}
        </div>
        
        {/* Nombre */}
        <h3 className={`${currentSize.text} font-bold text-center text-gray-800 truncate w-full px-1`}>
          {card.name}
        </h3>
        
        {/* Stats para cartas pequeñas */}
        {size === 'small' && (
          <div className="text-xs text-gray-600 text-center">
            Nivel {card.letterLevel}
          </div>
        )}
        
        {/* Stats detalladas para cartas grandes */}
        {size === 'large' && (
          <div className="grid grid-cols-2 gap-2 w-full text-xs mt-2">
            {[
              { label: 'Power', value: card.power, bg: 'bg-red-500', text: 'text-white', border: 'border-red-600' },
              { label: 'Damage', value: card.damage, bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600' },
              { label: 'Health', value: card.health, bg: 'bg-green-500', text: 'text-white', border: 'border-green-600' },
              { label: 'Endurance', value: card.endurance, bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' },
              { label: 'Level', value: card.letterLevel, bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-600' },
              { label: 'Scope', value: card.scope, bg: 'bg-indigo-500', text: 'text-white', border: 'border-indigo-600' }
            ].map(({ label, value, bg, text, border }) => (
              <div key={label} className={`${bg} ${text} ${border} p-2 rounded-lg border-2 shadow-md`}>
                <div className="font-bold text-xs">{label}</div>
                <div className="font-black text-sm">{value}</div>
              </div>
            ))}
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

  if (!gameData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#060E42] to-[#475BDF]">
        <div className="text-white text-2xl">Cargando...</div>
      </div>
    );
  }

  const { players } = gameData;
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="h-screen bg-gradient-to-b from-[#060E42] to-[#475BDF] relative overflow-hidden">
      
      {/* Header SÚPER COMPACTO como en el ejemplo */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-r from-[#1565c0] to-[#1976d2] border border-[#2196f3] mx-1 mt-1 shadow-lg">
          <div className="flex justify-between items-center px-3 py-1">
            {/* Botón Home minimalista */}
            <button
              onClick={() => navigate('/home')}
              className="bg-gray-700 hover:bg-gray-800 text-white p-1 rounded text-lg"
            >
              🏠
            </button>
            
            {/* Información central SÚPER COMPACTA */}
            <div className="text-center text-white">
              <div className="text-sm font-bold">
                Ronda {currentRound} | Atributo: <span className="text-yellow-300">{selectedAttribute}</span>
                {currentPlayer && !showLaunchAnimation && (
                  <span className="ml-2">| Turno: <span className="text-yellow-300">{currentPlayer.namePlayer}</span></span>
                )}
              </div>
            </div>
            
            {/* Timer compacto */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 rounded text-white font-bold text-xs">
              ⏰ {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Animación de carta lanzada */}
      {showLaunchAnimation && launchedCard && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="animate-bounce">
            <div className="animate-pulse bg-yellow-400 rounded-full p-4 shadow-2xl">
              <GameCard card={launchedCard} size="large" className="animate-spin" />
            </div>
          </div>
          <div className="text-center text-white text-2xl font-bold mt-4 animate-pulse">
            ¡CARTA LANZADA!
          </div>
        </div>
      )}

      {/* Mesa con cartas jugadas */}
      {gamePhase === 'results' && playedCards.length > 0 && !showLaunchAnimation && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="bg-green-800 bg-opacity-90 rounded-2xl p-6 border-4 border-green-400 shadow-2xl">
            <h3 className="text-white text-2xl font-bold text-center mb-4">Cartas en Juego</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {playedCards.map((playedCard, index) => (
                <div key={index} className="text-center">
                  <GameCard card={playedCard} size="medium" />
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
      )}

      {/* Área central COMPACTA */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        {gamePhase !== 'results' && !showLaunchAnimation && (
          <>
            {!showCardDetail ? (
              <div>
                <div className="text-lg mb-3 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 rounded-lg backdrop-blur-sm text-white font-semibold shadow-md">
                  ¡Selecciona tu carta!
                </div>
              </div>
            ) : (
              <div>
                <div className="text-lg mb-4 bg-purple-600 bg-opacity-80 px-3 py-2 rounded-lg shadow-lg">
                  ¡Elige tu atributo y lanza la carta!
                </div>
                
                {selectedCard && (
                  <div className="relative mb-4">
                    <div className="relative transform rotate-12 hover:rotate-0 transition-transform duration-500 flex justify-center mb-4">
                      <GameCard card={selectedCard} size="medium" isSelected={true} />
                    </div>
                    
                    {showAttributeSelection && (
                      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-xl p-4 shadow-2xl border-2 border-amber-400 max-w-sm mx-auto backdrop-blur-sm">
                        <h4 className="text-gray-800 font-bold text-lg mb-3 text-center flex items-center justify-center gap-2">
                          🎯 <span>Selecciona el Atributo:</span>
                        </h4>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { attr: 'PODER', label: 'Power', value: selectedCard.power, emoji: '💪' },
                            { attr: 'ATAQUE', label: 'Damage', value: selectedCard.damage, emoji: '⚔️' },
                            { attr: 'SALUD', label: 'Health', value: selectedCard.health, emoji: '❤️' },
                            { attr: 'RESISTENCIA', label: 'Endurance', value: selectedCard.endurance, emoji: '🛡️' },
                            { attr: 'NIVEL', label: 'Level', value: selectedCard.letterLevel, emoji: '⭐' },
                            { attr: 'ALCANCE', label: 'Scope', value: selectedCard.scope, emoji: '🎯' }
                          ].map(({ attr, label, value, emoji }, index) => {
                            const isSelected = selectedAttribute === attr;
                            const colors = [
                              { bg: 'bg-red-500', bgHover: 'bg-red-600', bgLight: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
                              { bg: 'bg-orange-500', bgHover: 'bg-orange-600', bgLight: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
                              { bg: 'bg-green-500', bgHover: 'bg-green-600', bgLight: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
                              { bg: 'bg-blue-500', bgHover: 'bg-blue-600', bgLight: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
                              { bg: 'bg-purple-500', bgHover: 'bg-purple-600', bgLight: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
                              { bg: 'bg-indigo-500', bgHover: 'bg-indigo-600', bgLight: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-300' }
                            ];
                            const colorScheme = colors[index];
                            
                            return (
                              <button
                                key={attr}
                                onClick={() => setSelectedAttribute(attr)}
                                className={`p-2 rounded-lg text-xs font-bold transition-all duration-300 shadow-lg border-2 transform hover:scale-105 ${
                                  isSelected 
                                    ? `${colorScheme.bg} text-white border-white shadow-2xl scale-105 ring-2 ring-yellow-400` 
                                    : `${colorScheme.bgLight} ${colorScheme.text} ${colorScheme.border} hover:${colorScheme.bgHover} hover:text-white hover:shadow-xl`
                                }`}
                              >
                                <div className="text-sm mb-1">{emoji}</div>
                                <div className="font-bold text-xs">{label}</div>
                                <div className="text-sm font-black mt-1">{value}</div>
                              </button>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-center gap-3 mt-4">
                          <button
                            onClick={handleConfirmCard}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 border-2 border-green-700 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 flex items-center gap-2 text-sm"
                          >
                            🚀 <span>Lanzar</span>
                          </button>
                          <button
                            onClick={handleCloseCardDetail}
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 border-2 border-red-700 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 flex items-center gap-2 text-sm"
                          >
                            ❌ <span>Cancelar</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Fila de cartas EN ARCO COMPACTO - MÁS ABAJO */}
      {gamePhase === 'selection' && 
       !showCardDetail && 
       !showLaunchAnimation &&
       currentPlayer && 
       playerCards[currentPlayer.id] && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
          {/* Contenedor del arco de cartas más compacto */}
          <div className="relative flex justify-center items-end" style={{ width: '400px', height: '180px' }}>
            {playerCards[currentPlayer.id].slice(0, 8).map((card, index) => {
              const isUsed = usedCards[currentPlayer.id]?.includes(index);
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
                  onClick={!isUsed ? () => handleCardSelect(card, index) : undefined}
                >
                  <div 
                    className={`transition-all duration-300 ease-out ${
                      !isUsed ? 'hover:scale-125 hover:-translate-y-12 hover:z-50 hover:drop-shadow-2xl' : ''
                    }`}
                    style={{
                      zIndex: 'inherit'
                    }}
                  >
                    <GameCard card={card} size="small" isUsed={isUsed} />
                  </div>
                </div>
              );
            })}
          </div>
          

        </div>
      )}

      {/* Jugadores posicionados - MÁS COMPACTOS */}
      {players.map((player, index) => {
        const position = getPlayerPosition(index, players.length);
        const isCurrentPlayer = index === currentPlayerIndex;
        const hasPlayedCard = playedCards.some(card => card.playerId === player.id);
        
        return (
          <div key={player.id} className="absolute transition-all duration-500" style={position}>
            <div className={`flex flex-col items-center transition-all duration-300 ${
              isCurrentPlayer ? 'scale-105' : hasPlayedCard ? 'opacity-70 scale-95' : ''
            }`}>
              <div className={`rounded-full border-3 ${
                isCurrentPlayer 
                  ? 'border-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-xl' 
                  : hasPlayedCard
                  ? 'border-green-400 bg-gradient-to-br from-green-100 to-green-200 shadow-lg'
                  : 'border-white bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg'
              } p-1 mb-1`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-700 flex items-center justify-center shadow-inner">
                  <span className="text-white font-bold text-sm drop-shadow-lg">
                    {player.namePlayer.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg transition-all duration-200 ${
                isCurrentPlayer 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' 
                  : hasPlayedCard
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                  : 'bg-white text-black'
              }`}>
                {player.namePlayer}
              </div>
              
              {isCurrentPlayer && (
                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full mt-1 font-semibold shadow-lg animate-pulse">
                  🎯 Su Turno
                </div>
              )}
              
              {hasPlayedCard && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded-full mt-1 font-semibold shadow-lg">
                  ✅ Jugó
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};