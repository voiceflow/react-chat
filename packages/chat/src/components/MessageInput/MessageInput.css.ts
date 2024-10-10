import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

export const input = style({
  borderRadius: '100px',
  border: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
  padding: '8px 8px 8px 20px',
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',
  transition: transition(['border-color', 'box-shadow']),
  outline: 'none',
  selectors: {
    '&:hover': {
      borderColor: COLORS.NEUTRAL_LIGHT[200],
    },
    '&:focus': {
      // border: '2px solid #397DFF',
      boxShadow: '0px 0px 0px 1px #397DFF',
    },
  },
});
