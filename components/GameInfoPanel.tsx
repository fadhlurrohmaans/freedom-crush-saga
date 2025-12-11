
import React from 'react';
import { TARGET_SCORE } from '../constants';

interface GameInfoPanelProps {
  score: number;
  movesLeft: number;
  onRestart: () => void;
}

const GameInfoPanel: React.FC<GameInfoPanelProps> = ({ score, movesLeft, onRestart }) => {
  const scoreProgress = Math.min((score / TARGET_SCORE) * 100, 100);

  return (
    <div className="w-full max-w-md bg-slate-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-lg text-white space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-yellow-300">Freedom Crush</h2>
        <button
          onClick={onRestart}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Restart
        </button>
      </div>

      <div className="flex justify-around text-center">
        <div>
          <div className="text-sm font-semibold text-slate-300">SKOR</div>
          <div className="text-3xl font-bold">{score}</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-300">LANGKAH</div>
          <div className="text-3xl font-bold">{movesLeft}</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1 text-sm font-medium">
            <span>Progress</span>
            <span>Target: {TARGET_SCORE}</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-4">
            <div 
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${scoreProgress}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
};

export default GameInfoPanel;
