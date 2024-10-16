import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

export const activeBackground = createVar();
export const activeIconColor = createVar();

export const feedbackButtonStyles = recipe({
  base: {
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
  },
  variants: {
    isActive: {
      true: {
        boxShadow: '0px -1px 0px 0px rgba(0, 0, 0, 0.16) inset',
        backgroundColor: activeBackground,
      },
      false: {
        selectors: {
          '&:hover': {
            backgroundColor: COLORS.NEUTRAL_DARK[9006],
          },
          '&:active': {
            backgroundColor: COLORS.NEUTRAL_DARK[90012],
          },
          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
  },
});

export const iconStyle = recipe({
  base: {
    color: COLORS.NEUTRAL_DARK[100],
    transition: transition(['color']),
  },
  variants: {
    isActive: {
      true: {
        color: activeIconColor,
      },
      false: {
        selectors: {
          [`${feedbackButtonStyles()}:hover &`]: {
            color: COLORS.NEUTRAL_DARK[600],
          },
          [`${feedbackButtonStyles()}:active &`]: {
            color: COLORS.NEUTRAL_DARK[900],
          },
          [`${feedbackButtonStyles({ isActive: true })}:focus &`]: {
            color: activeIconColor,
          },
        },
      },
    },
  },
});
