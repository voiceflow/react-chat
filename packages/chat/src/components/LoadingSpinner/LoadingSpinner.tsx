import clsx from 'clsx';

import type { VariantProps } from '@/types/variants';

import { rectStyles, spinnerRecipe, spinnerStyle } from './styles.css';

export interface ILoadingSpinner extends VariantProps<typeof spinnerRecipe> {
  testID?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<ILoadingSpinner> = ({ className, testID, size = 'medium', variant = 'dark' }) => {
  const isLarge = size === 'large';
  const height = isLarge ? 6 : 4;

  const smallCoordinates: Array<{ x?: number; y?: number; transform?: string }> = [
    { x: 7.25 },
    { x: 13.1265, y: 1.81281, transform: 'rotate(45 13.1265 1.81281)' },
    { x: 16, y: 7.25, transform: 'rotate(90 16 7.25)' },
    { x: 14.1873, y: 13.1265, transform: 'rotate(135 14.1873 13.1265)' },
    { x: 8.75, y: 16, transform: 'rotate(180 8.75 16)' },
    { x: 2.87354, y: 14.1872, transform: 'rotate(-135 2.87354 14.1872)' },
    { y: 8.75, transform: 'rotate(-90 0 8.75)' },
    { x: 1.8, y: 2.873, transform: 'rotate(-45 1.81274 2.87347)' },
  ];

  const largeCoordinates: Array<{ x?: number; y?: number; transform?: string }> = [
    { x: 11.25, y: 2 },
    { x: 18.54, y: 4.39, transform: 'rotate(45 18.5408 4.39862)' },
    { x: 22, y: 11.25, transform: 'rotate(90 22 11.25)' },
    { x: 19.61, y: 18.54, transform: 'rotate(135 19.61 18.54)' },
    { x: 12.75, y: 22, transform: 'rotate(180 12.75 22)' },
    { x: 5.46, y: 19.61, transform: 'rotate(-135 5.46 19.6)' },
    { x: 2, y: 12.75, transform: 'rotate(-90 2 12.75)' },
    { x: 4.39, y: 5.46, transform: 'rotate(-45 4.39 5.45)' },
  ];

  return (
    <svg
      className={clsx(spinnerRecipe({ size, variant }), spinnerStyle, className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox={isLarge ? '2 2 20 20' : '0 0 16 16'}
      data-testid={testID}
      data-vf-loading
    >
      {(isLarge ? largeCoordinates : smallCoordinates).map((args, index) => (
        <rect key={index} className={rectStyles} width="1.5" height={height} rx=".75" {...args} />
      ))}
    </svg>
  );
};
