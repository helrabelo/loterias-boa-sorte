// services/populate-loterias-results.ts
import redis from '@/services/redis';
import { GameType } from '@/types/loteria';

const latestResults: Record<GameType, { numeroConcurso: number }> = {
  maismilionaria: { numeroConcurso: 204 },
  megasena: { numeroConcurso: 2804 },
  lotofacil: { numeroConcurso: 3261 },
  quina: { numeroConcurso: 6599 },
  timemania: { numeroConcurso: 2176 },
  duplasena: { numeroConcurso: 2747 },
  diadesorte: { numeroConcurso: 997 },
  supersete: { numeroConcurso: 629 },
  loteca: { numeroConcurso: 950 },
  federal: { numeroConcurso: 5562 },
  lotomania: { numeroConcurso: 2253 },
};

async function fetchResult(game: GameType, contestNumber: number) {
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
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function populateLatestResults() {
  try {
    const results = [];

    // Fetch results sequentially with delay to avoid rate limiting
    for (const [game, info] of Object.entries(latestResults)) {
      try {
        console.log(`Fetching ${game} contest ${info.numeroConcurso}`);

        const result = await fetchResult(game as GameType, info.numeroConcurso);

        const key = `lottery:${game}:${info.numeroConcurso}`;
        const latestKey = `lottery:${game}:latest`;
        const dateKey = `lottery:${game}:date:${result.dataApuracao?.split('/').reverse().join('-')}`;

        // Store all three versions
        await Promise.all([
          redis.set(key, result),
          redis.set(latestKey, result),
          result.dataApuracao && redis.set(dateKey, result),
        ]);

        results.push({ game, success: true });

        // Add delay between requests to avoid rate limiting
        await delay(1000); // 1 second delay
      } catch (error) {
        console.error(`Failed to fetch/store ${game}:`, error);
        results.push({ game, success: false, error });
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const failureCount = results.filter((r) => !r.success).length;

    console.log(`
      Population complete:
      - Successful: ${successCount}
      - Failed: ${failureCount}
      ${failureCount > 0 ? '\nFailed games:' : ''}
      ${results
        .filter((r) => !r.success)
        .map((r) => r.game)
        .join(', ')}
    `);

    return {
      success: true,
      results,
      successCount,
      failureCount,
    };
  } catch (error) {
    console.error('Failed to populate results:', error);
    throw error;
  }
}
