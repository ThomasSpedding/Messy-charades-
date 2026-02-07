import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Check, X, Trophy } from 'lucide-react';
import { wordLists } from '../data/wordLists';

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;
  
  const [timeLeft, setTimeLeft] = useState(gameState?.timerDuration || 60);
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    // Get words for selected category
    const category = gameState?.selectedCategory;
    let selectedWords = [];
    
    if (category === 'random') {
      const allWords = [
        ...wordLists.films,
        ...wordLists.tv,
        ...wordLists['18plus'],
        ...wordLists.brands,
        ...wordLists.animals
      ];
      selectedWords = shuffleArray(allWords);
    } else {
      selectedWords = shuffleArray([...wordLists[category]]);
    }
    
    setWords(selectedWords.slice(0, 50));
  }, [gameState?.selectedCategory]);

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  useEffect(() => {
    if (!gameActive && timeLeft === 0) {
      // Time's up - go to results
      setTimeout(() => {
        navigate('/turn-end', {
          state: {
            ...gameState,
            pointsEarned: correctCount
          }
        });
      }, 1000);
    }
  }, [gameActive, timeLeft]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    nextWord();
  };

  const handleWrong = () => {
    setGameActive(false);
    navigate('/choose-fate', {
      state: {
        ...gameState,
        pointsEarned: correctCount,
        missedWord: words[currentWordIndex]
      }
    });
  };

  const nextWord = () => {
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    }
  };

  const currentWord = words[currentWordIndex] || 'Loading...';
  const timerColor = timeLeft <= 10 ? 'text-red-500' : timeLeft <= 20 ? 'text-orange-500' : 'text-green-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex flex-col">
      {/* Timer Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <span className="text-xl font-bold text-gray-800">{correctCount} pts</span>
          </div>
          <div className={`text-5xl font-black ${timerColor} drop-shadow-lg transition-colors duration-300`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Word Display - Rotated */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="transform rotate-180">
          <div className="bg-white rounded-3xl shadow-2xl p-12 min-w-[300px] text-center">
            <h2 className="text-6xl font-black text-gray-800 break-words">
              {currentWord}
            </h2>
          </div>
        </div>
      </div>

      {/* Action Buttons - Rotated */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg p-6 transform rotate-180">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-4">
          <Button
            onClick={handleWrong}
            className="h-24 text-2xl font-bold bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl"
            disabled={!gameActive}
          >
            <X className="w-10 h-10 mr-2" />
            Wrong
          </Button>
          
          <Button
            onClick={handleCorrect}
            className="h-24 text-2xl font-bold bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-xl"
            disabled={!gameActive}
          >
            <Check className="w-10 h-10 mr-2" />
            Correct
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;