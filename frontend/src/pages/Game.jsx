import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Check, X, Trophy, ArrowUp, ArrowDown } from 'lucide-react';
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
  const [swipeDirection, setSwipeDirection] = useState(null);
  
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const gameAreaRef = useRef(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive, timeLeft]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (!gameActive) return;
    
    const swipeDistance = touchStartY.current - touchEndY.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped up - Correct
        handleCorrect();
        setSwipeDirection('up');
        setTimeout(() => setSwipeDirection(null), 300);
      } else {
        // Swiped down - Wrong
        handleWrong();
        setSwipeDirection('down');
        setTimeout(() => setSwipeDirection(null), 300);
      }
    }

    touchStartY.current = 0;
    touchEndY.current = 0;
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
    <div 
      className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex flex-col relative overflow-hidden"
      ref={gameAreaRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Indicators */}
      {swipeDirection === 'up' && (
        <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center z-50 animate-fade-out pointer-events-none">
          <ArrowUp className="w-32 h-32 text-white drop-shadow-2xl" />
        </div>
      )}
      {swipeDirection === 'down' && (
        <div className="absolute inset-0 bg-red-500/30 flex items-center justify-center z-50 animate-fade-out pointer-events-none">
          <ArrowDown className="w-32 h-32 text-white drop-shadow-2xl" />
        </div>
      )}

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

      {/* Word Display - NOT Rotated */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 min-w-[300px] max-w-2xl w-full text-center">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-800 break-words">
            {currentWord}
          </h2>
        </div>
      </div>

      {/* Swipe Instructions */}
      <div className="bg-white/90 backdrop-blur-sm shadow-lg p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-8 text-gray-700">
            <div className="flex flex-col items-center">
              <ArrowUp className="w-10 h-10 text-green-600 mb-2" />
              <span className="text-sm font-semibold">Swipe Up</span>
              <span className="text-xs text-gray-500">Correct</span>
            </div>
            <div className="text-2xl font-black text-gray-400">|</div>
            <div className="flex flex-col items-center">
              <ArrowDown className="w-10 h-10 text-red-600 mb-2" />
              <span className="text-sm font-semibold">Swipe Down</span>
              <span className="text-xs text-gray-500">Wrong</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;