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

async function fetchWithProxy(targetUrl: string) {
  const smartProxyUrl = `https://scraper-api.smartproxy.com/v2/scrape`;

  const response = await fetch(smartProxyUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${process.env.SMARTPROXY_SCARPER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: targetUrl,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Proxy request failed: ${response.status} ${response.statusText}`
    );
  }

  return response;
}

async function fetchLatestResultsFromCaixa() {
  const url =
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados';
  const response = await fetchWithProxy(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch latest results: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

async function fetchResult(game: GameType, contestNumber: number) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber}`;
    const response = await fetchWithProxy(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${game} contest ${contestNumber}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
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
    const { results: rawResults } = await fetchLatestResultsFromCaixa();
    const latestResults = JSON.parse(rawResults[0].content);
    console.log('Latest results fetched successfully');

    const contestNumber = latestResults[originalGame]?.numeroDoConcurso;
    if (!contestNumber) {
      console.log(`No contest number found for ${game}`);
      return NextResponse.json(
        { error: 'Contest number not found' },
        { status: 404 }
      );
    }

    // Fetch specific game result
    console.log(`Fetching ${game} contest ${contestNumber}...`);
    const { results: rawGameResult } = await fetchResult(
      gameKey,
      contestNumber
    );
    const detailedResult = JSON.parse(rawGameResult[0].content);

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
