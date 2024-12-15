import React, { useState, useCallback, useMemo } from 'react';
import { GameType } from '@/types/loteria';
import { GAMES_SETTINGS } from '@/const/games';

interface GameCheckerProps {
  onCheck: (gameType: GameType, numbers: string[]) => Promise<void>;
}

const NumberButton = React.memo(
  ({
    number,
    isSelected,
    onClick,
  }: {
    number: number;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
      w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium
      transition-all duration-200
      ${
        isSelected
          ? 'bg-semantic-primary text-white ring-2 ring-semantic-primary ring-offset-2'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
      }
    `}
    >
      {number.toString().padStart(2, '0')}
    </button>
  )
);

NumberButton.displayName = 'NumberButton';

export default function GameChecker({ onCheck }: GameCheckerProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | ''>('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedTrevoNumbers, setSelectedTrevoNumbers] = useState<number[]>(
    []
  );

  const gameSettings = useMemo(
    () => (selectedGame ? GAMES_SETTINGS[selectedGame] : null),
    [selectedGame]
  );

  const handleGameChange = useCallback((game: GameType) => {
    setSelectedGame(game);
    setSelectedNumbers([]);
    setSelectedTrevoNumbers([]);
  }, []);

  const toggleNumber = useCallback(
    (number: number, isTrevo = false) => {
      if (!gameSettings) return;

      const setNumbers = isTrevo ? setSelectedTrevoNumbers : setSelectedNumbers;
      const currentNumbers = isTrevo ? selectedTrevoNumbers : selectedNumbers;
      const maxAllowed = isTrevo ? 2 : gameSettings.maxNumbers;

      setNumbers((prev) => {
        if (prev.includes(number)) {
          return prev.filter((n) => n !== number);
        }
        if (prev.length < maxAllowed) {
          return [...prev, number].sort((a, b) => a - b);
        }
        return prev;
      });
    },
    [gameSettings, selectedNumbers, selectedTrevoNumbers]
  );

  const isGameValid = useMemo(() => {
    if (!gameSettings || !selectedNumbers.length) return false;

    const hasValidMainNumbers =
      selectedNumbers.length >= gameSettings.requiredNumbers;
    const needsTrevo = selectedGame === 'maismilionaria';
    const hasTrevo = selectedTrevoNumbers.length === 2;

    return hasValidMainNumbers && (!needsTrevo || hasTrevo);
  }, [
    gameSettings,
    selectedGame,
    selectedNumbers.length,
    selectedTrevoNumbers.length,
  ]);

  const renderNumberGrid = useCallback(() => {
    if (!gameSettings) return null;

    const numbers = Array.from(
      { length: gameSettings.maxNumber },
      (_, i) => i + 1
    );

    return (
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {numbers.map((number) => (
          <NumberButton
            key={number}
            number={number}
            isSelected={selectedNumbers.includes(number)}
            onClick={() => toggleNumber(number)}
          />
        ))}
      </div>
    );
  }, [gameSettings, selectedNumbers, toggleNumber]);

  const renderTrevoGrid = useCallback(() => {
    if (selectedGame !== 'maismilionaria') return null;

    const trevoNumbers = Array.from({ length: 6 }, (_, i) => i + 1);

    return (
      <div className="mt-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Trevos (selecione 2):
        </p>
        <div className="grid grid-cols-6 gap-2">
          {trevoNumbers.map((number) => (
            <NumberButton
              key={`trevo-${number}`}
              number={number}
              isSelected={selectedTrevoNumbers.includes(number)}
              onClick={() => toggleNumber(number, true)}
            />
          ))}
        </div>
      </div>
    );
  }, [selectedGame, selectedTrevoNumbers, toggleNumber]);

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

      {gameSettings && (
        <>
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Selecione os números
              </label>
              <span className="text-sm text-gray-500">
                {selectedNumbers.length} de {gameSettings.requiredNumbers}-
                {gameSettings.maxNumbers} números
              </span>
            </div>
            {renderNumberGrid()}
          </div>

          {renderTrevoGrid()}

          <div className="space-y-2 flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {selectedNumbers.map((number) => (
                <span
                  key={number}
                  className="px-3 py-1 bg-semantic-primary text-white rounded-full text-sm"
                >
                  {number.toString().padStart(2, '0')}
                </span>
              ))}
            </div>
            {selectedGame === 'maismilionaria' &&
              selectedTrevoNumbers.length > 0 && (
                <div className="flex gap-2">
                  {selectedTrevoNumbers.map((number) => (
                    <span
                      key={`trevo-${number}`}
                      className="px-3 py-1 bg-green-600 text-white rounded-full text-sm"
                    >
                      T{number}
                    </span>
                  ))}
                </div>
              )}
            {selectedNumbers.length > 0 && (
              <button
                onClick={() => setSelectedNumbers([])}
                className="text-sm text-white hover:text-gray-700 rounded-full bg-red-500 px-4 py-2"
              >
                Deselecionar todos os números.
              </button>
            )}
          </div>

          <button
            onClick={() =>
              onCheck(
                selectedGame as GameType,
                selectedNumbers.map((n) => n.toString())
              )
            }
            className="w-full bg-semantic-primary text-white rounded-lg py-3 hover:bg-semantic-primary-hover transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!isGameValid}
          >
            Verificar Jogo
          </button>
        </>
      )}
    </div>
  );
}
