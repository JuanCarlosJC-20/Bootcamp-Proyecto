import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useGameLogic = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Estados del juego mediante funciones 
  const [gameData, setGameData] = useState(null);
  const [currentRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAttribute, setSelectedAttribute] = useState('PODER');
  const [playerCards, setPlayerCards] = useState({});
  const [usedCards, setUsedCards] = useState({});
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardDetail, setShowCardDetail] = useState(false);
  const [playedCards, setPlayedCards] = useState([]);
  const [gamePhase, setGamePhase] = useState('selection');
  const [launchedCard, setLaunchedCard] = useState(null);
  const [showLaunchAnimation, setShowLaunchAnimation] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (location.state) {
      setGameData(location.state);
      if (location.state.players) {
        const initialPlayerCards = {};
        const initialUsedCards = {};
        
        location.state.players.forEach(player => {
          initialPlayerCards[player.id] = [];
          initialUsedCards[player.id] = [];
        });
        
        setPlayerCards(initialPlayerCards);
        setUsedCards(initialUsedCards);
      }
    } else {
      navigate('/home');
    }
  }, [location, navigate]);

//cargan cartas del back por el fectch medianrte el id del game
  useEffect(() => {
    const loadPlayerCards = async () => {
      if (gameData?.game?.id) {
        try {
          console.log('Cargando cartas del juego:', gameData.game.id);
          
          const response = await fetch(`https://localhost:7221/api/PlayerCard/game/${gameData.game.id}`);
          
          if (!response.ok) {
            throw new Error(`Error al cargar cartas: ${response.status} - ${response.statusText}`);
          }
          
          const gamePlayerCards = await response.json();
          console.log('Cartas cargadas del backend:', gamePlayerCards);
          
          const organizedPlayerCards = {};
          const organizedUsedCards = {};
          
          Object.keys(gamePlayerCards).forEach(playerId => {
            const playerCardData = gamePlayerCards[playerId];
            
            organizedPlayerCards[playerId] = playerCardData.map(pc => pc.card);
            organizedUsedCards[playerId] = playerCardData
              .map((pc, index) => pc.isUsed ? index : null)
              .filter(index => index !== null);
          });
          
          setPlayerCards(organizedPlayerCards);
          setUsedCards(organizedUsedCards);
          
          console.log('Cartas organizadas:', organizedPlayerCards);
          console.log('Cartas usadas:', organizedUsedCards);
          
        } catch (error) {
          console.error('Error al cargar cartas de jugadores:', error);
          
          // diseño de cartas si hay error
          const dummyCard = {
            id: 1,
            name: "Carta Ejemplo",
            power: 85,
            damage: 90,
            health: 75,
            endurance: 80,
            letterLevel: 5,
            scope: 70,
            image: "https://drive.google.com/file/d/1example/view?usp=sharing"
          };

          const initialPlayerCards = {};
          gameData.players.forEach(player => {
            initialPlayerCards[player.id] = Array(8).fill(dummyCard);
          });
          
          setPlayerCards(initialPlayerCards);
          console.log('Usando cartas dummy por error en la carga');
        }
      }
    };
    loadPlayerCards();
  }, [gameData]);

  //temporizador 
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(timeLeft + 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Funciones del juego
  const handleCardSelect = (card, cardIndex) => {
    setSelectedCard({ ...card, originalIndex: cardIndex });
    setShowCardDetail(true);
    setGamePhase('attribute');
  };

  const handleCloseCardDetail = () => {
    setShowCardDetail(false);
    setSelectedCard(null);
    setGamePhase('selection');
  };

  const handleShowExitModal = () => {
    setShowExitModal(true);
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    navigate('/home');
  };

  const handleConfirmCard = async () => {
    if (selectedCard && gameData?.players) {
      const currentPlayer = gameData.players[currentPlayerIndex];
      
      const newPlayedCard = {
        ...selectedCard,
        playerId: currentPlayer.id,
        playerName: currentPlayer.namePlayer,
        attribute: selectedAttribute,
        attributeValue: getAttributeValue(selectedCard, selectedAttribute)
      };
      
      setLaunchedCard(newPlayedCard);
      setShowLaunchAnimation(true);
      
      try {
        console.log('Marcando carta como usada:', selectedCard);
        
        setTimeout(async () => {
          setPlayedCards(prev => [...prev, newPlayedCard]);
          setUsedCards(prev => ({
            ...prev,
            [currentPlayer.id]: [...(prev[currentPlayer.id] || []), selectedCard.originalIndex]
          }));
          setCurrentPlayerIndex((prev) => (prev + 1) % gameData.players.length);
          
          if (playedCards.length + 1 === gameData.players.length) {
            setGamePhase('results');
          } else {
            setGamePhase('selection');
          }
          
          setShowLaunchAnimation(false);
          setLaunchedCard(null);
          handleCloseCardDetail();
        }, 1500);
      } catch (error) {
        console.error('Error al marcar carta como usada:', error);
        setTimeout(() => {
          setPlayedCards(prev => [...prev, newPlayedCard]);
          setUsedCards(prev => ({
            ...prev,
            [currentPlayer.id]: [...(prev[currentPlayer.id] || []), selectedCard.originalIndex]
          }));
          setCurrentPlayerIndex((prev) => (prev + 1) % gameData.players.length);
          
          if (playedCards.length + 1 === gameData.players.length) {
            setGamePhase('results');
          } else {
            setGamePhase('selection');
          }
          
          setShowLaunchAnimation(false);
          setLaunchedCard(null);
          handleCloseCardDetail();
        }, 1500);
      }
    }
  };

  const getAttributeValue = (card, attribute) => {
    const mapping = {
      'ATAQUE': card.damage, 'SALUD': card.health, 'PODER': card.power,
      'RESISTENCIA': card.endurance, 'ALCANCE': card.scope
    };
    return mapping[attribute] || 0;
  };

  return {
    // Estados
    gameData,
    currentRound,
    timeLeft,
    selectedAttribute,
    setSelectedAttribute,
    playerCards,
    usedCards,
    currentPlayerIndex,
    selectedCard,
    showCardDetail,
    playedCards,
    gamePhase,
    launchedCard,
    showLaunchAnimation,
    showExitModal,
    
    // Funciones
    handleCardSelect,
    handleCloseCardDetail,
    handleShowExitModal,
    handleCancelExit,
    handleConfirmExit,
    handleConfirmCard
  };
};
