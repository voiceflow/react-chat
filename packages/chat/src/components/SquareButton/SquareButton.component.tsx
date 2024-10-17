import clsx from 'clsx';

import * as SVGs from '@/assets/svg';

import { squareButtonStyles } from './styles/SquareButton.css';
import * as SquareButtonTheme from './styles/SquareButtonTheme.css';
import type { ISquareButton } from './types';

export const SquareButton: React.FC<ISquareButton> = ({
  size = 'small',

  variant = 'light',
  iconName,
  isLoading,
  iconClassName,
  ...props
}) => {
  const icon = SVGs[iconName];
  return (
    <button {...props} className={clsx(squareButtonStyles({ size }), SquareButtonTheme[variant])}>
      {icon({ title: iconName })}
    </button>
  );
};
