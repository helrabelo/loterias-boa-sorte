// app/api/loteria/latest/route.ts
import { NextResponse } from 'next/server';
import redis from '@/services/redis';
export async function GET() {
  try {
    const games = [
      'megasena',
      'lotofacil',
      'quina',
      'lotomania',
      'timemania',
      'duplasena',
      'diasorte',
      'supersete',
      'maismilionaria',
    ];

    const results = await Promise.all(
      games.map(async (game) => {
        const key = `lottery:${game}:latest`;
        const result = await redis.get(key);
        return { game, result };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error('Failed to fetch results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results' },
      { status: 500 }
    );
  }
}
