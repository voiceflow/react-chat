import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SIZES } from '@/styles/sizes';

const ANIMATION_DURATION = 1000;

const pulseAnimation = keyframes({
  '50%': { opacity: 1 },
});

export const indicatorContainer = style({
  display: 'inline-flex',
});

export const dot = recipe({
  base: {
    width: 8,
    height: 8,
    margin: '0 2px',
    borderRadius: SIZES.radius.round,
    backgroundColor: '#adadb3', // TODO: Should this be in the COLORS array
    opacity: 0.2,
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
