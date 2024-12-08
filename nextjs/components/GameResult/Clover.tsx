import { gameThemes } from '@/const/games';
import { GameType } from '@/types/loteria';
import { FaClover } from 'react-icons/fa6';
import classNames from 'classnames';

interface CloverProps {
  number: string;
  game: GameType;
  size?: 'sm' | 'md' | 'lg';
}

export function Clover({ number, game, size = 'md' }: CloverProps) {
  const theme = gameThemes[game as keyof typeof gameThemes];

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div
      className={classNames(
        'rounded-full flex items-center justify-center font-bold relative w-[48px] h-[48px] text-white',
        // sizes[size],
        theme?.text
      )}
    >
      <FaClover
        size={48}
        className={classNames('rotate-45 scale-110 absolute -z-1', `text-lottery-mais-milionaria`)}
      />
      <span className='absolute z-10'>{number}</span>
    </div>
  );
}
