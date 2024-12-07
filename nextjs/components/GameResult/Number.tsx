import { gameThemes } from '@/const/games';
import { GameType } from '@/types/loteria';
import classNames from 'classnames';

interface NumberBallProps {
  number: string;
  game: GameType;
  size?: 'sm' | 'md' | 'lg';
}

export function NumberBall({ number, game, size = 'md' }: NumberBallProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div
      className={classNames(
        'rounded-full flex items-center justify-center font-bold',
        sizes[size],
        theme?.bg,
        theme?.text
      )}
    >
      {number}
    </div>
  );
}
