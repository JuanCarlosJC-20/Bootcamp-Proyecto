import React from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import GameHeader from '../components/GameHeader';
import LaunchAnimation from '../components/LaunchAnimation';
import GameResults from '../components/GameResults';
import CardSelection from '../components/CardSelection';
import CardArc from '../components/CardArc';
import PlayerIndicators from '../components/PlayerIndicators';
import ExitModal from '../components/ExitModal';
import CardStack from '../components/CardStack';

export const GamePage = () => {
  const {
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
  } = useGameLogic();

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
      
      {/* Header del juego */}
      <GameHeader 
        currentRound={currentRound}
        selectedAttribute={selectedAttribute}
        currentPlayer={currentPlayer}
        showLaunchAnimation={showLaunchAnimation}
        timeLeft={timeLeft}
        onExitClick={handleShowExitModal}
      />

      {/* Animación de carta lanzada */}
      {showLaunchAnimation && launchedCard && (
        <LaunchAnimation launchedCard={launchedCard} />
      )}

      {/* Mazo de cartas jugadas en el centro */}
      {playedCards.length > 0 && !showLaunchAnimation && (
        <CardStack 
          playedCards={playedCards} 
          showCardDetail={showCardDetail}
          showLaunchAnimation={showLaunchAnimation}
        />
      )}

      {/* Mesa con cartas jugadas (solo para resultados finales) */}
      {gamePhase === 'results' && playedCards.length > 0 && !showLaunchAnimation && (
        <GameResults playedCards={playedCards} />
      )}

      {/* Área central */}
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
              <CardSelection 
                selectedCard={selectedCard}
                selectedAttribute={selectedAttribute}
                onAttributeClick={setSelectedAttribute}
                onConfirm={handleConfirmCard}
                onCancel={handleCloseCardDetail}
              />
            )}
          </>
        )}
      </div>

      {/* Arco de cartas del jugador */}
      {gamePhase === 'selection' && 
       !showCardDetail && 
       !showLaunchAnimation &&
       currentPlayer && 
       playerCards[currentPlayer.id] && (
        <CardArc 
          cards={playerCards[currentPlayer.id]}
          usedCards={usedCards[currentPlayer.id]}
          onCardSelect={handleCardSelect}
        />
      )}

      {/* Indicadores de jugadores */}
      <PlayerIndicators 
        players={players}
        currentPlayerIndex={currentPlayerIndex}
        playedCards={playedCards}
      />

      {/* Modal de confirmación de salida */}
      <ExitModal 
        isOpen={showExitModal}
        onCancel={handleCancelExit}
        onConfirm={handleConfirmExit}
      />
    </div>
  );
};