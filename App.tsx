
import React, { useState, useEffect, useCallback } from 'react';
import GameBoardComponent from './components/GameBoard';
import GameInfoPanel from './components/GameInfoPanel';
import QuizModal from './components/QuizModal';
import GameStatusModal from './components/GameStatusModal';
import { generateQuizQuestions } from './services/geminiService';
import { createNewBoard, checkForMatches, cascadePieces } from './utils/gameLogic';
import { GameStatus } from './types';
import type { GameBoard, QuizQuestion } from './types';
import { INITIAL_MOVES, TARGET_SCORE, POINTS_PER_MATCH, QUIZ_TRIGGER_SCORE, CORRECT_ANSWER_BONUS_MOVES } from './constants';

const App: React.FC = () => {
  const [board, setBoard] = useState<GameBoard>(createNewBoard());
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(INITIAL_MOVES);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Loading);
  const [selectedPiece, setSelectedPiece] = useState<{ x: number; y: number } | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lastQuizScore, setLastQuizScore] = useState(0);

  const startNewGame = useCallback(() => {
    setGameStatus(GameStatus.Loading);
    generateQuizQuestions().then(questions => {
      setQuizQuestions(questions);
      setBoard(createNewBoard());
      setScore(0);
      setMovesLeft(INITIAL_MOVES);
      setSelectedPiece(null);
      setCurrentQuestionIndex(0);
      setLastQuizScore(0);
      setGameStatus(GameStatus.Playing);
    });
  }, []);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const processMatches = useCallback((currentBoard: GameBoard) => {
    let boardAfterMatches = currentBoard;
    let totalPoints = 0;
    let keepProcessing = true;
  
    const processStep = () => {
      const { board: boardWithMatchesRemoved, matchesFound } = checkForMatches(boardAfterMatches);
      
      if (matchesFound > 0) {
        totalPoints += matchesFound * POINTS_PER_MATCH;
        const cascadedBoard = cascadePieces(boardWithMatchesRemoved);
        boardAfterMatches = cascadedBoard;
        setBoard(cascadedBoard); // Update UI after each cascade
      } else {
        keepProcessing = false;
      }
    };
  
    // Use a timeout loop to allow UI to update between cascades
    const loop = () => {
      if(keepProcessing) {
        processStep();
        setTimeout(loop, 200);
      } else {
        if (totalPoints > 0) {
          setScore(prevScore => prevScore + totalPoints);
        }
      }
    };
    
    loop();
  
  }, []);

  const handlePieceClick = useCallback((x: number, y: number) => {
    if (gameStatus !== GameStatus.Playing) return;

    if (selectedPiece) {
      // It's the second piece click
      const { x: prevX, y: prevY } = selectedPiece;
      
      // Check if they are adjacent
      const isAdjacent = Math.abs(prevX - x) + Math.abs(prevY - y) === 1;

      if (isAdjacent) {
        // Swap pieces
        const newBoard = board.map(row => [...row]);
        const temp = newBoard[prevY][prevX];
        newBoard[prevY][prevX] = newBoard[y][x];
        newBoard[y][x] = temp;

        // Check if the swap creates a match
        const { matchesFound } = checkForMatches(newBoard);
        
        if (matchesFound > 0) {
          setBoard(newBoard);
          setMovesLeft(m => m - 1);
          setTimeout(() => processMatches(newBoard), 100);
        }
        // If no match, we don't swap back - the move is simply lost in this version
      }
      setSelectedPiece(null); // Deselect after any second click
    } else {
      // It's the first piece click
      setSelectedPiece({ x, y });
    }
  }, [board, selectedPiece, processMatches, gameStatus]);
  
  // Check for game over or win conditions
  useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    if (score >= TARGET_SCORE) {
      setGameStatus(GameStatus.Won);
    } else if (movesLeft <= 0) {
      setGameStatus(GameStatus.GameOver);
    }
  }, [score, movesLeft, gameStatus]);
  
  // Check for quiz trigger
  useEffect(() => {
    if (gameStatus !== GameStatus.Playing) return;

    if (score >= lastQuizScore + QUIZ_TRIGGER_SCORE) {
      if (currentQuestionIndex < quizQuestions.length) {
        setGameStatus(GameStatus.Quiz);
        setLastQuizScore(s => s + QUIZ_TRIGGER_SCORE);
      }
    }
  }, [score, lastQuizScore, currentQuestionIndex, quizQuestions.length, gameStatus]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestion.correctAnswer === answer) {
      setMovesLeft(m => m + CORRECT_ANSWER_BONUS_MOVES);
    }
    setCurrentQuestionIndex(i => i + 1);
    setGameStatus(GameStatus.Playing);
  };

  return (
    <main className="bg-slate-900 min-h-screen w-full flex flex-col items-center justify-center p-4 text-white font-sans bg-gradient-to-br from-slate-900 to-indigo-900">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        <GameInfoPanel score={score} movesLeft={movesLeft} onRestart={startNewGame} />
        {gameStatus === GameStatus.Loading ? (
           <div className="flex items-center justify-center w-[clamp(300px,90vw,500px)] h-[clamp(300px,90vw,500px)] bg-slate-700 bg-opacity-50 rounded-xl">
             <p className="text-xl">Loading Game...</p>
           </div>
        ) : (
          <GameBoardComponent board={board} selectedPiece={selectedPiece} onPieceClick={handlePieceClick} />
        )}
      </div>

      <QuizModal 
        isOpen={gameStatus === GameStatus.Quiz}
        question={quizQuestions[currentQuestionIndex] || null}
        onAnswer={handleAnswer}
      />
      {(gameStatus === GameStatus.GameOver || gameStatus === GameStatus.Won) && (
        <GameStatusModal status={gameStatus} score={score} onRestart={startNewGame} />
      )}
    </main>
  );
};

export default App;
