import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Code, Heart } from 'lucide-react';

const Info = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/95 backdrop-blur-sm shadow-2xl space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-full">
              <Code className="w-16 h-16 text-white" />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-black text-gray-800">
              Messy Charades
            </h1>
            <p className="text-xl text-gray-600 font-semibold">
              Drinking Game Edition
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-2 border-purple-200 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-pink-500" />
              <p className="text-lg text-gray-700 font-semibold">
                Designed & Developed by
              </p>
            </div>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Thomas Melvin Spedding
            </p>
          </div>

          <div className="text-gray-600 text-sm space-y-2 pt-4">
            <p>A party game for 3+ players</p>
            <p>6 categories • Swipe controls • Truth or Dare</p>
            <p className="text-xs text-gray-400 pt-2">Drink responsibly • 18+</p>
          </div>
        </div>

        <Button
          onClick={() => navigate('/')}
          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          <ArrowLeft className="w-6 h-6 mr-2" />
          Back to Home
        </Button>
      </Card>
    </div>
  );
};

export default Info;
