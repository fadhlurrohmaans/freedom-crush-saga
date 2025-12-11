
import React from 'react';
import Modal from './Modal';
import { GameStatus } from '../types';

interface GameStatusModalProps {
  status: GameStatus.GameOver | GameStatus.Won;
  score: number;
  onRestart: () => void;
}

const GameStatusModal: React.FC<GameStatusModalProps> = ({ status, score, onRestart }) => {
  const isWin = status === GameStatus.Won;
  const title = isWin ? "Selamat, Anda Menang!" : "Permainan Berakhir";
  const message = isWin
    ? "Anda berhasil mencapai target skor. Pengetahuan Anda tentang kebebasan berpendapat sangat baik!"
    : "Jangan menyerah! Coba lagi untuk meningkatkan skormu dan pengetahuanmu.";
  const titleColor = isWin ? "text-green-400" : "text-red-500";

  return (
    <Modal isOpen={true}>
      <div className="p-8 text-white text-center">
        <h2 className={`text-3xl font-bold mb-4 ${titleColor}`}>{title}</h2>
        <p className="text-slate-300 mb-6">{message}</p>
        <div className="text-xl font-semibold mb-8">
          Skor Akhir: <span className="text-yellow-300">{score}</span>
        </div>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
        >
          Main Lagi
        </button>
      </div>
    </Modal>
  );
};

export default GameStatusModal;
