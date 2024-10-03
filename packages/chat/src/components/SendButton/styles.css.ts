import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { buttonStyles } from '../Button/styles.css';

export const sendButtonStyles = recipe({
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
        color: COLORS.NEUTRAL_DARK[100],
      },
      false: {
        backgroundColor: PALETTE.colors[500],
        color: COLORS.white,
      },
    },
  },
});
