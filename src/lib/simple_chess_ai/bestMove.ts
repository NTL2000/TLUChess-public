import {ChessInstance, ShortMove} from 'chess.js';
import {minimax} from './minimax';

const findBestMove = (params: {
  chess: ChessInstance;
  depth: number;
  reverse: boolean;
}): string | ShortMove => {
  const {depth, chess, reverse} = params;
  const possibleMoves: string[] = chess.moves();
  let bestMove: number = reverse ? Infinity : -Infinity;
  let bestMoveFound: string | ShortMove = '';

  // check game over
  if (possibleMoves.length === 0) {
    return '';
  }

  for (let i = 0; i < possibleMoves.length; i++) {
    let newGameMove = possibleMoves[i];
    chess.move(newGameMove);

    let value = minimax({
      game: chess,
      depth: depth - 1,
      alpha: -Infinity,
      beta: Infinity,
      isMaximizing: reverse,
    });
    chess.undo();
    if (reverse === false && value >= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
    if (reverse === true && value <= bestMove) {
      bestMove = value;
      bestMoveFound = newGameMove;
    }
  }

  return bestMoveFound;
};

export {findBestMove};
