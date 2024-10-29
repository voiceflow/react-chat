import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PALETTE } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';

export const LAUNCHER_SIZE = 56;
const buttonSizeWithLabel = 48;

export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      width: LAUNCHER_SIZE,
      height: LAUNCHER_SIZE,
      padding: 12,
      backgroundColor: PALETTE.colors[500],
      transition: transition(['color', 'background-color', 'transform']),
      boxShadow:
        '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
      ':hover': {
        transform: 'scale(1.1)',
        backgroundColor: PALETTE.colors[600],
      },
      ':active': {
        transform: 'scale(0.8)',
        backgroundColor: PALETTE.colors[700],
      },
    },
  ],

  variants: {
    withLabel: {
      true: {
        width: 'auto',
        height: buttonSizeWithLabel,
        padding: 18,
      },
    },
  },
});

export const launcherLabelStyles = style({
  fontSize: 16,
  fontWeight: 600,
  color: PALETTE.colors[50],
  lineHeight: '20px',
  marginRight: 8,
  paddingTop: 1,
});

export const launcherIconStyles = recipe({
  base: {
    color: PALETTE.colors[50],
    width: 32,
    height: 32,
    borderRadius: 2,
  },
  variants: {
    withLabel: {
      true: {
        width: 24,
        height: 24,
      },
    },
  },
});
