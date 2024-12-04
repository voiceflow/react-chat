import { style } from '@vanilla-extract/css';

import { BREAKPOINTS } from '@/styles/sizes';

export const chatWindowStyle = style({
  height: '100%',
  maxHeight: '800px',
  '@media': {
    [`(max-width: ${BREAKPOINTS.mobile})`]: {
      maxHeight: '100vh',
    },
  },
});
