import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

const ANIMATION_DURATION = 1000;

const pulseAnimation = keyframes({
  '25%': {
    backgroundColor: COLORS.NEUTRAL_LIGHT[900],
    scale: 1.2,
  },
  '50%': {
    scale: 1,
    backgroundColor: COLORS.NEUTRAL_LIGHT[600],
  },
  '75%': {
    backgroundColor: COLORS.NEUTRAL_LIGHT[300],
  },
  '100%': {
    backgroundColor: COLORS.NEUTRAL_LIGHT[600],
  },
});

export const indicatorContainer = style({
  display: 'inline-flex',
  gap: '5px',
});

export const dot = recipe({
  base: {
    width: 7,
    height: 7,
    borderRadius: SIZES.radius.round,
    transition: transition(['background-color', 'scale']),
    backgroundColor: COLORS.NEUTRAL_LIGHT[600],
    animation: `${pulseAnimation} ${ANIMATION_DURATION}ms`,
    animationIterationCount: 'infinite',
  },

  variants: {
    dot: {
      first: {
        animationDelay: '333ms',
      },
      second: {
        animationDelay: '666ms',
      },
      third: {
        animationDelay: '999ms',
      },
    },
  },
});
