import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { UserPlus, Trash2, ArrowRight, Timer, Trophy } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Setup = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState(['', '', '']);
  const [timerDuration, setTimerDuration] = useState(60);
  const [rounds, setRounds] = useState(3);

  const addPlayer = () => {
    setPlayers([...players, '']);
  };

  const removePlayer = (index) => {
    if (players.length > 3) {
      setPlayers(players.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Minimum 3 players required!",
        description: "You need at least 3 players to play.",
      });
    }
  };

  const updatePlayer = (index, name) => {
    const newPlayers = [...players];
    newPlayers[index] = name;
    setPlayers(newPlayers);
  };

  const startGame = () => {
    const filledPlayers = players.filter(p => p.trim() !== '');
    
    if (filledPlayers.length < 3) {
      toast({
        title: "Not enough players!",
        description: "You need at least 3 players to start.",
      });
      return;
    }

    navigate('/categories', {
      state: {
        players: filledPlayers,
        timerDuration,
        rounds,
        currentRound: 1,
        currentPlayerIndex: 0,
        scores: filledPlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {})
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black text-white drop-shadow-lg">Game Setup</h1>
          <p className="text-white/90 drop-shadow-md">Add players and set your rules!</p>
        </div>

        <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-2xl">
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-bold text-gray-800 mb-3 block">
                <UserPlus className="w-5 h-5 inline mr-2" />
                Players (Minimum 3)
              </Label>
              <div className="space-y-3">
                {players.map((player, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Player ${index + 1} name`}
                      value={player}
                      onChange={(e) => updatePlayer(index, e.target.value)}
                      className="flex-1 h-12 text-lg"
                    />
                    {players.length > 3 && (
                      <Button
                        onClick={() => removePlayer(index)}
                        variant="destructive"
                        className="h-12 px-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                onClick={addPlayer}
                variant="outline"
                className="w-full mt-3 h-12 font-semibold"
              >
                <UserPlus className="w-5 h-5 mr-2" />
                Add Player
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-lg font-bold text-gray-800 mb-3 block">
                  <Timer className="w-5 h-5 inline mr-2" />
                  Timer (seconds)
                </Label>
                <Input
                  type="number"
                  min="15"
                  max="180"
                  value={timerDuration}
                  onChange={(e) => setTimerDuration(parseInt(e.target.value) || 60)}
                  className="h-12 text-lg text-center font-bold"
                />
              </div>

              <div>
                <Label className="text-lg font-bold text-gray-800 mb-3 block">
                  <Trophy className="w-5 h-5 inline mr-2" />
                  Rounds
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={rounds}
                  onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
                  className="h-12 text-lg text-center font-bold"
                />
              </div>
            </div>
          </div>
        </Card>

        <Button
          onClick={startGame}
          className="w-full h-16 text-2xl font-bold bg-white text-purple-600 hover:bg-white/90 hover:scale-105 transition-all duration-200 shadow-xl"
        >
          Continue
          <ArrowRight className="w-8 h-8 ml-3" />
        </Button>
      </div>
    </div>
  );
};

export default Setup;