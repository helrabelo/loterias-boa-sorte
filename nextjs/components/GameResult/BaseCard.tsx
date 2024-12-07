import { GameType } from '@/types/loteria';
import { gameThemes, GAMES_SETTINGS } from '@/const/games';

interface BaseCardProps {
  game: GameType;
  children: React.ReactNode;
}

export function BaseCard({ game, children }: BaseCardProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];
  // return;
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className={`p-4 ${theme?.bg}`}>
        <h3 className={`font-bold text-lg ${theme?.text} capitalize`}>
          {GAMES_SETTINGS[game].title}
        </h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
