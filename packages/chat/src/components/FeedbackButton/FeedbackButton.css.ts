import { createVar, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

export const activeBackground = createVar();
export const activeIconColor = createVar();

export const feedbackButtonStyles = style({
  borderRadius: '100%',
  height: '32px',
  width: '32px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  backgroundColor: 'transparent',
  transition: transition(['background-color']),
  selectors: {
    '&:hover': {
      backgroundColor: COLORS.NEUTRAL_DARK[9006],
    },
    '&:active': {
      backgroundColor: COLORS.NEUTRAL_DARK[90012],
    },
    '&:focus': {
      backgroundColor: activeBackground,
    },
    '&:focus-visible': {
      outline: 'none',
    },
  },
});

export const iconStyle = style({
  color: '#656D75',
  transition: transition(['color']),

  selectors: {
    [`${feedbackButtonStyles}:hover &`]: {
      color: COLORS.NEUTRAL_DARK[600],
    },
    [`${feedbackButtonStyles}:active &`]: {
      color: COLORS.NEUTRAL_DARK[900],
    },
    [`${feedbackButtonStyles}:focus &`]: {
      color: activeIconColor,
    },
  },
});
