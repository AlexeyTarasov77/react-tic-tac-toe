export const computePlayerTimer = (playerSymbol, gameState) => {
  const isCurrentPlayer = playerSymbol === gameState.currentMove;
  return {
    timer: gameState.timers[playerSymbol],
    timerStartAt: isCurrentPlayer ? gameState.currentMoveStart : undefined,
  };
};
