import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const inputContainer = style({
  borderRadius: '100px',
  width: '100%',
  display: 'block',
  boxSizing: 'border-box',
  padding: '13px 8px 11px 20px',
  outline: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  position: 'relative',
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',
  border: '2px solid transparent',
  transition: transition(['border-color', 'outline', 'box-shadow']),
  selectors: {
    '&:hover': {
      outline: `1px solid ${COLORS.NEUTRAL_LIGHT[200]}`,
    },
    '&:focus': {},
    '&:focus-within': {
      outline: '1px solid transparent',
      border: `2px solid ${COLORS.ACCENT[500]}`,
    },

    '&::placeholder': {
      // transform: 'transla  teY(1px)',
      // marginTop: '2px',
      color: COLORS.NEUTRAL_DARK[100],
      fontSize: '14px',
    },
  },
});

export const input = style({
  outline: 'none',
  border: 'none',
  borderColor: 'transparent',
  outlineColor: 'transparent',
  fontFamily: FAMILY,
  lineHeight: '20px',
});

export const mockFocus = style({
  position: 'absolute',
  top: -1,
  left: -1,
  right: -1,
  bottom: -1,
  borderRadius: '100px',
  pointerEvents: 'none',
  transition: transition(['border-color']),
  selectors: {
    [`${input}:focus-within ~ &`]: {
      border: `2px solid ${COLORS.ACCENT[500]}`,
    },
  },
});

export const buttonContainer = style({
  position: 'absolute',
  right: '0',
  top: 0,
  cursor: 'pointer',
  transition: transition(['background-color']),
});
