'use client'
import { useState } from 'react';
import { GameType } from '@/types/loteria';
import GameChecker from '@/components/CheckGame';

export default function CheckResultPage() {
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (gameType: GameType, numbers: string[]) => {
    try {
      const response = await fetch(`/api/loteria/${gameType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameType,
          numbers,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error checking game:', error);
    }
  };

  return (
    <div className="lg:col-span-9 container max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Verificar Jogos</h1>
      <GameChecker onCheck={handleCheck} />

      {result && (
        <div className="mt-8 p-4 border rounded-lg">
          {/* Result display logic here */}
          {JSON.stringify(result)}
        </div>
      )}
    </div>
  );
}
