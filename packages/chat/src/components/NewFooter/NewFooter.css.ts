import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration, timingFunction } from '@/styles/animations';
import { chatIsClosed, chatIsOpen } from '@/views/ChatWidget/styles.css';

const BUTTON_ROW_MARGIN = 10;

const fadeInAndSlideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const fadeOutSlideDown = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
});

export const footerContainer = style({
  width: '100%',
  selectors: {
    [`.${chatIsOpen} &`]: {
      animation: `${fadeInAndSlideUp} .6s ${timingFunction.gentle} forwards`,
    },
    [`.${chatIsClosed} &`]: {
      animationDelay: duration.slow,
      animation: `${fadeOutSlideDown} 300ms ${timingFunction.gentle} forwards`,
    },
  },
});

export const buttonsContainer = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'nowrap',
  marginBottom: `${BUTTON_ROW_MARGIN}px`,
  overflow: 'hidden',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  padding: '0 20px',
});

export const inputContainer = style({
  padding: '0 20px',
});

export const messageContainer = recipe({
  base: {
    padding: '0 20px',
    position: 'relative',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 29.49%, #FFF 29.5%, #F8F8F8 100%)',
  },
});

export const hasEnded = style({
  top: '-24px',
});
