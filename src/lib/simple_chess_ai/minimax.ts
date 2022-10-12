import {ChessInstance} from 'chess.js';
import {getBoardValue} from './boardEvaluation';

export const minimax = (params: {
  game: ChessInstance;
  depth: number;
  alpha: number;
  beta: number;
  isMaximizing: boolean;
}) => {
  const {game, depth, isMaximizing} = params;
  let {alpha, beta} = params;

  if (depth === 0) {
    return -getBoardValue({board: game.board()});
  }

  const possibleMoves = game.moves();

  if (isMaximizing) {
    let bestMove = -Infinity;
    possibleMoves.forEach((_, i) => {
      game.move(possibleMoves[i]);
      bestMove = Math.max(
        bestMove,
        minimax({game, depth: depth - 1, alpha, beta, isMaximizing: false}),
      );
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    });
    return bestMove;
  } else {
    let bestMove = Infinity;
    possibleMoves.forEach((_, i) => {
      game.move(possibleMoves[i]);
      bestMove = Math.min(
        bestMove,
        minimax({game, depth: depth - 1, alpha, beta, isMaximizing: true}),
      );
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    });
    return bestMove;
  }
};
