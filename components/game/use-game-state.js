import { useState } from "react";
import { GAME_SYMBOLS } from "./constants";
import { getNextMove, computeWinner } from "./model";

export function useGameState(playersCount) {
  const [{ cells, currentMove, playersTimeOver }, setGameState] = useState(() => ({
    cells: new Array(19 * 19).fill(null),
    currentMove: GAME_SYMBOLS.CROSS,
    playersTimeOver: []
  }));

  const winnerSequence = computeWinner(cells);
  const nextMove = getNextMove(currentMove, playersCount, playersTimeOver);

  const winnerSymbol = nextMove === currentMove ? currentMove : winnerSequence?.[0];

  function handleCellClick(index) {
    if (!winnerSequence) {
      setGameState((lastGameState) => {
        if (lastGameState.cells[index]) {
          return lastGameState;
        }

        return {
          ...lastGameState,
          currentMove: getNextMove(lastGameState.currentMove, playersCount, lastGameState.playersTimeOver),
          cells: lastGameState.cells.map((cell, i) =>
            i === index ? lastGameState.currentMove : cell
          ),
        };
      });
    }
  }

  function handlePlayerTimeOver(symbol) {
    setGameState((lastGameState) => {
      return {
        ...lastGameState,
        currentMove: getNextMove(lastGameState.currentMove, playersCount, lastGameState.playersTimeOver),
        playersTimeOver: [...lastGameState.playersTimeOver, symbol],
      }
    });
  }

  return {
    cells,
    currentMove,
    nextMove,
    handlePlayerTimeOver,
    handleCellClick,
    winnerSequence,
    winnerSymbol
  };
}
