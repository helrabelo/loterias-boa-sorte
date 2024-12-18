import { GameType } from '@/types/loteria';
import { gameThemes, GAMES_SETTINGS } from '@/const/games';
import Link from 'next/link';

interface BaseCardProps {
  game: GameType;
  children: React.ReactNode;
}

export function BaseCard({ game, children }: BaseCardProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];

  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden flex flex-col">
      <div className={`p-4 ${theme?.bg}`}>
        <div className="flex justify-between items-center">
          <h3 className={`font-bold text-lg ${theme?.text} capitalize`}>
            {GAMES_SETTINGS[game].title}
          </h3>
          <Link
            href={`/conferir-resultado`}
            className={`text-sm ${theme?.text} hover:opacity-80 transition-opacity inline-flex items-center gap-1`}
          >
            Conferir resultado
            <span aria-hidden="true" className="font-bold">
              →
            </span>
          </Link>
        </div>
      </div>
      <div className="p-4 grow flex flex-col">{children}</div>
    </div>
  );
}
