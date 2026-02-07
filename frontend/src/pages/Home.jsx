import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Sparkles, Beer, Dices } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Beer className="w-24 h-24 text-white drop-shadow-lg animate-bounce" />
              <Sparkles className="w-8 h-8 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-6xl font-black text-white drop-shadow-2xl tracking-tight">
            Messy Charades
          </h1>
          
          <p className="text-2xl font-bold text-white drop-shadow-lg">
            Drinking Game Edition
          </p>
          
          <p className="text-lg text-white/90 drop-shadow-md px-4">
            Guess the word, earn points, or face your fate!
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Button
            onClick={() => navigate('/setup')}
            className="w-full h-16 text-2xl font-bold bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-xl rounded-2xl"
          >
            <Dices className="w-8 h-8 mr-3" />
            Start Game
          </Button>
          
          <div className="text-white/80 text-sm drop-shadow-md">
            3+ Players • Party Game • 18+
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;