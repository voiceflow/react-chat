import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-50%) translateY(10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateX(-50%) translateY(0)',
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(-50%) translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(-50%) translateY(10px)',
  },
});

export const scrollToButton = recipe({
  base: {
    position: 'absolute',
    // TODO: Make sure this still looks good with and without a footer
    bottom: '97px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 12,
    animation: `${fadeIn} .15s ease-in`,
  },
  variants: {
    hidden: {
      true: {
        opacity: 0,
        pointerEvents: 'none',
        animation: `${fadeOut} .15s ease-out`,
      },
    },
  },
});
