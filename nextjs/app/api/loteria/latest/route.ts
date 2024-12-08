// app/api/loteria/latest/route.ts
import { NextResponse } from 'next/server';
import redis from '@/services/redis';
import { GameType } from '@/types/loteria';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchResult(game: GameType, contestNumber: number) {
  try {
    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${game}/${contestNumber}`;
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        origin: 'https://loterias.caixa.gov.br',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${game} contest ${contestNumber}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error fetching ${game} contest ${contestNumber}:`, error);
    return null;
  }
}

async function fetchLatestResultsFromCaixa() {
  const url =
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados';

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      origin: 'https://loterias.caixa.gov.br',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch latest results from Caixa');
  }

  return response.json();
}

export async function GET() {
  try {
    const games = await redis.keys('lottery:*:latest');
    const results = await redis.mget(...games);

    // Map the results to their game names
    const mappedResults = results.map((result, index) => {
      // Extract game name from the Redis key (e.g., 'lottery:megasena:latest' -> 'megasena')
      const gameName = games[index].split(':')[1];

      return {
        [gameName]: result,
      };
    });

    // Make an object with the results, using the game name as the key
    const result = mappedResults.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to fetch results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const gamesMap = {
      diaDeSorte: 'diasorte',
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
    };

    // First, fetch latest results to get contest numbers
    const latestResults = await fetchLatestResultsFromCaixa();

    // Fetch detailed results for each game
    const results = await Promise.all(
      Object.entries(gamesMap).map(async ([originalGame, gameKey], index) => {
        // Add delay between requests to avoid rate limiting
        await delay(index * 500); // 500ms delay between each request

        const contestNumber = latestResults[originalGame]?.numeroDoConcurso;
        if (!contestNumber) return null;

        // Fetch detailed result
        const detailedResult = await fetchResult(gameKey as GameType, contestNumber);
        if (!detailedResult) return null;

        // Store both latest and contest-specific results
        await redis.set(`lottery:${gameKey}:latest`, JSON.stringify(detailedResult));
        await redis.set(`lottery:${gameKey}:${contestNumber}`, JSON.stringify(detailedResult));

        return {
          game: gameKey,
          contest: contestNumber,
          success: true,
        };
      })
    );

    // Filter out null results and return summary
    const summary = results.filter(Boolean);
    return NextResponse.json(summary);

  } catch (error) {
    console.error('Failed to fetch results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lottery results' },
      { status: 500 }
    );
  }
}
