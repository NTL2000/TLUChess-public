import {ChessInstance} from 'chess.js';
import {GameStatus} from '../../../types/chess';

const computeGameStatus = ({
  chess,
  currentColor,
}: {
  chess: ChessInstance;
  currentColor: 'w' | 'b';
}): GameStatus => {
  if (chess.game_over()) {
    if (
      (chess.turn() === 'b' && currentColor === 'w') ||
      (chess.turn() === 'w' && currentColor === 'b')
    ) {
      return GameStatus.win;
    } else {
      return GameStatus.lost;
    }
  }

  return GameStatus.playing;
};

export {computeGameStatus};
