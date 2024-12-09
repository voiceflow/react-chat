import { keyframes, style } from '@vanilla-extract/css';

import { duration } from './animations';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const fadeInAndUp = style({
  opacity: 0,
  animation: `${fadeIn} ${duration.slow} ease-out forwards`,
});
