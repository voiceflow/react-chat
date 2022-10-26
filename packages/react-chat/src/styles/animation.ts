import { keyframes } from '@stitches/react';

export const pulse = keyframes({
  '50%': { opacity: 1 },
});

export const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export const rotate = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const shift = (distance: number) =>
  keyframes({
    from: { transform: `translateY(${distance}px)` },
    to: { transform: 'translateY(0px)' },
  });
