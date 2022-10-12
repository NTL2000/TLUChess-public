import {ChessInstance} from 'chess.js';

const getLatestMoveFromMoveHistory = (params: {
  moveHistory: string[];
  inCheck: boolean;
}): {fileLatest: string; rankLatest: string} => {
  const {moveHistory, inCheck} = params;

  const moveLatestSplit = moveHistory[moveHistory.length - 1].split('');
  const [fileLatest, rankLatest] = inCheck
    ? [
        moveLatestSplit[moveLatestSplit.length - 3],
        moveLatestSplit[moveLatestSplit.length - 2],
      ]
    : [
        moveLatestSplit[moveLatestSplit.length - 2],
        moveLatestSplit[moveLatestSplit.length - 1],
      ];

  return {fileLatest, rankLatest};
};

const convertFromLatestMoveToPosition = (params: {
  reverse?: boolean;
  fileLatest: string;
  rankLatest: string;
  cellSize: number;
}): {leftLatest: number; bottomLatest: number} => {
  const {reverse, fileLatest, rankLatest, cellSize} = params;

  const leftLatest =
    reverse === true
      ? ('h'.charCodeAt(0) - fileLatest.charCodeAt(0)) * cellSize
      : (fileLatest.charCodeAt(0) - 'a'.charCodeAt(0)) * cellSize;
  const bottomLatest =
    reverse === true
      ? (8 - Number(rankLatest)) * cellSize
      : (Number(rankLatest) - 1) * cellSize;

  return {leftLatest, bottomLatest};
};

const getPositionOfLatestMoveInChessBoard = (params: {
  reverse?: boolean;
  chess: ChessInstance;
  cellSize: number;
}): {leftLatest: number; bottomLatest: number} => {
  const {reverse, chess, cellSize} = params;
  let latestPosition: {leftLatest: number; bottomLatest: number} = {
    leftLatest: -1,
    bottomLatest: -1,
  };
  const moveHistory = chess.history();

  if (moveHistory.length > 0) {
    const inCheck = chess.in_check();
    const {fileLatest, rankLatest} = getLatestMoveFromMoveHistory({
      moveHistory,
      inCheck,
    });

    latestPosition = convertFromLatestMoveToPosition({
      reverse,
      fileLatest,
      rankLatest,
      cellSize,
    });
  }

  return latestPosition;
};

export {getPositionOfLatestMoveInChessBoard};
