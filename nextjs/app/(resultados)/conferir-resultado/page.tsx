'use client';
import { useState } from 'react';
import { GameType } from '@/types/loteria';
import GameChecker from '@/components/CheckGame';
import ResultsDisplay from '@/components/CheckGame/Results';

interface PrizeBreakdown {
  descricaoFaixa: string;
  faixa: number;
  numeroDeGanhadores: number;
  valorPremio: number;
}

interface LotteryResult {
  acumulado: boolean;
  dataApuracao: string;
  dataProximoConcurso: string;
  dezenasSorteadasOrdemSorteio: string[];
  listaDezenas: string[];
  numero: number;
  localSorteio: string;
  nomeMunicipioUFSorteio: string;
  valorEstimadoProximoConcurso: number;
  listaRateioPremio: PrizeBreakdown[];
  valorArrecadado: number;
  userNumbers?: string[];
  matches?: string[];
  matchCount?: number;
}

export default function CheckResultPage() {
  const [result, setResult] = useState<LotteryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleCheck = async (gameType: GameType, numbers: string[]) => {
    try {
      setIsVerifying(true);
      setError(null);
      const queryParams = new URLSearchParams();
      numbers.forEach((number, index) => {
        queryParams.append(`number${index}`, number);
      });

      const response = await fetch(`/api/loteria/${gameType}/latest`);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to check game');
      }

      setResult({
        ...data,
        userNumbers: numbers.map((number) => number.padStart(2, '0')),
      });
      setIsVerifying(false);
    } catch (error) {
      console.error('Error checking game:', error);
      setError(error instanceof Error ? error.message : 'Failed to check game');
      setResult(null);
      setIsVerifying(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-9 gap-6">
      <div className="lg:col-span-6 container mx-auto py-8 border rounded-lg shadow-lg">
        <div className="">
          <h1 className="text-2xl font-bold mb-8">Verificar Jogos</h1>
          <GameChecker onCheck={handleCheck} />

          {error && (
            <div className="mt-8 p-4 border rounded-lg bg-red-50 text-red-700">
              {error}
            </div>
          )}
        </div>
      </div>
      {result && (
        <div className="lg:col-span-3 container mx-auto py-8 border rounded-lg shadow-lg">
          <ResultsDisplay
            result={result}
            error={error}
            isVerifying={isVerifying}
          />
        </div>
      )}
    </div>
  );
}
