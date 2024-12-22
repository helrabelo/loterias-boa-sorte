// app/api/loteria/[game]/latest/route.ts
import { NextResponse, NextRequest } from 'next/server';
import redis from '@/services/redis';
import { GameType } from '@/types/loteria';

const gamesMap = {
  diaDeSorte: 'diadesorte',
  duplasena: 'duplasena',
  federal: 'federal',
  loteca: 'loteca',
  lotofacil: 'lotofacil',
  lotomania: 'lotomania',
  megasena: 'megasena',
  quina: 'quina',
  superSete: 'supersete',
  timemania: 'timemania',
  maisMilionaria: 'maismilionaria',
} as const;

async function fetchLatestResultsFromCaixa() {
  const url =
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados';
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch latest results: ${response.status} ${response.statusText}`
    );
  }

  return response;
}

async function fetchResult(game: GameType, contestNumber: number) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${game} contest ${contestNumber}: ${response.status} ${response.statusText}`
      );
    }

    return response;
  } catch (error) {
    console.error(`Error fetching ${game} contest ${contestNumber}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const game = request?.nextUrl.pathname.split('/')[3];

  try {
    const result = await redis.get(`lottery:${game}:latest`);
    return NextResponse.json(result ? result : null);
  } catch (error) {
    console.error(`Failed to fetch results for ${game}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const game = request?.nextUrl.pathname.split('/')[3];
  try {
    const gameKey = game as GameType;

    // Find the original game name from gamesMap
    const originalGame = Object.entries(gamesMap).find(
      ([_, value]) => value === gameKey
    )?.[0];

    if (!originalGame) {
      return NextResponse.json({ error: 'Invalid game type' }, { status: 400 });
    }

    // Fetch latest results
    console.log(`Fetching latest results for ${game}...`);
    const latestResults = await fetchLatestResultsFromCaixa();

    console.log('Latest results fetched successfully');

    const latestResultsJson = await latestResults.json();
    const contestNumber = latestResultsJson[originalGame]?.numeroDoConcurso;
    if (!contestNumber) {
      console.log(`No contest number found for ${game}`);
      return NextResponse.json(
        { error: 'Contest number not found' },
        { status: 404 }
      );
    }

    // Fetch specific game result
    console.log(`Fetching ${game} contest ${contestNumber}...`);
    const rawGameResult = await fetchResult(gameKey, contestNumber);
    if (!rawGameResult) {
      console.log(`Failed to fetch ${game} contest ${contestNumber}`);
      return NextResponse.json(
        { error: 'Failed to fetch game result' },
        { status: 500 }
      );
    }
    const detailedResult = await rawGameResult.json();

    if (!detailedResult) {
      console.log(
        `Failed to fetch details for ${game} contest ${contestNumber}`
      );
      return NextResponse.json(
        { error: 'Failed to fetch game details' },
        { status: 500 }
      );
    }

    // Update Redis
    await redis.set(`lottery:${game}:latest`, JSON.stringify(detailedResult));
    await redis.set(
      `lottery:${game}:${contestNumber}`,
      JSON.stringify(detailedResult)
    );

    console.log(`Successfully updated ${game} contest ${contestNumber}`);
    return NextResponse.json({
      game,
      contest: contestNumber,
      success: true,
    });
  } catch (error) {
    console.error(`Failed to fetch results for ${game}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch lottery results: ${error}` },
      { status: 500 }
    );
  }
}
