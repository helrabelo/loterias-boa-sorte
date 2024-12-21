import React from 'react';
import GameSelector from '@/components/CreateGame';

export default function CreateGamePage() {
  return (
    <div className="lg:col-span-9">
      <div className="container mx-auto py-8 border rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8">Criar Jogo</h1>
        <GameSelector />
      </div>
    </div>
  );
}