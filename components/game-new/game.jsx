import { GameLayout } from "./ui/game-layout";
import { BackLink } from "./ui/back-link";
import { GameInfo } from "./ui/game-info";
import { GameTitle } from "./ui/game-title";
import { PlayerInfo } from "./ui/player-info";
import { PLAYERS } from "./constants";
import { GameMoveInfo } from "./ui/game-move-info";
import { useGameState } from "./model/use-game-state";
import { GameCell } from "./ui/game-cell";
import { GameOverModal } from "./ui/game-over-modal";

const PLAYERS_COUNT = 2;

export function Game() {
  const {
    cells,
    currentMove,
    nextMove,
    handleCellClick,
    handlePlayerTimeOver,
    winnerSequence,
    winnerSymbol,
  } = useGameState(PLAYERS_COUNT);
  const getPlayersList = () =>
    PLAYERS.slice(0, PLAYERS_COUNT).map((player, index) => (
      <PlayerInfo
        key={player.id}
        playerInfo={player}
        isRight={index % 2 === 1}
        avatar={player.avatar}
        seconds={15}
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
          <GameMoveInfo currentMove={currentMove} nextMove={nextMove} />
        }
        gameCells={cells.map((cell, index) => (
          <GameCell
            key={index}
            onClick={() => handleCellClick(index)}
            isWinner={winnerSequence?.includes(index)}
            disabled={!!winnerSymbol}
            symbol={cell}
          />
        ))}
      />
      <GameOverModal playersList={getPlayersList()} winnerName={winnerPlayer?.name} />
    </>
  );
}
