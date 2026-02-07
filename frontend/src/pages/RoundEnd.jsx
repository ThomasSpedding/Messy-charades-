import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { PartyPopper, ArrowRight } from 'lucide-react';

const RoundEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;

  const continueToNextRound = () => {
    navigate('/categories', {
      state: gameState
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-6">
        <div className="space-y-4">
          <PartyPopper className="w-20 h-20 text-green-600 mx-auto animate-bounce" />
          
          <h1 className="text-4xl font-black text-gray-800">
            Round {gameState?.currentRound - 1} Complete!
          </h1>
          
          <p className="text-2xl text-gray-600 font-bold">
            Starting Round {gameState?.currentRound}
          </p>

          <div className="pt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-3">Scores After Round {gameState?.currentRound - 1}</h3>
            <div className="space-y-2">
              {Object.entries(gameState?.scores || {})
                .sort(([, a], [, b]) => b - a)
                .map(([player, score], index) => (
                  <div 
                    key={player} 
                    className={`flex justify-between items-center px-4 py-3 rounded-lg ${
                      index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'
                    }`}
                  >
                    <span className="font-semibold text-gray-800">
                      {index === 0 && '👑 '}{player}
                    </span>
                    <span className="text-xl font-black text-green-600">
                      {score} pts
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <Button
          onClick={continueToNextRound}
          className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Start Round {gameState?.currentRound}
          <ArrowRight className="w-8 h-8 ml-3" />
        </Button>
      </Card>
    </div>
  );
};

export default RoundEnd;