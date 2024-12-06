import { GameType } from '@/types/loteria';

interface NumberBallProps {
  number: string;
  game: GameType;
  size?: 'sm' | 'md' | 'lg';
}

export function NumberBall({ number, game, size = 'md' }: NumberBallProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div
      className={`${sizes[size]} bg-${game} rounded-full flex items-center justify-center font-bold`}
    >
      {number}
    </div>
  );
}
