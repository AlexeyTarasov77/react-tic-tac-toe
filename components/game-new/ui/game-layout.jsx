
/**
 * Renders a layout for a game with a back link, title, and game information.
 *
 * @param {Object} props - The properties for the GameLayout component.
 * @param {ReactNode} props.backLink - The back link component.
 * @param {ReactNode} props.title - The title component.
 * @param {ReactNode} props.gameInfo - The game information component.
 * @param {ReactNode} props.playersList - The list of players component.
 * @param {ReactNode} props.gameMoveInfo - The game move information component.
 * @param {ReactNode} props.actions - The actions component.
 * @param {ReactNode} props.gameCells - The game cells component.
 * @return {ReactElement} The rendered GameLayout component.
 */
export function GameLayout({
  backLink,
  title,
  gameInfo,
  playersList,
  gameMoveInfo,
  actions,
  gameCells
}) {
  return (
    <div className="pb-10">
      <div className="pl-2">
        {backLink}
        {title}
        {gameInfo}
        <div className="bg-white rounded-2xl shadow-md px-8 py-4 grid grid-cols-2 gap-3 mt-4">
          {playersList}
        </div>
        <div className="mt-6 bg-white rounded-2xl shadow-md px-8 pt-5 pb-7">
          <div className="flex justify-between items-center">
            <div>{gameMoveInfo}</div>
            <div>
              <div className="flex gap-3">{actions}</div>
            </div>
          </div>
          <div className="grid grid-cols-[repeat(19,30px)] grid-rows-[repeat(19,30px)] mt-3 pl-px pt-px">
            {gameCells}
          </div>
        </div>
      </div>
    </div>
  );
}
