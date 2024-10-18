import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const footerContainer = style({
  display: 'flex',
  flexDirection: 'column',
});

export const scrollableButtonContainer = style({
  display: 'flex',
  gap: '8px',
  overflowX: 'scroll',
  paddingBottom: '10px',
  width: '100%',
  scrollbarWidth: 'none',
  paddingLeft: '20px',
});

export const messageContainer = recipe({
  base: {
    padding: '0 20px',
  },
  variants: {
    showPoweredBy: {
      false: {
        paddingBottom: '20px',
      },
    },
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const scrollToButtomButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '12px',
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});
