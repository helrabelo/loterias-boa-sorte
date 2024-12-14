'use client';
import { useState } from 'react';
import { GameType } from '@/types/loteria';
import GameChecker from '@/components/CheckGame';

interface LotteryResult {
  dezenas?: string[];
  listaDezenas?: string[];
  userNumbers?: string[];
  matches?: string[];
  matchCount?: number;
  error?: string;
}

export default function CheckResultPage() {
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (gameType: GameType, numbers: string[]) => {
    try {
      setError(null);
      const queryParams = new URLSearchParams();
      numbers.forEach((number, index) => {
        queryParams.append(`number${index}`, number);
      });

      const response = await fetch(
        `/api/loteria/${gameType}?${queryParams.toString()}`
      );
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to check game');
      }

      setResult(data);
    } catch (error) {
      console.error('Error checking game:', error);
      setError(error instanceof Error ? error.message : 'Failed to check game');
      setResult(null);
    }
  };

  return (
    <div className="lg:col-span-9 container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Verificar Jogos</h1>
      <GameChecker onCheck={handleCheck} />

      {error && (
        <div className="mt-8 p-4 border rounded-lg bg-red-50 text-red-700">
          {error}
        </div>
      )}

      {result && !error && (
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resultado</h2>
          <div className="space-y-2">
            <p>
              Números sorteados:{' '}
              {(result?.dezenas || result?.listaDezenas || []).join(', ')}
            </p>
            {result.userNumbers && (
              <p>Seus números: {result.userNumbers.join(', ')}</p>
            )}
            {result.matches && (
              <p>
                Acertos: {result.matches.join(', ')} ({result.matchCount} número
                {result.matchCount !== 1 ? 's' : ''})
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
