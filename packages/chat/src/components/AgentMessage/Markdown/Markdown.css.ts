import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

export const codeBlockContainer = style({
  position: 'relative',
});

export const copyButton = style({
  position: 'absolute',
  width: '36px',
  right: '12px',
  top: '12px',
  height: '36px',
  borderRadius: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: COLORS.NEUTRAL_LIGHT[300],
  backgroundColor: COLORS.NEUTRAL_DARK[400],
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  transition: transition(['opacity', 'background-color', 'color']),
  zIndex: 2,
  opacity: 0,
  selectors: {
    [`${codeBlockContainer}:hover &`]: {
      opacity: 1,
    },
    '&:hover': {
      backgroundColor: COLORS.NEUTRAL_DARK[200],
      color: COLORS.NEUTRAL_LIGHT[50],
    },
    '&:active': {},
  },
});
