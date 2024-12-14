import { NextResponse } from 'next/server';
import redis from '@/services/redis';
import { GameType } from '@/types/loteria';

async function fetchFromCaixa(game: string, contestNumber?: number) {
  const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber || ''}`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      origin: 'https://loterias.caixa.gov.br',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${game} result from Caixa`);
  }

  return response.json();
}

type RouteContext = {
  params: Promise<{
    game: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    const game = (await context.params).game as GameType;
    const { searchParams } = new URL(request.url);
    const contestNumber = searchParams.get('contest');

    // Get all number parameters
    const numbers: string[] = [];
    for (let i = 0; searchParams.has(`number${i}`); i++) {
      const num = searchParams.get(`number${i}`);
      if (num) numbers.push(num);
    }

    // Determine the Redis key
    const key = contestNumber
      ? `lottery:${game}:${contestNumber}`
      : `lottery:${game}:latest`;

    // Try to get from Redis first
    let result;
    const cachedResult = await redis.get(key);

    if (cachedResult) {
      result =
        typeof cachedResult === 'string'
          ? JSON.parse(cachedResult)
          : cachedResult;
    } else {
      // If not in cache, fetch from Caixa API
      result = await fetchFromCaixa(
        game,
        contestNumber ? parseInt(contestNumber) : undefined
      );

      // Store in Redis
      await redis.set(
        key,
        JSON.stringify(result),
        contestNumber ? undefined : { ex: 3600 } // 1 hour expiration for latest only
      );
    }

    // Safety check for result structure
    if (!result || !Array.isArray(result?.dezenas || result?.listaDezenas)) {
      throw new Error('Invalid result structure from lottery API');
    }

    // If we have numbers to check, process them
    if (numbers.length > 0) {
      const matches = numbers.filter((num) =>
        (result?.dezenas || result?.listaDezenas).includes(num)
      );
      return NextResponse.json({
        ...result,
        userNumbers: numbers,
        matches,
        matchCount: matches.length,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching lottery results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results' },
      { status: 500 }
    );
  }
}
