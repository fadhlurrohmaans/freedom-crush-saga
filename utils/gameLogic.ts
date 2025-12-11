
import { BOARD_WIDTH, BOARD_HEIGHT, PIECE_TYPES } from '../constants';
import type { GameBoard, GamePieceType } from '../types';

export const createNewBoard = (): GameBoard => {
  const newBoard: GameBoard = [];
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    const row: GamePieceType[] = [];
    for (let x = 0; x < BOARD_WIDTH; x++) {
      let newPiece: GamePieceType;
      do {
        newPiece = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
      } while (
        (x >= 2 && newPiece === row[x - 1] && newPiece === row[x - 2]) ||
        (y >= 2 && newPiece === newBoard[y - 1][x] && newPiece === newBoard[y - 2][x])
      );
      row.push(newPiece);
    }
    newBoard.push(row);
  }
  return newBoard;
};

export const checkForMatches = (board: GameBoard): { board: GameBoard; matchesFound: number } => {
  const matches = new Set<string>();
  const newBoard = board.map(row => [...row]);

  // Check horizontal matches
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH - 2; x++) {
      const piece = newBoard[y][x];
      if (piece && piece === newBoard[y][x + 1] && piece === newBoard[y][x + 2]) {
        matches.add(`${y}-${x}`);
        matches.add(`${y}-${x + 1}`);
        matches.add(`${y}-${x + 2}`);
      }
    }
  }

  // Check vertical matches
  for (let y = 0; y < BOARD_HEIGHT - 2; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const piece = newBoard[y][x];
      if (piece && piece === newBoard[y + 1][x] && piece === newBoard[y + 2][x]) {
        matches.add(`${y}-${x}`);
        matches.add(`${y + 1}-${x}`);
        matches.add(`${y + 2}-${x}`);
      }
    }
  }
  
  const matchesFound = matches.size;
  matches.forEach(coord => {
    const [y, x] = coord.split('-').map(Number);
    newBoard[y][x] = null;
  });

  return { board: newBoard, matchesFound };
};

export const cascadePieces = (board: GameBoard): GameBoard => {
    const newBoard = board.map(row => [...row]);

    for (let x = 0; x < BOARD_WIDTH; x++) {
        const column = [];
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            if (newBoard[y][x] !== null) {
                column.push(newBoard[y][x]);
            }
        }
        
        const nullsToAdd = BOARD_HEIGHT - column.length;
        for(let i = 0; i < nullsToAdd; i++) {
            newBoard[i][x] = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
        }

        for(let i = 0; i < column.length; i++) {
            newBoard[i + nullsToAdd][x] = column[i];
        }
    }
    return newBoard;
};
