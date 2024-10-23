import { createVar, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const themedFocusRing = createVar();

export const inputContainer = style({
  position: 'relative',
  borderRadius: '25px',
  display: 'flex',
  zIndex: 1,
  justifyContent: 'space-between',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '14px',

  boxSizing: 'border-box',
  paddingLeft: '20px',
  paddingRight: '8px',
  border: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',
  transition: transition(['border', 'box-shadow']),
  selectors: {
    '&:hover': {
      border: `1px solid ${COLORS.NEUTRAL_LIGHT[200]}`,
    },
  },
});

export const mockFocusRing = style({
  position: 'absolute',
  top: '-1px',
  left: '-1px',
  right: '-1px',
  bottom: '-1px',
  borderRadius: '25px',
  pointerEvents: 'none',
  opacity: 0,
  boxShadow: `inset 0 0 0 0px ${themedFocusRing}`,
  transition: transition(['opacity', 'box-shadow']),
  selectors: {
    [`${inputContainer}:focus-within &`]: {
      opacity: 1,
      boxShadow: `inset 0 0 0 2px ${themedFocusRing}`,
    },
  },
});

export const input = style({
  width: '100%',
  scrollbarWidth: 'none',
  borderColor: 'transparent',
  outlineColor: 'transparent',
  resize: 'none',
  fontFamily: FAMILY,
  boxSizing: 'border-box',

  padding: '0',
  lineHeight: '20px',
  paddingTop: '2px',
  color: COLORS.NEUTRAL_DARK[900],
  selectors: {
    '&::placeholder': {
      color: COLORS.NEUTRAL_DARK[100],
    },
  },
});

export const inputBlock = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 'auto',
  marginRight: '8px',
});

export const buttonContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '8px',
  height: '100%',
});
