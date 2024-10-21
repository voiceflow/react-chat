import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

const BUTTON_ROW_MARGIN = 10;

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

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const scrollButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: `${BUTTON_ROW_MARGIN}px`,
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});

export const messageBackground = recipe({
  base: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    height: '50%',
    left: 0,
    bottom: '-1px',
    width: '100%',
  },
  variants: {
    showPoweredBy: {
      false: {
        bottom: '-20px',
        height: '48px',
      },
    },
  },
});

export const messageContainer = style({
  position: 'relative',
  padding: '0 20px',
});

export const poweredByStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  backgroundColor: COLORS.white,
  width: '100%',
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderBottomRightRadius: '12px',
  borderBottomLeftRadius: '12px',
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: '100px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});
