import {ChessInstance, Move, ShortMove} from 'chess.js';

/**
 * Function to handle move in chessboard.
 *
 * @param params.setVisibleMoves Function set state to reload chessboard.
 * @param params.chess Chess instance.
 * @param params.position Position to move.
 */
const moveInChessBoard = (params: {
  setVisibleMoves?: (value: React.SetStateAction<Move[]>) => void;
  chess: ChessInstance;
  position: string | ShortMove;
}) => {
  const {chess, setVisibleMoves, position} = params;

  chess.move(position);
  setVisibleMoves && setVisibleMoves([]);
};

export {moveInChessBoard};
