import {Move} from 'chess.js';

interface Room {
  roomId: string;
  currentFen: string;
  latestMove: Move;
  roomOwner: string;
  opponent?: string;
}

export type {Room};
