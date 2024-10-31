import { keyframes, style } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const scrollToButton = style({
  position: 'absolute',
  // TODO: Make sure this still looks good with and without a footer
  bottom: '97px ',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 12,
  animation: `${fadeIn} .15s ease-in`,
});
