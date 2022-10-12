import {ImageSourcePropType} from 'react-native';

const blackBishop: ImageSourcePropType = require('../../../assets/pieces/bB.png');
const whiteBishop: ImageSourcePropType = require('../../../assets/pieces/wB.png');
const blackKing: ImageSourcePropType = require('../../../assets/pieces/bK.png');
const whiteKing: ImageSourcePropType = require('../../../assets/pieces/wK.png');
const blackKnight: ImageSourcePropType = require('../../../assets/pieces/bN.png');
const whiteKnight: ImageSourcePropType = require('../../../assets/pieces/wN.png');
const blackPawn: ImageSourcePropType = require('../../../assets/pieces/bP.png');
const whitePawn: ImageSourcePropType = require('../../../assets/pieces/wP.png');
const blackQueen: ImageSourcePropType = require('../../../assets/pieces/bQ.png');
const whiteQueen: ImageSourcePropType = require('../../../assets/pieces/wQ.png');
const blackRook: ImageSourcePropType = require('../../../assets/pieces/bR.png');
const whiteRook: ImageSourcePropType = require('../../../assets/pieces/wR.png');

const pieceImages = {
  br: blackRook,
  bq: blackQueen,
  bp: blackPawn,
  bk: blackKing,
  bn: blackKnight,
  bb: blackBishop,
  wr: whiteRook,
  wq: whiteQueen,
  wp: whitePawn,
  wk: whiteKing,
  wn: whiteKnight,
  wb: whiteBishop,
};

export default {
  pieceImages,
};
