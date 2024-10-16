import clsx from 'clsx';

import Icon from '../Icon';
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
  return (
    <button {...props} className={clsx(squareButtonStyles({ size }), SquareButtonTheme[variant])}>
      <Icon svg={iconName} className={iconClassName} />
    </button>
  );
};
