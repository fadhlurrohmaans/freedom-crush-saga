
import { GamePieceType } from './types';

export const BOARD_WIDTH = 8;
export const BOARD_HEIGHT = 8;
export const INITIAL_MOVES = 30;
export const TARGET_SCORE = 5000;
export const QUIZ_TRIGGER_SCORE = 1500; // Trigger quiz every 1500 points
export const POINTS_PER_MATCH = 50;
export const CORRECT_ANSWER_BONUS_MOVES = 5;

export const PIECE_TYPES: GamePieceType[] = [
  GamePieceType.Megaphone,
  GamePieceType.Newspaper,
  GamePieceType.Idea,
  GamePieceType.Vote,
  GamePieceType.Citizen,
  GamePieceType.Internet,
];

export const PIECE_COLORS: Record<GamePieceType, string> = {
  [GamePieceType.Megaphone]: 'bg-red-500',
  [GamePieceType.Newspaper]: 'bg-blue-500',
  [GamePieceType.Idea]: 'bg-yellow-400',
  [GamePieceType.Vote]: 'bg-green-500',
  [GamePieceType.Citizen]: 'bg-purple-500',
  [GamePieceType.Internet]: 'bg-sky-500',
};
