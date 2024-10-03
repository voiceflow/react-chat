import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { buttonStyles } from '../Button/styles.css';

export const sendButtonStyle = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      height: 32,
      width: 32,
      padding: 0,
    },
  ],
  variants: {
    disabled: {
      true: {
        backgroundColor: COLORS.NEUTRAL_LIGHT[50],
      },
      false: {
        backgroundColor: PALETTE.colors[500],
        ':hover': {
          backgroundColor: PALETTE.colors[600],
        },
        ':active': {
          backgroundColor: PALETTE.colors[700],
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
        color: COLORS.white,
      },
    },
  },
});
