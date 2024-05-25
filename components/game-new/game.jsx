import { useReducer } from "react";

import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameInfo } from "./ui/game-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { PLAYERS } from "./constants";
import { GameMoveInfo } from "./ui/game-move-info";
import { computeWinner } from "./model/compute-winner";
import { computeWinnerSymbol } from "./model/compute-winner-symbol";
import { computePlayerTimer } from "./model/compute-player-timer";
import {
  gameStateReducer,
  initGameState,
  GAME_STATE_ACTIONS,
} from "./model/game-state-reducer";
import { getNextMove } from "./model/get-next-move";
import { GameCell } from "./ui/game-cell";
import { GameOverModal } from "./ui/game-over-modal";
import { useInterval } from "../lib/timers";

const PLAYERS_COUNT = 2;

export function Game() {
  const [gameState, dispatch] = useReducer(
    gameStateReducer,
    {
      playersCount: PLAYERS_COUNT,
      defaultTimer: 15000,
      currentMoveStart: Date.now(),
    },
    initGameState
  );

  useInterval(1000, !!gameState.currentMoveStart, () => {
    dispatch({ type: GAME_STATE_ACTIONS.TICK, now: Date.now() });
  });

  const winnerSequence = computeWinner(gameState.cells);
  const nextMove = getNextMove(gameState);
  const winnerSymbol = computeWinnerSymbol(gameState, nextMove, winnerSequence);

  const getPlayersList = (isTimerRunning = true) =>
    PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
      <PlayerInfo
        key={player.id}
        playerInfo={player}
        isRight={index % 2 === 1}
        avatar={player.avatar}
        {...(isTimerRunning
          ? computePlayerTimer(player.symbol, gameState)
          : {})}
      />
    ));
  const winnerPlayer = PLAYERS.find((player) => player.symbol === winnerSymbol);
  return (
    <>
      <GameLayout
        backLink={<BackLink />}
        title={<GameTitle playersCount={PLAYERS_COUNT} />}
        gameInfo={
          <GameInfo
            playersCount={PLAYERS_COUNT}
            isRatingGame={true}
            timeMode="1 мин на ход"
          />
        }
        playersList={getPlayersList()}
        gameMoveInfo={
          <GameMoveInfo
            currentMove={gameState.currentMove}
            nextMove={nextMove}
          />
        }
        gameCells={gameState.cells.map((cell, index) => (
          <GameCell
            key={index}
            onClick={() =>
              dispatch({
                type: GAME_STATE_ACTIONS.CELL_CLICK,
                index,
                now: Date.now(),
              })
            }
            isWinner={winnerSequence?.includes(index)}
            disabled={!!winnerSymbol}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal
        playersList={getPlayersList(false)}
        winnerName={winnerPlayer?.name}
      />
    </>
  );
}
