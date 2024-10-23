import { keyframes, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';

export const chatContainer = style({
  height: '700px',
  width: '100%',
  borderRadius: '16px',
  backgroundColor: COLORS.white,
  border: `.5px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  position: 'relative',
  boxShadow:
    '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 40px 64px -32px rgba(22, 26, 30, 0.12)',
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const MOBILE_WIDGET_HEIGHT = 600;

export const dialogContainer = style({
  position: 'relative',
  marginBottom: '48px',
  height: `${MOBILE_WIDGET_HEIGHT}px`,
  overflow: 'hidden',
  scrollbarWidth: 'none',

  overflowY: 'auto',
});

export const chatFooter = style({
  bottom: 0,
  position: 'absolute',
  width: '100%',
});

export const scrollToButton = style({
  position: 'absolute',
  bottom: '97px ',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 12,
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});
