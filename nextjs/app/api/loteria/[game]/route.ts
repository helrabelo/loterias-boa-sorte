// app/api/loteria/[game]/route.ts
import { NextResponse } from 'next/server';
import redis from '@/services/redis'

async function fetchFromCaixa(game: string, contestNumber?: number) {
  const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber || ''}`;
  
  const response = await fetch(url, {
    headers: {
      'accept': 'application/json',
      'origin': 'https://loterias.caixa.gov.br',
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${game} result from Caixa`);
  }

  return response.json();
}

export async function GET(
  request: Request,
  { params }: { params: { game: string } }
) {
  const { searchParams } = new URL(request.url);
  const contestNumber = searchParams.get('contest');

  try {
    // Determine the Redis key
    const key = contestNumber 
      ? `lottery:${params.game}:${contestNumber}`
      : `lottery:${params.game}:latest`;

    // Try to get from Redis first
    const cachedResult = await redis.get(key);
    if (cachedResult) {
      return NextResponse.json(cachedResult);
    }

    // If not in cache, fetch from Caixa API
    const result = await fetchFromCaixa(
      params.game,
      contestNumber ? parseInt(contestNumber) : undefined
    );

    // Store in Redis
    if (contestNumber) {
      // Store historical results indefinitely
      await redis.set(key, result);
    } else {
      // Store latest results with expiration
      await redis.set(key, result, { ex: 3600 }); // 1 hour expiration
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