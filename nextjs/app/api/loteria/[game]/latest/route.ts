// app/api/loteria/[game]/latest/route.ts
import { HttpsProxyAgent } from 'https-proxy-agent';
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
  // Proxy configuration
  const proxyHost = 'gate.smartproxy.com';
  const proxyPort = '10001';
  const proxyUrl = `http://${process.env.SMARTPROXY_USER}:${process.env.SMARTPROXY_PASSWORD}@${proxyHost}:${proxyPort}`;

  // Create proxy agent
  const proxyAgent = new HttpsProxyAgent(proxyUrl);

  // In Node.js/Next.js environment, we need to use a custom fetch configuration
  const response = await fetch(targetUrl, {
    headers: {
      Accept: 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    // @ts-expect-error - The Node.js fetch API types don't include the agent property
    agent: proxyAgent,
  });

  if (!response.ok) {
    throw new Error(
      `Proxy request failed: ${response.status} ${response.statusText}`
    );
  }
  const jsonResponse = await response.json();

  return jsonResponse;
}

async function fetchLatestResultsFromCaixa() {
  const url =
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados';
  const response = await fetchWithProxy(url);

  if (!response) {
    throw new Error(
      `Failed to fetch latest results: ${response.status} ${response.statusText}`
    );
  }

  return response;
}

async function fetchResult(game: GameType, contestNumber: number) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber}`;
    const response = await fetchWithProxy(url);

    if (!response) {
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
    // const latestResults = JSON.parse(rawResults[0].content);
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
    const detailedResult = await fetchResult(
      gameKey,
      contestNumber
    );

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
