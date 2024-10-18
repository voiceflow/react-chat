import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const footerContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
});

const BUTTON_HEIGHT = 33;
const BUTTON_ROW_MARGIN = 10;
const SCROLL_TO_BUTTON_MARGIN = 12;

export const scrollableButtonContainer = style({
  display: 'inline-flex',
  gap: '8px',
  width: '100%',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  position: 'absolute',
  top: `${-BUTTON_HEIGHT - BUTTON_ROW_MARGIN}px`,
});

export const messageBackground = recipe({
  base: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '20px',
  },
  variants: {
    showPoweredBy: {
      true: {
        paddingBottom: '20px',
      },
    },
  },
});

export const messageContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
});

export const messageContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  flex: 1,
});

export const messagePadding = style({
  padding: '0 20px',
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const scrollToButtomButtonContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: `${-SCROLL_TO_BUTTON_MARGIN - 14}px`,
    transform: 'translate(-50%, -50%)',
    animation: `${fadeIn} .15s ease-in`,
  },
  variants: {
    hasButtons: {
      true: {
        top: `${-BUTTON_HEIGHT - BUTTON_ROW_MARGIN - SCROLL_TO_BUTTON_MARGIN - 14}px`,
      },
    },
  },
});

export const poweredByStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: '100px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});
