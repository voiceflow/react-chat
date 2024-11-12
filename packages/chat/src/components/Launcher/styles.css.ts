import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PALETTE } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';

export const LAUNCHER_SIZE = 48;

export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      display: 'flex',
      width: LAUNCHER_SIZE,
      height: LAUNCHER_SIZE,
      // alignItems: 'center',
      padding: '8px 16px',
      backgroundColor: PALETTE.colors[500],
      transition: transition(['color', 'background-color', 'transform', 'width', 'height']),
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
        height: 'auto',
        width: 'auto', // height: buttonSizeWithLabel,
      },
    },
    isOpen: {
      true: {
        height: '48px',
        width: '48px',
      },
    },
  },
});

export const launcherLabelStyles = recipe({
  base: {
    fontSize: '14px',
    fontWeight: 600,
    color: PALETTE.colors[50],
    lineHeight: '20px',
    marginLeft: 8,
    paddingTop: 1,
  },
  variants: {
    isOpen: {
      true: {
        display: 'none',
      },
    },
  },
});

export const launcherIconStyles = recipe({
  base: {
    color: PALETTE.colors[50],
    width: 32,
    height: 32,
    borderRadius: 2,
    flexShrink: 0,
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
const fadeOutAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
    transform: 'rotate(180deg)',
  },
});

export const twistInAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '25%': {
    transform: 'rotate(-45deg)',
    opacity: 1,
  },
  '100%': {
    transform: 'rotate(0deg)',
    opacity: 1,
  },
});

export const closeChevron = style({
  transform: 'rotate(0deg)',
  animation: `${twistInAnimation} 0.05s ease-in-out`,
});

export const imageStyles = recipe({
  base: {},
  variants: {
    isOpen: {
      true: {
        animation: `${fadeOutAnimation} 0.3s ease-in-out`,
        opacity: 0,
        width: 0,
      },
      false: {
        transform: 'rotate(0deg)',
        opacity: 1,
      },
    },
  },
});
