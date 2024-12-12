import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';

export const sendButtonStyle = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      display: 'flex',
      height: 32,
      width: 32,
      padding: 0,
      boxShadow: '0px -1px 0px 0px rgba(0, 0, 0, 0.16) inset',
      transition: transition(['color', 'background-color', 'transform']),
    },
  ],
  variants: {
    disabled: {
      true: {
        boxShadow: 'none',
        backgroundColor: COLORS.NEUTRAL_LIGHT[50],
        ':hover': {
          cursor: 'not-allowed',
          backgroundColor: COLORS.NEUTRAL_LIGHT[50],
        },
      },
      false: {
        backgroundColor: THEME.colors[500],
        ':hover': {
          transform: 'scale(1.15)',
          backgroundColor: THEME.colors[600],
        },
        ':active': {
          transform: 'scale(1)',
          backgroundColor: THEME.colors[700],
        },
      },
    },
  },
});

export const sendIconStyle = recipe({
  variants: {
    disabled: {
      true: {
        color: COLORS.NEUTRAL_DARK[100],
      },
      false: {
        color: THEME.colors[50],
      },
    },
  },
});
