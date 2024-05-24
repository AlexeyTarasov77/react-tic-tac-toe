import { GAME_SYMBOLS } from "../constants";
import { getNextMove } from "./get-next-move";

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
}

export const gameStateReducer = (state, action) => {
  switch (action.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK:
      const { index } = action;
      if (state.cells[index]) {
        return state;
      }

      return {
        ...state,
        currentMove: getNextMove(state.currentMove, state.playersCount, []),
        cells: state.cells.map((cell, i) => i === index ? state.currentMove : cell
        ),
      };
  default:
    return state;
  }
};
export const initGameState = ({ playersCount }) => ({
  cells: new Array(19 * 19).fill(null),
  currentMove: GAME_SYMBOLS.CROSS,
  playersCount,
});
