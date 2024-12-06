import { GameType } from '@/types/loteria';

interface BaseCardProps {
  game: GameType;
  children: React.ReactNode;
}

export function BaseCard({ game, children }: BaseCardProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <div className={`p-4 bg-${game}`}>
        <h3 className="font-bold text-lg">{game}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
