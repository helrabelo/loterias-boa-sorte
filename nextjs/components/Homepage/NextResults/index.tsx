import React from 'react';
import { GameType } from '@/types/loteria';
import { gameThemes, GAMES_SETTINGS } from '@/const/games';

interface GameNextDraw {
  game: GameType;
  date: string;
  prize?: number;
  theme?: {
    bg: string;
    text: string;
    border: string;
  };
}

interface NextResultsProps {
  results: Array<{
    game: GameType;
    result: any;
  }>;
}

const NextResults = ({ results }: NextResultsProps) => {
  const parseDateString = (dateStr: string) => {
    // Assuming date format is DD/MM/YYYY
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day); // month is 0-based in JavaScript
  };

  const sortByDate = (a: GameNextDraw, b: GameNextDraw) => {
    const dateA = parseDateString(a.date);
    const dateB = parseDateString(b.date);
    return dateA.getTime() - dateB.getTime();
  };
  // Transform and validate the data
  const nextDraws = results
    .map(({ game, result }) => {
      const theme = gameThemes[game as keyof typeof gameThemes];
      // Validate that we have required data
      if (!result?.dataProximoConcurso) return null;

      return {
        game,
        date: result.dataProximoConcurso,
        prize: result.valorEstimadoProximoConcurso,
        theme,
      } as GameNextDraw;
    })
    .filter((item): item is GameNextDraw => item !== null)
    // Sort by date, using non-null assertion since we filtered nulls
    .sort(sortByDate);

  // Group by date with proper type inference
  const groupedDraws = nextDraws.reduce<Record<string, GameNextDraw[]>>(
    (groups, draw) => {
      const date = draw.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(draw);
      return groups;
    },
    {}
  );

  const formatBrazilianDate = (dateString: string) => {
    const [day, month, year] = dateString.split('/');
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-xl font-bold mb-4 text-semantic-primary">
        Próximos Resultados
      </h3>

      <div className="space-y-6">
        {Object.entries(groupedDraws).map(([date, draws]) => (
          <div key={date} className="border-b last:border-0 pb-4 last:pb-0">
            <div className="text-sm font-medium text-gray-500 mb-2 uppercase">
              {formatBrazilianDate(date)}
            </div>

            <div className="space-y-2">
              {draws.map((draw) => (
                <div
                  key={draw.game}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${draw?.theme?.bg}`}
                    />
                    <span className="text-sm font-medium">
                      {GAMES_SETTINGS[draw.game].title}
                    </span>
                  </div>

                  {draw.prize && (
                    <span className="text-xs text-gray-600">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        maximumFractionDigits: 0,
                      }).format(draw.prize)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextResults;
