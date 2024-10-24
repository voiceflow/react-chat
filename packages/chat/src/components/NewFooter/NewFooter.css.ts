import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

const BUTTON_ROW_MARGIN = 10;

export const footerContainer = style({
  width: '100%',
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

export const inputContainer = style({
  padding: '0 20px',
});

export const messageContainer = recipe({
  base: {
    position: 'relative',
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 29.49%, #FFF 29.5%, #F8F8F8 100%)',
  },
  variants: {
    showPoweredBy: {
      false: {
        paddingBottom: '20px',
      },
    },
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

export const poweredByStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  width: '100%',
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: '100px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});

export const prviacyLinkStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      color: COLORS.ACCENT[500],
      textDecorationColor: COLORS.ACCENT[500],
    },
    '&:active': {
      color: COLORS.ACCENT[600],
      textDecorationColor: COLORS.ACCENT[600],
    },
  },
});
