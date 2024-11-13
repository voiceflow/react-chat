import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { BUTTON_SIZE } from '../NewFooter/ScrollButton/ScrollButton.css';

const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(10px)',
  },
});

export const scrollToButtonContainer = style({
  height: 0,
  width: '100%',
  position: 'relative',
  zIndex: 12,
});

export const scrollToBottomButton = recipe({
  base: {
    opacity: 1,
    position: 'absolute',
    left: `calc(50% - ${BUTTON_SIZE / 2}px)`,
    top: `-${BUTTON_SIZE + 12}px`,
    animation: `${fadeIn} .15s ease-in`,
    outline: 'none',
  },
  variants: {
    hidden: {
      true: {
        opacity: 0,
        animation: `${fadeOut} .15s ease-in`,
      },
    },
  },
});
