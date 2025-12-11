
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import GamePiece from './GamePiece';
import type { GameBoard } from '../types';

interface GameBoardProps {
  board: GameBoard;
  selectedPiece: { x: number; y: number } | null;
  onPieceClick: (x: number, y: number) => void;
}

const GameBoardComponent: React.FC<GameBoardProps> = ({ board, selectedPiece, onPieceClick }) => {
  return (
    <div className="bg-slate-700 bg-opacity-50 p-2 rounded-xl shadow-2xl">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${board[0]?.length || 0}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
          width: 'clamp(300px, 90vw, 500px)',
          height: 'clamp(300px, 90vw, 500px))',
        }}
      >
        <AnimatePresence>
          {board.map((row, y) =>
            row.map((pieceType, x) => (
              pieceType ? (
                <GamePiece
                  key={`${y}-${x}-${pieceType}`}
                  type={pieceType}
                  x={x}
                  y={y}
                  isSelected={selectedPiece?.x === x && selectedPiece?.y === y}
                  onClick={onPieceClick}
                />
              ) : null
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameBoardComponent;
