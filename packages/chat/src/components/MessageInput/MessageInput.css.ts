import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const inputContainer = style({
  position: 'relative',
  borderRadius: '25px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '8px',
  paddingBottom: '8px',
  fontSize: '14px',
  paddingLeft: '20px',
  paddingRight: '8px',
  outline: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',
  transition: transition(['border-color', 'outline', 'box-shadow']),
  selectors: {
    '&:hover': {
      outline: `1px solid ${COLORS.NEUTRAL_LIGHT[200]}`,
    },
    '&:focus': {},
    '&:focus-within': {
      outline: `2px solid ${COLORS.ACCENT[500]}`,
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
  padding: '0',
  lineHeight: '20px',
  marginTop: '2px',
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
