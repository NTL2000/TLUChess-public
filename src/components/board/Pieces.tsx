import {colors, pieces} from '../../utils/constants';
import {TouchableWithoutFeedback, Image, View} from 'react-native';
import {ChessInstance, Square} from 'chess.js';
import nonNull from '../../utils/optimusCore/nonNull';
import {PieceSquare} from '../../../types/board/piece';
import React from 'react';
import {getPositionOfLatestMoveInChessBoard} from '../../utils/helpers/position';

type PropsOfPiecesComponent = {
  reverse?: boolean;
  chess: ChessInstance;
  board: Array<Array<PieceSquare | null>>;
  size: number;
  onSelectPiece: (square: Square) => void;
};

const Pieces: React.FC<PropsOfPiecesComponent> = (
  params: PropsOfPiecesComponent,
) => {
  const {reverse, chess, board, size, onSelectPiece} = params;
  const {pieceImages} = pieces;
  const cellSize = size / 8;
  const {leftLatest, bottomLatest} = getPositionOfLatestMoveInChessBoard({
    reverse,
    chess,
    cellSize,
  });

  const pieceList = board
    .flat()
    .filter(cell => cell)
    .map(piece => {
      const {square, type, color}: PieceSquare = nonNull(piece);
      const [file, rank] = square.split('');
      const left =
        reverse === true
          ? ('h'.charCodeAt(0) - file.charCodeAt(0)) * cellSize
          : (file.charCodeAt(0) - 'a'.charCodeAt(0)) * cellSize;
      const bottom =
        reverse === true
          ? (8 - Number(rank)) * cellSize
          : (Number(rank) - 1) * cellSize;
      const isChecked =
        chess.in_check() && chess.turn() === color && type === 'k';

      return (
        <TouchableWithoutFeedback
          key={`piece-${square}`}
          onPress={() => onSelectPiece(square)}>
          <Image
            style={{
              position: 'absolute',
              width: cellSize,
              height: cellSize,
              left,
              bottom,
              backgroundColor: isChecked
                ? colors.inCheck
                : left === leftLatest && bottom === bottomLatest
                ? colors.latestMove
                : 'transparent',
            }}
            source={pieceImages[`${color}${type}`]}
          />
        </TouchableWithoutFeedback>
      );
    });

  return <View>{pieceList}</View>;
};

export default Pieces;
