import { GameInfo, GameTitle, GameField, GameSymbol } from "../components/game";
import { Header } from "../components/header";
import { useState } from "react";
import { useGameState } from "../components/game";
import { UiModal, UiButton } from "../components/uikit";
import clsx from "clsx";

export default function HomePage() {
  const [playersCount, setPlayersCount] = useState(4);
  const {
    cells,
    currentMove,
    nextMove,
    handleCellClick,
    handlePlayerTimeOver,
    winnerSequence,
    winnerSymbol,
  } = useGameState(playersCount);
  return (
    <div className="bg-slate-50 min-h-screen">
      <Header />
      <main className="pt-6 mx-auto max-w-[616px]">
        <GameTitle playersCount={playersCount} />
        <GameInfo
          className="mt-4 "
          playersCount={playersCount}
          currentMove={currentMove}
          isWinner={!!winnerSymbol}
          onPlayerTimeOver={handlePlayerTimeOver}
        />
        {/* <div>{winnerSymbol && <GameSymbol symbol={winnerSymbol} />}</div> */}
        <UiModal isOpen={!!winnerSymbol} onClose={() => null}>
          <UiModal.Header className={clsx()}>Игра завершена</UiModal.Header>
          <UiModal.Body>
            <div className="text-sm">Победитель: <span className="text-teal-600">Вася Пупкин</span></div>
            <GameInfo
              playersCount={playersCount}
              currentMove={currentMove}
              isWinner={!!winnerSymbol}
              onPlayerTimeOver={handlePlayerTimeOver}
            />
          </UiModal.Body>
          <UiModal.Footer>
            <UiButton variant="outline" size="md">
              Вернуться
            </UiButton>
            <UiButton variant="primary" size="md">
              Играть снова
            </UiButton>
          </UiModal.Footer>
        </UiModal>
        <GameField
          className="mt-6"
          playersCount={playersCount}
          cells={cells}
          currentMove={currentMove}
          nextMove={nextMove}
          handleCellClick={handleCellClick}
          winnerSymbol={winnerSymbol}
          winnerSequence={winnerSequence}
        />
      </main>
    </div>
  );
}
