import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { widgetContainer } from '@/views/ChatWidget/styles.css';

const BUTTON_ROW_MARGIN = 10;

const fadeInAndSlideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(10px)',
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
    transform: 'translateY(10px)',
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

export const footerContainer = style({
  width: '100%',

  selectors: {
    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      animation: `${fadeInAndSlideUp} 300ms ease-in`,
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateY(0)',
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      animation: `${fadeOutSlideDown} 300ms ease-out`,
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateY(100%)',
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

export const scrollButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: `${BUTTON_ROW_MARGIN}px`,
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
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

export const messageInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  backgroundColor: COLORS.white,
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
});
