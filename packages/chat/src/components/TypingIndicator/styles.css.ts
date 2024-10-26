import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SIZES } from '@/styles/sizes';

export const indicatorContainer = style({
  display: 'inline-flex',
});

export const dot = recipe({
  base: {
    width: 8,
    height: 8,
    margin: '0 2px',
    borderRadius: SIZES.radius.round,
    backgroundColor: '#adadb3',
    opacity: 0.2,
    // TODO: Get keyFrames here
    animation: '',
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
