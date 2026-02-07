import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Trophy, Beer, Home } from 'lucide-react';

const FinalScores = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;

  const sortedScores = Object.entries(gameState?.scores || {})
    .sort(([, a], [, b]) => b - a);
  
  const winner = sortedScores[0];
  const loser = sortedScores[sortedScores.length - 1];

  const playAgain = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-6">
          <div className="space-y-4">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto animate-bounce" />
            
            <h1 className="text-5xl font-black text-gray-800">
              Game Over!
            </h1>
          </div>

          <div className="space-y-6 pt-4">
            {/* Winner */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl border-4 border-yellow-400">
              <p className="text-3xl font-black text-yellow-600 mb-2">👑 WINNER 👑</p>
              <p className="text-4xl font-black text-gray-800">{winner[0]}</p>
              <p className="text-5xl font-black text-yellow-600 mt-2">{winner[1]} points</p>
            </div>

            {/* All Scores */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Final Scores</h3>
              <div className="space-y-3">
                {sortedScores.map(([player, score], index) => (
                  <div 
                    key={player}
                    className={`flex justify-between items-center px-6 py-4 rounded-xl ${
                      index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                      index === sortedScores.length - 1 ? 'bg-red-50 border-2 border-red-300' :
                      'bg-gray-50'
                    }`}
                  >
                    <span className="text-xl font-bold text-gray-800">
                      {index + 1}. {player}
                    </span>
                    <span className="text-2xl font-black text-gray-700">
                      {score} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loser Drinks */}
            <div className="bg-gradient-to-br from-red-100 to-pink-100 p-6 rounded-2xl border-4 border-red-400">
              <Beer className="w-16 h-16 text-red-600 mx-auto mb-3 animate-bounce" />
              <p className="text-2xl font-black text-red-600 mb-2">
                {loser[0]} has the lowest score!
              </p>
              <p className="text-4xl font-black text-gray-800">
                TIME TO DRINK! 🍺
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          <Button
            onClick={playAgain}
            className="w-full h-16 text-2xl font-bold bg-white text-orange-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-xl"
          >
            <Home className="w-8 h-8 mr-3" />
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalScores;