import React, { useState } from 'react';
import { GameType } from '@/types/loteria';
import { GAMES_SETTINGS } from '@/const/games';

interface GameCheckerProps {
  onCheck: (gameType: GameType, numbers: string[]) => Promise<void>;
}

export default function GameChecker({ onCheck }: GameCheckerProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | ''>('');
  const [numbers, setNumbers] = useState<string[]>([]);
  const [additionalNumbers, setAdditionalNumbers] = useState<string[]>([]);

  const handleGameChange = (game: GameType) => {
    setSelectedGame(game);
    setNumbers([]);
    setAdditionalNumbers([]);
  };

  const handleNumberInput = (
    value: string,
    index: number,
    isAdditional = false
  ) => {
    const numValue = value.replace(/\D/g, '');
    if (isAdditional) {
      const newNumbers = [...additionalNumbers];
      newNumbers[index] = numValue;
      setAdditionalNumbers(newNumbers);
    } else {
      const newNumbers = [...numbers];
      newNumbers[index] = numValue;
      setNumbers(newNumbers);
    }
  };

  const renderNumberInputs = () => {
    if (!selectedGame) return null;

    const gameSettings = GAMES_SETTINGS[selectedGame];
    const inputs = [];

    for (let i = 0; i < gameSettings.maxNumbers; i++) {
      inputs.push(
        <input
          key={i}
          type="text"
          maxLength={2}
          value={numbers[i] || ''}
          onChange={(e) => handleNumberInput(e.target.value, i)}
          className="w-12 h-12 text-center border rounded-lg"
        />
      );
    }

    // Handle special cases
    if (selectedGame === 'maismilionaria') {
      inputs.push(
        <div key="trevos" className="w-full">
          <p className="text-sm text-gray-500 mt-4 mb-2">Trevos:</p>
          {[0, 1].map((i) => (
            <input
              key={`trevo-${i}`}
              type="text"
              maxLength={1}
              value={additionalNumbers[i] || ''}
              onChange={(e) => handleNumberInput(e.target.value, i, true)}
              className="w-12 h-12 text-center border rounded-lg mr-2"
            />
          ))}
        </div>
      );
    }

    return inputs;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Selecione o Jogo
        </label>
        <select
          value={selectedGame}
          onChange={(e) => handleGameChange(e.target.value as GameType)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">Selecione...</option>
          {Object.entries(GAMES_SETTINGS).map(([key, game]) => (
            <option key={key} value={key}>
              {game.title}
            </option>
          ))}
        </select>
      </div>

      {selectedGame && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Digite os números do seu jogo
            </label>
            <div className="flex flex-wrap gap-2">{renderNumberInputs()}</div>
          </div>

          <button
            onClick={() => onCheck(selectedGame, numbers)}
            className="w-full bg-semantic-primary text-white rounded-lg py-3 hover:bg-semantic-primary-hover transition-colors"
          >
            Verificar Jogo
          </button>
        </>
      )}
    </div>
  );
}
