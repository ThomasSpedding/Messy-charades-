import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { MessageCircle, Flame, ArrowRight } from 'lucide-react';

const FateResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;
  const result = gameState?.fateResult;

  const continueTurn = () => {
    navigate('/turn-end', {
      state: {
        ...gameState,
        fateChosen: result
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-8">
        <div className="space-y-6">
          {result === 'truth' ? (
            <>
              <MessageCircle className="w-24 h-24 text-blue-600 mx-auto animate-bounce" />
              <h1 className="text-6xl font-black text-blue-600 drop-shadow-lg">
                TRUTH!
              </h1>
              <p className="text-2xl text-gray-700 font-bold">
                Time to confess something...
              </p>
              <p className="text-lg text-gray-600">
                Other players: Ask them a truth question!
              </p>
            </>
          ) : (
            <>
              <Flame className="w-24 h-24 text-red-600 mx-auto animate-bounce" />
              <h1 className="text-6xl font-black text-red-600 drop-shadow-lg">
                DARE!
              </h1>
              <p className="text-2xl text-gray-700 font-bold">
                Time for a challenge...
              </p>
              <p className="text-lg text-gray-600">
                Other players: Give them a dare!
              </p>
            </>
          )}
        </div>

        <Button
          onClick={continueTurn}
          className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Continue
          <ArrowRight className="w-8 h-8 ml-3" />
        </Button>
      </Card>
    </div>
  );
};

export default FateResult;