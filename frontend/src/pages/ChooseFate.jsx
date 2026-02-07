import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Beer, Sparkles } from 'lucide-react';

const ChooseFate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;
  const [selected, setSelected] = useState(null);

  const handleDrink = () => {
    navigate('/turn-end', {
      state: {
        ...gameState,
        fateChosen: 'drink'
      }
    });
  };

  const handleTruthOrDare = () => {
    setSelected('truthordare');
    // 50/50 chance
    const result = Math.random() < 0.5 ? 'truth' : 'dare';
    
    setTimeout(() => {
      navigate('/fate-result', {
        state: {
          ...gameState,
          fateResult: result
        }
      });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl text-center space-y-6">
        <div className="space-y-4">
          <Sparkles className="w-20 h-20 text-purple-600 mx-auto animate-pulse" />
          
          <h1 className="text-5xl font-black text-gray-800">
            Choose Your Fate!
          </h1>
          
          <p className="text-xl text-gray-600">
            You missed: <span className="font-bold text-purple-600">{gameState?.missedWord}</span>
          </p>

          <p className="text-lg text-gray-500">
            What will it be?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button
            onClick={handleDrink}
            disabled={selected !== null}
            className="h-32 text-2xl font-bold bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-xl hover:scale-105 transition-all duration-200 flex-col gap-3"
          >
            <Beer className="w-12 h-12" />
            Take a Drink
          </Button>
          
          <Button
            onClick={handleTruthOrDare}
            disabled={selected !== null}
            className="h-32 text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-xl hover:scale-105 transition-all duration-200 flex-col gap-3"
          >
            <Sparkles className="w-12 h-12" />
            Truth or Dare
            <span className="text-sm font-normal">(50/50 chance)</span>
          </Button>
        </div>

        {selected && (
          <div className="text-purple-600 font-semibold animate-pulse">
            Making your choice...
          </div>
        )}
      </Card>
    </div>
  );
};

export default ChooseFate;