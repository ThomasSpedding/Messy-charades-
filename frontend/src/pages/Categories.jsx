import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Film, Tv, Flame, ShoppingBag, Squirrel, Shuffle } from 'lucide-react';

const categories = [
  { id: 'films', name: 'Films', icon: Film, color: 'from-red-500 to-pink-500' },
  { id: 'tv', name: 'TV Shows', icon: Tv, color: 'from-blue-500 to-cyan-500' },
  { id: '18plus', name: '18+ Spicy', icon: Flame, color: 'from-orange-500 to-red-600' },
  { id: 'brands', name: 'British Brands', icon: ShoppingBag, color: 'from-green-500 to-emerald-500' },
  { id: 'animals', name: 'Animals', icon: Squirrel, color: 'from-yellow-500 to-orange-500' },
  { id: 'random', name: 'Random Mix', icon: Shuffle, color: 'from-purple-500 to-pink-500' },
];

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state;

  const selectCategory = (categoryId) => {
    navigate('/ready', {
      state: {
        ...gameState,
        selectedCategory: categoryId
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-white drop-shadow-lg">Choose Category</h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Round {gameState?.currentRound} of {gameState?.rounds} • {gameState?.players[gameState?.currentPlayerIndex]}'s Turn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                className="overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-200 shadow-xl"
                onClick={() => selectCategory(category.id)}
              >
                <div className={`bg-gradient-to-br ${category.color} p-8 text-center space-y-4`}>
                  <IconComponent className="w-16 h-16 text-white mx-auto drop-shadow-lg" />
                  <h3 className="text-2xl font-black text-white drop-shadow-md">
                    {category.name}
                  </h3>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;