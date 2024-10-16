import type { SVG } from '../Icon';

export interface ISquareButton {
  iconName: SVG;
  disabled?: boolean;
  size: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  iconClassName?: string;
  variant?: 'light' | 'dark';
  ref?: React.Ref<HTMLButtonElement>;
}
