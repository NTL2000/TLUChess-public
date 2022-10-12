import {ChessInstance} from 'chess.js';
import {getPieceValue} from './pieceValue';

export const getBoardValue = (params: {
  board: ReturnType<ChessInstance['board']>;
}) => {
  const {board} = params;
  var totalEvaluation = 0;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation =
        totalEvaluation + getPieceValue({piece: board[i][j], x: i, y: j});
    }
  }
  return totalEvaluation;
};
