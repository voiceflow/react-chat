import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SHADOWS } from '@/styles/box-shadows';
import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';

export const activeBackground = createVar();
export const activeIconColor = createVar();

export const feedbackContainer = recipe({
  base: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    borderRadius: '7px',
    padding: '2px',
    boxShadow: SHADOWS.Z1_Light,
    width: 'fit-content',
  },
  variants: {
    previousResponse: {
      true: {
        backgroundColor: COLORS.white,
      },
      false: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  },
});

export const feedbackButtonStyles = recipe({
  base: {
    borderRadius: '5px',
    height: '24px',
    width: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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

          '&:focus-visible': {
            outline: 'none',
          },
        },
      },
    },
    isSelected: {
      true: {
        selectors: {
          '&:hover': {
            backgroundColor: 'transparent',
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
    flex: 'none',
    alignItems: 'center',
  },
  variants: {
    isActive: {
      true: {
        color: activeIconColor,
      },
      false: {
        selectors: {
          [`${feedbackButtonStyles()}:hover &`]: {
            color: COLORS.NEUTRAL_DARK[500],
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
    isSelected: {
      true: {
        color: COLORS.ACCENT[500],
        selectors: {
          [`${feedbackButtonStyles()}:hover &`]: {
            color: COLORS.ACCENT[500],
          },
          [`${feedbackButtonStyles()}:active &`]: {
            color: COLORS.ACCENT[500],
          },
          [`${feedbackButtonStyles({ isActive: true })}:focus &`]: {
            color: COLORS.ACCENT[500],
          },
        },
      },
    },
  },
});
