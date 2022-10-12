import {Piece, Square} from 'chess.js';

/**
 * Properties of piece and square.
 */
interface PieceSquare extends Piece {
  square: Square;
}

export type {PieceSquare};
