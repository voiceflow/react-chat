import clsx from 'clsx';

import type { IconProps } from '../../Icon';
import { Icon } from '../../Icon';
import { buttonIconStyles } from './ButtonIcon.css';

interface IButtonIcon {
  svg: IconProps['svg'];
  className?: string;
}

export const ButtonIcon: React.FC<IButtonIcon> = ({ svg, className, ...props }) => {
  return <Icon svg={svg} className={clsx(buttonIconStyles, className)} {...props} />;
};
