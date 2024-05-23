import { MOVE_ORDERS } from "../constants";


export function getNextMove(currentMove, playersCount, playersTimeOver) {
    const slicedOrder = MOVE_ORDERS.slice(0, playersCount).filter((symbol) => !playersTimeOver.includes(symbol));
    const nextMoveIndex = slicedOrder.indexOf(currentMove) + 1;
    return slicedOrder[nextMoveIndex] ?? slicedOrder[0];
}
