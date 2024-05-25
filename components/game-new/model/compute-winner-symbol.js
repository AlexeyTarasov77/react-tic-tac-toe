
export function computeWinnerSymbol(gameState, nextMove, winnerSequence) {
    const winnerSymbol =
        nextMove === gameState.currentMove ? gameState.currentMove : gameState.cells[winnerSequence?.[0]]; 
    return winnerSymbol
}   