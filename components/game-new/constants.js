import avatar1 from "./ui/images/avatar-1.png";
import avatar2 from "./ui/images/avatar-2.png";
import avatar3 from "./ui/images/avatar-3.png";
import avatar4 from "./ui/images/avatar-4.png";

export const GAME_SYMBOLS = {
    ZERO: "zero",
    CROSS: "cross",
    TRIANGLE: "triangle",
    SQUARE: "square",
}

export const MOVE_ORDERS = [
    GAME_SYMBOLS.CROSS,
    GAME_SYMBOLS.ZERO,
    GAME_SYMBOLS.TRIANGLE,
    GAME_SYMBOLS.SQUARE,
]

export const PLAYERS = [
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