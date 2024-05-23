import Image from "next/image";
import avatarSrc from "./images/avatar-1.png";
import clsx from "clsx";
import { GameSymbol } from "./game-symbol";

export function PlayerInfo({ playerInfo, isRight, isTimerRunning, avatar = avatarSrc, seconds }) {
  const minutesString = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsString = String(seconds % 60).padStart(2, "0");

  const timeStatus = () => {
    if (!isTimerRunning) {
      return "disabled";
    } else if (seconds <= 10) {
      return "danger";
    } else {
      return "normal";
    }
  };

  const timeStatusVariants = { 
    danger: "text-red-500",
    normal: "text-slate-900",
    disabled: "text-slate-200",
  };

  return (
    <div className="flex gap-3 items-center">
      <div className={clsx("relative", isRight && "order-3")}>
        <div
          className={
            "flex items-center gap-2 text-start text-teal-600 w-44"
        }
        >
          <Image src={avatar} width={48} height={48} alt="avatar" unoptimized />
          <div className="overflow-hidden">
            <div className="text-lg leading-tight truncate">{playerInfo.name}</div>
            <div className="text-slate-400 text-xs leading-tight">
              Рейтинг: {playerInfo.rating}
            </div>
          </div>
        </div>
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
