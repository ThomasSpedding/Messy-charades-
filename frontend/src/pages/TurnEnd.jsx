import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Trophy, ArrowRight, Beer } from 'lucide-react';

const TurnEnd = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;
  
  const currentPlayer = gameState?.players[gameState?.currentPlayerIndex];
  const pointsEarned = gameState?.pointsEarned || 0;
  
  // Update scores
  const updatedScores = {
    ...gameState?.scores,
    [currentPlayer]: (gameState?.scores[currentPlayer] || 0) + pointsEarned
  };

  const continueGame = () => {
    const nextPlayerIndex = gameState.currentPlayerIndex + 1;
    
    // Check if round is complete
    if (nextPlayerIndex >= gameState.players.length) {
      // Round complete - check if game is over
      if (gameState.currentRound >= gameState.rounds) {
        // Game over
        navigate('/final-scores', {
          state: {
            ...gameState,
            scores: updatedScores
          }
        });
      } else {
        // Next round
        navigate('/round-end', {
          state: {
            ...gameState,
            scores: updatedScores,
            currentRound: gameState.currentRound + 1,
            currentPlayerIndex: 0
          }
        });
      }
    } else {
      // Next player
      navigate('/categories', {
        state: {
          ...gameState,
          scores: updatedScores,
          currentPlayerIndex: nextPlayerIndex
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-6">
        <div className="space-y-4">
          <Trophy className="w-20 h-20 text-yellow-500 mx-auto animate-bounce" />
          
          <h1 className="text-4xl font-black text-gray-800">
            {currentPlayer}'s Turn Complete!
          </h1>
          
          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-6 rounded-2xl border-2 border-yellow-300">
            <p className="text-6xl font-black text-yellow-600">
              +{pointsEarned}
            </p>
            <p className="text-xl font-semibold text-gray-700 mt-2">
              Points Earned
            </p>
          </div>

          {gameState?.fateChosen && (
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <p className="text-sm font-semibold text-purple-800">
                Fate: {gameState.fateChosen === 'drink' ? '🍺 Took a drink' : 
                       gameState.fateChosen === 'truth' ? '💬 Truth' : '🔥 Dare'}
              </p>
            </div>
          )}

          <div className="pt-4">
            <h3 className="text-lg font-bold text-gray-700 mb-2">Current Scores</h3>
            <div className="space-y-2">
              {gameState?.players.map(player => (
                <div key={player} className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-gray-800">{player}</span>
                  <span className="text-xl font-bold text-teal-600">
                    {updatedScores[player]} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={continueGame}
          className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Continue
          <ArrowRight className="w-8 h-8 ml-3" />
        </Button>
      </Card>
    </div>
  );
};

export default TurnEnd;