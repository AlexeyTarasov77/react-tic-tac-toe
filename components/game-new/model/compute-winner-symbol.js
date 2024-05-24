
export function computeWinnerSymbol(currentMove, nextMove, cells, winnerSequence) {
    const winnerSymbol =
        nextMove === currentMove ? currentMove : cells[winnerSequence?.[0]]; 
    return winnerSymbol
}   