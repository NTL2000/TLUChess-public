import {ChessInstance, Move} from 'chess.js';
import {simpleAi} from '../../utils/constants';
import {moveInChessBoard} from '../../utils/helpers/move';
import {findBestMove} from './bestMove';

const ai = (params: {
  depth?: number;
  chess: ChessInstance;
  reverse: boolean;
  setVisibleMoves: (value: React.SetStateAction<Move[]>) => void;
}): void => {
  const {chess, reverse, setVisibleMoves, depth} = params;

  if (
    !chess.game_over() &&
    ((reverse === false && chess.turn() === 'b') ||
      (reverse === true && chess.turn() === 'w'))
  ) {
    // Run ai asynchronously.
    setTimeout(() => {
      const bestMoveFound = findBestMove({
        chess,
        depth: depth ?? simpleAi.defaultLevel,
        reverse,
      });
      bestMoveFound !== '' &&
        moveInChessBoard({chess, position: bestMoveFound, setVisibleMoves});
    });
  }
};

export {ai};
