import {useState} from 'react';
import {Chess, ChessInstance} from 'chess.js';

const useChess = (fen?: string) => {
  const [chessInstance] = useState<ChessInstance>(new Chess(fen));

  return chessInstance;
};

export default useChess;
