import { keyframes, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

const rotate = keyframes({
  '0%': { backgroundColor: COLORS.NEUTRAL_LIGHT[600], scale: 1 },
  '25%': { backgroundColor: COLORS.NEUTRAL_LIGHT[600] },
  '50%': { backgroundColor: COLORS.NEUTRAL_LIGHT[900], scale: 1.2 },
  '75%': { backgroundColor: COLORS.NEUTRAL_LIGHT[300], scale: 1 },
  '100%': { backgroundColor: COLORS.NEUTRAL_LIGHT[600], scale: 1 },
});

export const spin = style({
  animationName: rotate,
  animationDuration: '3s',
});

export const baseDot = style({
  height: '7px',
  transition: transition(['background-color', 'scale']),
  width: '7px',
  borderRadius: '50%',
  backgroundColor: COLORS.NEUTRAL_LIGHT[600],
  animation: `${rotate} 1s infinite`,
});

export const dot1 = style([
  baseDot,
  {
    animationDelay: '0s',
  },
]);

export const dot2 = style([
  baseDot,
  {
    animationDelay: '0.2s',
  },
]);

export const dot3 = style([
  baseDot,
  {
    animationDelay: '0.4s',
  },
]);

export const loadingDotContainer = style({
  display: 'flex',
  gap: '5px',
});
