// app/(resultados)/page.tsx
import { sanityFetch } from '@/lib/sanity/live';
import { settingsQuery } from '@/lib/sanity/queries';
import { GameResult } from '@/components/GameResult';
import Hero from '@/components/Homepage/Hero';
import { GameType } from '@/types/loteria';
import redis from '@/services/redis';
import { GAME_TYPES } from '@/const/games';

// Mark the page as dynamic
export const dynamic = 'force-dynamic';

interface LotteryResult {
  game: GameType;
  result: any;
}

type FetchResult =
  | {
      game: GameType;
      result: any;
    }
  | {
      game: GameType;
      result: null;
      error: unknown;
    };

async function getLatestResults() {
  try {
    const results = await Promise.all(
      GAME_TYPES.map(async (game) => {
        try {
          const result = await redis.get(`lottery:${game}:latest`);
          return {
            game: game as GameType,
            result: result || null,
          } satisfies LotteryResult;
        } catch (error) {
          console.error(`Error fetching ${game} results:`, error);
          return {
            game: game as GameType,
            result: null,
            error,
          } satisfies FetchResult;
        }
      })
    );

    // Filter out failed requests and null results
    return results.filter(
      (result): result is LotteryResult =>
        result.result !== null && !('error' in result)
    );
  } catch (error) {
    console.error('Error fetching lottery results:', error);
    return [];
  }
}

export default async function Page() {
  const { data: settings } = await sanityFetch<string>({
    query: settingsQuery,
    stega: false,
  });

  const results = await getLatestResults();

  return (
    <>
      <div className="container my-4 mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Hero settings={settings} />
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <h1 className="text-2xl font-bold mb-6">Últimos Resultados</h1>
            {results.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {results.map(({ game, result }) => (
                  <GameResult
                    key={`${game}-${result.numero}`}
                    game={game}
                    data={result}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg bg-gray-50">
                <p className="text-gray-600">
                  Não foi possível carregar os resultados no momento. Por favor,
                  tente novamente mais tarde.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
