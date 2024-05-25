import { MOVE_ORDERS } from "../constants";


export function getNextMove(gameState) {
    const slicedOrder = MOVE_ORDERS.slice(0, gameState.playersCount).filter((symbol) => gameState.timers[symbol] > 0);
    const nextMoveIndex = slicedOrder.indexOf(gameState.currentMove) + 1;
    return slicedOrder[nextMoveIndex] ?? slicedOrder[0];
}
