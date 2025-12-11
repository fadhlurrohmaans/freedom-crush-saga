
import React from 'react';
import { motion } from 'framer-motion';
// FIX: Changed 'import type' to 'import' as GamePieceType is an enum used as a value.
import { GamePieceType } from '../types';
import { PIECE_COLORS } from '../constants';

// SVG icons defined as components
const MegaphoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M14 8.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 1 .75-.75ZM7.5 9.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5ZM10.5 6.75a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0v-9a.75.75 0 0 1 .75-.75ZM16.5 9a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6ZM4.125 7.525a.75.75 0 0 1 .75-.75h.01a.75.75 0 0 1 .75.75v8.95a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75v-8.95ZM18.75 9a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0v-6Z" /></svg>;
const NewspaperIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M3.75 6a3 3 0 0 1 3-3h13.5a.75.75 0 0 1 0 1.5H6.75A1.5 1.5 0 0 0 5.25 6v10.5a1.5 1.5 0 0 0 1.5 1.5h10.5a1.5 1.5 0 0 0 1.5-1.5V12a.75.75 0 0 1 1.5 0v4.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6Z" clipRule="evenodd" /><path d="M10.5 10.5a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Zm0 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" /></svg>;
const IdeaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 2.25a.75.75 0 0 1 .75.75v.518c.988.26 1.915.64 2.774 1.142a.75.75 0 0 1-.364 1.393c-.973-.52-2.028-.888-3.16-1.034v1.23a.75.75 0 0 1-1.5 0v-1.23c-1.132.146-2.187.514-3.16 1.034a.75.75 0 0 1-.364-1.393c.859-.502 1.786-.882 2.774-1.142V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" /><path fillRule="evenodd" d="M9.462 8.034a.75.75 0 0 1 .71-.043l.858.43a.75.75 0 0 1 0 1.357l-.858.43a.75.75 0 0 1-.71-.043C8.4 10.02 8.25 8.98 9.462 8.034ZM15.25 10.5a.75.75 0 0 0-.71.043c-1.212.946-1.062 1.986-.002 2.571a.75.75 0 0 0 .71-.043l.858-.43a.75.75 0 0 0 0-1.357l-.858-.43Z" clipRule="evenodd" /><path d="M4.5 9.75a.75.75 0 0 0-1.5 0v.041a8.21 8.21 0 0 0 .14 1.252 9.715 9.715 0 0 0 6.61 6.61 8.21 8.21 0 0 0 1.252.14h.041a.75.75 0 0 0 0-1.5h-.041a6.711 6.711 0 0 1-5.36-5.36 6.71 6.71 0 0 1-.11-1.023V9.75Zm16.5 0a.75.75 0 0 0-1.5 0v.041c.002.349-.034.69-.11 1.023a6.711 6.711 0 0 1-5.36 5.36h-.342a.75.75 0 0 0 0 1.5h.342a8.211 8.211 0 0 0 6.37-6.37c.098-.44.148-.891.15-1.352V9.75Z" /></svg>;
const VoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M3.75 3A.75.75 0 0 0 3 3.75v16.5c0 .414.336.75.75.75h16.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75H3.75Zm8.25 15a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-.75.75Z" clipRule="evenodd" /><path d="M12 7.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" /></svg>;
const CitizenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>;
const InternetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path fillRule="evenodd" d="M12.001 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75-4.365-9.75-9.75-9.75ZM9.001 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" clipRule="evenodd" /><path d="M2.25 12c0-3.722 2.05-6.942 5.006-8.524a.75.75 0 0 1 .494 1.326 6.75 6.75 0 0 0 0 14.402a.75.75 0 0 1-.494 1.325C4.3 18.942 2.25 15.722 2.25 12Z" /><path d="M16.744 3.476a.75.75 0 0 1 .494-1.325C19.7 3.658 21.75 6.878 21.75 10.5c0 3.622-2.05 6.842-5.006 8.524a.75.75 0 0 1-.494-1.326 6.75 6.75 0 0 0 0-14.402Z" /></svg>;


const PIECE_ICONS: Record<GamePieceType, React.FC> = {
  [GamePieceType.Megaphone]: MegaphoneIcon,
  [GamePieceType.Newspaper]: NewspaperIcon,
  [GamePieceType.Idea]: IdeaIcon,
  [GamePieceType.Vote]: VoteIcon,
  [GamePieceType.Citizen]: CitizenIcon,
  [GamePieceType.Internet]: InternetIcon,
};

interface GamePieceProps {
  type: GamePieceType;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: (x: number, y: number) => void;
}

const GamePiece: React.FC<GamePieceProps> = ({ type, x, y, isSelected, onClick }) => {
  const color = PIECE_COLORS[type];
  const Icon = PIECE_ICONS[type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full p-1"
      onClick={() => onClick(x, y)}
    >
      <div
        className={`w-full h-full rounded-lg shadow-lg flex items-center justify-center p-1.5 md:p-2 transform transition-transform duration-200 ${
          isSelected ? 'scale-110 ring-4 ring-white ring-opacity-80' : 'hover:scale-105'
        } ${color}`}
      >
        <Icon />
      </div>
    </motion.div>
  );
};

export default GamePiece;
