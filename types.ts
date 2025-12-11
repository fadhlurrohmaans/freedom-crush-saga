
export enum GamePieceType {
  Megaphone = 'Megaphone',
  Newspaper = 'Newspaper',
  Idea = 'Idea',
  Vote = 'Vote',
  Citizen = 'Citizen',
  Internet = 'Internet',
}

export type GameBoard = (GamePieceType | null)[][];

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export enum GameStatus {
  Loading,
  Playing,
  Quiz,
  GameOver,
  Won,
}
