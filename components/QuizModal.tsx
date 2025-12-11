
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import Modal from './Modal';

interface QuizModalProps {
  isOpen: boolean;
  question: QuizQuestion | null;
  onAnswer: (answer: string) => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!question) return null;
  
  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);
    setTimeout(() => {
        onAnswer(option);
        setSelectedAnswer(null);
    }, 1000); // Wait a bit to show feedback
  };

  return (
    <Modal isOpen={isOpen}>
      <div className="p-8 text-white">
        <h2 className="text-2xl font-bold mb-2 text-center text-yellow-300">Tantangan Pengetahuan!</h2>
        <p className="text-center text-slate-300 mb-6">Jawab dengan benar untuk mendapatkan bonus langkah!</p>
        <p className="text-lg mb-6 text-center">{question.question}</p>
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = question.correctAnswer === option;
            
            let buttonClass = 'bg-slate-700 hover:bg-slate-600';
            if (isSelected) {
              buttonClass = isCorrect ? 'bg-green-600' : 'bg-red-600';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={!!selectedAnswer}
                className={`w-full text-left p-4 rounded-lg font-semibold transition-all duration-300 ${buttonClass} disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default QuizModal;
