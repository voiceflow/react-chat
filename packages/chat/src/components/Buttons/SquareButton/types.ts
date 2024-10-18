import type { SVG } from '@/components/Icon';

export interface ISquareButton {
  iconName: SVG;
  disabled?: boolean;
  size: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  onClick: () => void;
  iconClassName?: string;
  isActive?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
  ref?: React.Ref<HTMLButtonElement>;
}
