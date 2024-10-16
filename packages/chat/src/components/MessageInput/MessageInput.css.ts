import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const inputContainer = style({
  position: 'relative',
  width: '100%',
});

export const input = style({
  borderRadius: '100px',
  width: '100%',
  outline: 'none',
  display: 'block',
  boxSizing: 'border-box',
  padding: '13px 8px 11px 20px',
  border: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  fontFamily: FAMILY,
  lineHeight: '20px',
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',

  transition: transition(['border-color', 'outline', 'box-shadow']),
  selectors: {
    '&:hover': {
      border: `1px solid ${COLORS.NEUTRAL_LIGHT[200]}`,
    },
    '&:focus': {},
    '&:focus-visible': {
      // outline: '1px solid red',
    },
    '&::placeholder': {
      // transform: 'transla  teY(1px)',
      // marginTop: '2px',
      color: COLORS.NEUTRAL_DARK[100],
      fontSize: '14px',
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
