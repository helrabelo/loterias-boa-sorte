// app/api/loteria/latest/route.ts
import { NextResponse } from 'next/server';
import redis from '@/services/redis';
import { GameType } from '@/types/loteria';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithCaixaHeaders(url: string) {
  return fetch(url, {
    headers: {
      accept: 'application/json',
      origin: 'https://loterias.caixa.gov.br',
      referer: 'https://loterias.caixa.gov.br/',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
}

async function fetchLatestResultsFromCaixa() {
  const url =
    'https://servicebus2.caixa.gov.br/portaldeloterias/api/home/ultimos-resultados';

  const response = await fetchWithCaixaHeaders(url);

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
    const response = await fetchWithCaixaHeaders(url);

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

    // First, fetch latest results
    console.log('Fetching latest results...');
    const latestResults = await fetchLatestResultsFromCaixa();
    console.log('Latest results fetched successfully');

    // Fetch detailed results
    const results = await Promise.all(
      Object.entries(gamesMap).map(async ([originalGame, gameKey], index) => {
        try {
          await delay(index * 500);

          const contestNumber = latestResults[originalGame]?.numeroDoConcurso;
          if (!contestNumber) {
            console.log(`No contest number found for ${gameKey}`);
            return null;
          }

          console.log(`Fetching ${gameKey} contest ${contestNumber}...`);
          const detailedResult = await fetchResult(
            gameKey as GameType,
            contestNumber
          );

          if (!detailedResult) {
            console.log(
              `Failed to fetch details for ${gameKey} contest ${contestNumber}`
            );
            return null;
          }

          await redis.set(
            `lottery:${gameKey}:latest`,
            JSON.stringify(detailedResult)
          );
          await redis.set(
            `lottery:${gameKey}:${contestNumber}`,
            JSON.stringify(detailedResult)
          );

          console.log(
            `Successfully updated ${gameKey} contest ${contestNumber}`
          );
          return { game: gameKey, contest: contestNumber, success: true };
        } catch (error) {
          console.error(`Error processing ${gameKey}:`, error);
          return null;
        }
      })
    );

    const summary = results.filter(Boolean);
    console.log('Update completed:', summary);
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Failed to fetch results:', error);
    return NextResponse.json(
      { error: `Failed to fetch lottery results: ${error}` },
      { status: 500 }
    );
  }
}
