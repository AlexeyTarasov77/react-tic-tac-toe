import { GAME_SYMBOLS, MOVE_ORDERS } from "../constants";
import { getNextMove } from "./get-next-move";

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
  TICK: "tick",
};

export const initGameState = ({ playersCount, defaultTimer, currentMoveStart }) => ({
  cells: new Array(19 * 19).fill(null),
  currentMove: GAME_SYMBOLS.CROSS,
  currentMoveStart,
  playersCount,
  timers: MOVE_ORDERS.reduce((timers, symbol, index) => {
    if (index < playersCount) {
      timers[symbol] = defaultTimer;
    }
    return timers;
  }, {}),
});

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK:
      {const { index, now } = action;
      if (state.cells[index]) {
        return state;
      }

      return {
        ...state,
        currentMove: getNextMove(state),
        timers: updateTimers(state, now),
        currentMoveStart: now,
        cells: updateCell(state, index),
      };}

    case GAME_STATE_ACTIONS.TICK:
      {
        const { now } = action;
        if (!isTimeOver(state, now)) {
          return state;
        }
        return {
          ...state,
          currentMove: getNextMove(state),
          timers: updateTimers(state, now),
          currentMoveStart: now,
        };}

    default:
      return state;
  }
};

const updateCell = (state, index) => {
  return state.cells.map((cell, i) =>
    i === index ? state.currentMove : cell
  );
}

const updateTimers = (state, now) => {
  const diff = now - state.currentMoveStart;
  const timer = state.timers[state.currentMove];

  return {
    ...state.timers,
    [state.currentMove]: Math.max(0, timer - diff),
  }
}

const isTimeOver = (state, now) => {
  const timer = updateTimers(state, now)[state.currentMove];
  return timer <= 0;
}