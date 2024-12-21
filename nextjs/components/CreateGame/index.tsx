'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { GAMES_SETTINGS } from '@/const/games';
import { GameType } from '@/types/loteria';
import NumberButton from '@/components/CheckGame/NumberButton';

interface GameSelectorProps {
  onSelectionChange?: (gameType: GameType, numbers: number[]) => void;
}

interface PrizeTierProbability {
  hits: number;
  combinations: number;
  probability: string;
  possibleWins: number;
}

const calculateCombinations = (n: number, r: number): number => {
  if (r > n) return 0;
  let result = 1;
  for (let i = 1; i <= r; i++) {
    result *= (n - i + 1) / i;
  }
  return Math.round(result);
};

const formatProbability = (probability: number): string => {
  return `1 em ${Math.round(1 / probability).toLocaleString()}`;
};

export default function GameSelector({ onSelectionChange }: GameSelectorProps) {
  const [selectedGame, setSelectedGame] = useState<GameType | ''>('');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const gameSettings = useMemo(
    () => (selectedGame ? GAMES_SETTINGS[selectedGame] : null),
    [selectedGame]
  );

  const handleGameChange = useCallback(
    (game: GameType) => {
      setSelectedGame(game);
      setSelectedNumbers([]);
      if (onSelectionChange) {
        onSelectionChange(game, []);
      }
    },
    [onSelectionChange]
  );

  const toggleNumber = useCallback(
    (number: number) => {
      if (!gameSettings) return;

      setSelectedNumbers((prev) => {
        if (prev.includes(number)) {
          const newNumbers = prev.filter((n) => n !== number);
          if (onSelectionChange && selectedGame) {
            onSelectionChange(selectedGame, newNumbers);
          }
          return newNumbers;
        }
        if (prev.length < gameSettings.maxNumbers) {
          const newNumbers = [...prev, number].sort((a, b) => a - b);
          if (onSelectionChange && selectedGame) {
            onSelectionChange(selectedGame, newNumbers);
          }
          return newNumbers;
        }
        return prev;
      });
    },
    [gameSettings, selectedGame, onSelectionChange]
  );

  const validationMessage = useMemo(() => {
    if (!gameSettings) return '';
    if (selectedNumbers.length < gameSettings.requiredNumbers) {
      return `Selecione pelo menos ${gameSettings.requiredNumbers} números para um jogo válido`;
    }
    if (selectedNumbers.length === gameSettings.maxNumbers) {
      return 'Você atingiu o número máximo de seleções para este jogo';
    }
    return '';
  }, [gameSettings, selectedNumbers.length]);

  const prizeTierProbabilities = useMemo(() => {
    if (
      !gameSettings ||
      selectedNumbers.length < gameSettings.requiredNumbers
    ) {
      return [];
    }

    const selectedCount = selectedNumbers.length;
    const requiredNumbers = gameSettings.requiredNumbers;
    const prizeBreakdown: PrizeTierProbability[] = [];

    // Calculate probabilities for each prize tier
    // For Mega-Sena: 6 (jackpot), 5, and 4 hits
    // For Quina: 5 (jackpot), 4, and 3 hits
    // For Quadra: 4 (jackpot), 3, and 2 hits
    const startTier = requiredNumbers;
    const minTier = Math.max(requiredNumbers - 2, 2); // Don't go below 2 hits

    for (let hits = startTier; hits >= minTier; hits--) {
      // How many ways to select 'hits' numbers from our selected numbers
      const waysToWin = calculateCombinations(selectedCount, hits);
      // Total possible combinations for this game
      const totalWays = calculateCombinations(gameSettings.maxNumber, hits);

      // For each winning combination, calculate how many ways we can miss with remaining selections
      const possibleWins = waysToWin;
      const probability = possibleWins / totalWays;

      prizeBreakdown.push({
        hits,
        combinations: possibleWins,
        probability: formatProbability(probability),
        possibleWins,
      });
    }

    return prizeBreakdown;
  }, [gameSettings, selectedNumbers.length]);

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
            game={selectedGame as GameType}
          />
        ))}
      </div>
    );
  }, [gameSettings, selectedNumbers, toggleNumber, selectedGame]);

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
            {validationMessage && (
              <p
                className={`mt-2 text-sm ${
                  selectedNumbers.length === gameSettings.maxNumbers
                    ? 'text-orange-600'
                    : 'text-blue-600'
                }`}
              >
                {validationMessage}
              </p>
            )}
          </div>

          {prizeTierProbabilities.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">
                Probabilidades de Premiação
              </h3>
              {prizeTierProbabilities.map((tier) => (
                <div key={tier.hits} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{tier.hits} acertos</h4>
                      <p className="text-sm text-gray-500">
                        {tier.possibleWins}{' '}
                        {tier.possibleWins === 1 ? 'combinação' : 'combinações'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-semantic-primary">
                        {tier.probability}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
