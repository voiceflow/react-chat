import { recipe } from '@vanilla-extract/recipes';

import { BREAKPOINTS } from '@/styles/sizes';

export const chatWindowStyle = recipe({
  base: {
    height: '100%',
    maxHeight: '800px',

    '@media': {
      [`(max-width: ${BREAKPOINTS.mobile})`]: {
        height: '100%',
        maxHeight: '100vh',
      },
    },
  },

  variants: {
    popover: {
      true: {
        height: 'auto',
        maxHeight: '100%',
        boxSizing: 'border-box',
        pointerEvents: 'all',
      },
    },
  },
});
