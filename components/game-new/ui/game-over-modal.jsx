import { UiModal, UiButton } from "../../uikit";
import clsx from "clsx";

export function GameOverModal({
  winnerName,
  playersList
}) {
  return (
    <UiModal isOpen={!!winnerName} onClose={() => console.log("closing modal")}>
      <UiModal.Header className={clsx()}>Игра завершена</UiModal.Header>
      <UiModal.Body>
        <div className="text-sm">
          Победитель: <span className="text-teal-600">{winnerName}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {playersList}
        </div>
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
  );
}
