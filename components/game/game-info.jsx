import clsx from "clsx";
import { Profile } from "../profile";
import { useEffect, useState } from "react";
import { GameSymbol } from "./";
import { avatar1, avatar2, avatar3, avatar4 } from "./images";
import { GAME_SYMBOLS } from "./constants";

const players = [
  {
    id: 1,
    name: "Вася Пупкин",
    rating: 215,
    avatar: avatar1,
    symbol: GAME_SYMBOLS.CROSS,
  },
  {
    id: 2,
    name: "Пупка Вася",
    rating: 421,
    avatar: avatar2,
    symbol: GAME_SYMBOLS.ZERO,
  },
  {
    id: 3,
    name: "Настя Пупкина",
    rating: 172,
    avatar: avatar3,
    symbol: GAME_SYMBOLS.TRIANGLE,
  },
  {
    id: 4,
    name: "Петя Пупкин",
    rating: 1789,
    avatar: avatar4,
    symbol: GAME_SYMBOLS.SQUARE,
  },
];

export function GameInfo({ className, playersCount, currentMove, isWinner, onPlayerTimeOver }) {
  return (
    <div
      className={clsx(
        className,
        "bg-white rounded-2xl shadow-md px-8 py-4 grid grid-cols-2 gap-3"
      )}
    >
      {players.slice(0, playersCount).map((playerInfo, index) => (
        <PlayerInfo
          key={playerInfo.id}
          playerInfo={playerInfo}
          onTimeOver={() => onPlayerTimeOver(playerInfo.symbol)}
          isRight={index % 2 === 1}
          isTimerRunning={currentMove === playerInfo.symbol && !isWinner}
        />
      ))}
    </div>
  );
}

function PlayerInfo({ playerInfo, isRight, isTimerRunning, onTimeOver }) {
  const [seconds, setSeconds] = useState(15);

  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const timeStatus = () => {
    if (!isTimerRunning) {
      return "disabled"
    } else if (seconds <= 5) {
      return "danger";
    } else if (seconds <= 10) {
      return "warning";
    } else {
      return "normal";
    }
  };

  const timeStatusVariants = {
    warning: "text-orange-600",
    danger: "text-red-500",
    normal: "text-slate-900",
    disabled: "text-slate-200",
  };

  useEffect(() => {
    if (isTimerRunning) {
      const interval = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => {
        clearInterval(interval);
        setSeconds(15);
      };
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeOver();
    }
  }, [seconds]);

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && "order-3")}>
        <Profile
          className="w-44"
          name={playerInfo.name}
          rating={playerInfo.rating}
          avatar={playerInfo.avatar}
        />
        <div className="w-5 h-5 rounded-full bg-white shadow absolute -left-1 -top-1 flex items-center justify-center">
          <GameSymbol symbol={playerInfo.symbol} />
        </div>
      </div>
      <div className={clsx("h-6 w-px bg-slate-200", isRight && "order-2")} />
      <div
        className={clsx(
          "text-lg font-semibold w-[60px]",
          isRight && "order-1",
          timeStatusVariants[timeStatus()]
        )}
      >
        {minutesString}:{secondsString}
      </div>
    </div>
  );
}
