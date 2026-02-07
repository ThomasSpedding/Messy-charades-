import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Smartphone, ArrowRight } from 'lucide-react';

const Ready = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;

  const startTurn = () => {
    navigate('/game', { state: gameState });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-6">
        <div className="space-y-4">
          <Smartphone className="w-24 h-24 text-teal-600 mx-auto animate-bounce" />
          
          <h1 className="text-4xl font-black text-gray-800">
            {gameState?.players[gameState?.currentPlayerIndex]}
          </h1>
          
          <div className="text-xl text-gray-600 space-y-2">
            <p className="font-bold">Get Ready!</p>
            <p>Face the phone towards other players</p>
            <p className="text-sm text-gray-500">so they can see the word but you can't!</p>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg border-2 border-teal-200 space-y-2">
            <p className="text-sm font-semibold text-teal-800">
              Timer: {gameState?.timerDuration} seconds
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-teal-700 font-medium pt-2">
              <div className="flex flex-col items-center">
                <ArrowRight className="w-6 h-6 rotate-[-90deg]" />
                <span>Swipe Up = Correct</span>
              </div>
              <div className="flex flex-col items-center">
                <ArrowRight className="w-6 h-6 rotate-90" />
                <span>Swipe Down = Wrong</span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={startTurn}
          className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          I'm Ready!
          <ArrowRight className="w-8 h-8 ml-3" />
        </Button>
      </Card>
    </div>
  );
};

export default Ready;