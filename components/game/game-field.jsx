import clsx from "clsx";
import { UiButton } from "../uikit";
import { GameSymbol } from "./";

export function GameField({
  className,
  playersCount,
  cells,
  currentMove,
  nextMove,
  handleCellClick,
  winnerSymbol,
  winnerSequence,
}) {
  return (
    <GameFieldLayout className={className}>
      <GameMoveInfo
        currentMove={currentMove}
        nextMove={nextMove}
        actions={
          <>
            <UiButton size="md" variant="primary">
              Ничья
            </UiButton>
            <UiButton size="md" variant="outline">
              Сдаться
            </UiButton>
          </>
        }
      />
      <GameGrid>
        {cells.map((cell, index) => (
          <GameCell
            key={index}
            onClick={() => handleCellClick(index)}
            isWinner={winnerSequence?.includes(index)}
            disabled={!!winnerSymbol}
          >
            {cell && <GameSymbol symbol={cell} className={"w-5 h-5"} />}
          </GameCell>
        ))}
      </GameGrid>
    </GameFieldLayout>
  );
}

function GameCell({ children, onClick, isWinner, disabled }) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "border border-slate-200 -ml-px -mt-px flex items-center justify-center",
        isWinner && "bg-orange-600/10"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function GameFieldLayout({ children, className }) {
  return (
    <div
      className={clsx(
        "bg-white rounded-2xl shadow-md px-8 pt-5 pb-7",
        className
      )}
    >
      {children}
    </div>
  );
}

function GameMoveInfo({ actions, currentMove, nextMove }) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-1 text-xl leading-tight font-semibold">
          Ход: <GameSymbol symbol={currentMove} className={"w-5 h-5"} />
        </div>
        <div className="flex items-center gap-1 text-xs leading-tight text-slate-400">
          Следующий: <GameSymbol symbol={nextMove} />
        </div>
      </div>
      <div>
        <div className="flex gap-3">{actions}</div>
      </div>
    </div>
  );
}

function GameGrid({ children }) {
  return (
    <div className="grid grid-cols-[repeat(19,30px)] grid-rows-[repeat(19,30px)] mt-3 pl-px pt-px">
      {children}
    </div>
  );
}
