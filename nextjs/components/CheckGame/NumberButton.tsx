import classNames from 'classnames';
import { gameThemes } from '@/const/games';
import { GameType } from '@/types/loteria';

interface NumberButtonProps {
  number: number;
  isSelected: boolean;
  onClick: () => void;
  game: GameType;
  isTrevo?: boolean;
}

const NumberButton = ({
  number,
  isSelected,
  onClick,
  game,
  isTrevo = false,
}: NumberButtonProps) => {
  const theme = gameThemes[game];

  return (
    <button
      onClick={onClick}
      className={classNames(
        'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold',
        'transition-all duration-200',
        {
          [theme.bg]: isSelected,
          [theme.text]: isSelected,
          'hover:bg-gray-200': !isSelected,
          'bg-gray-100 text-gray-900': !isSelected,
          'ring-2 ring-offset-2': isSelected,
          [theme.ring]: isSelected,
        }
      )}
    >
      {number.toString().padStart(2, '0')}
    </button>
  );
};

export default NumberButton;
