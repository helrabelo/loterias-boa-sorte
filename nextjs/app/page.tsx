import { sanityFetch } from '@/lib/sanity/live';
import { settingsQuery } from '@/lib/sanity/queries';
import Image from 'next/image';
import { GameResult } from '@/components/GameResult';
import { GameType } from '@/types/loteria';
import redis from '@/services/redis';
import GAMES from '@/const/games';

async function getLatestResults() {
  const results = await Promise.all(
    GAMES.map(async (game) => {
      try {
        const result = await redis.get(`lottery:${game}:latest`);
        return { game, result };
      } catch (error) {
        console.error(`Error fetching ${game} results:`, error);
        return { game, result: null };
      }
    })
  );

  return results.filter(({ result }) => result !== null);
}

export default async function Page() {
  const { data: settings } = await sanityFetch<typeof settingsQuery>({
    query: settingsQuery,
    stega: false,
  });

  const results = await getLatestResults();

  return (
    <>
      <div className="container my-4 mx-auto">
        {/* left grid // sidebar */}
        <div className="rounded-full border">
          <div className="flex justify-center items-center gap-4">
            <Image
              src="/images/logo-caixa.png"
              alt="Loterias Caixa"
              width={90}
              height={90}
              priority
            />
            <span className="hidden sm:block font-caixa font-bold text-xl md:text-4xl leading-5 text-semantic-primary">
              Boa Sorte
              <br /> Loterias
            </span>
          </div>
          {settings?.messages?.footer && (
            <p className="text-sm text-gray-600">
              {settings?.messages?.footer}
            </p>
          )}
        </div>
        {/* Últimos Resultados */}
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold mb-6">Últimos Resultados</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {Array.isArray(results) &&
              results.map(
                ({ game, result }) =>
                  result && (
                    <GameResult
                      key={`${game}-${result.numero}`}
                      game={game as GameType}
                      data={result}
                    />
                  )
              )}
          </div>
        </div>
      </div>
    </>
  );
}
