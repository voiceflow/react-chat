import { recipe } from '@vanilla-extract/recipes';

import { BLUE, COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';

import { buttonReset } from './reset.css';

export const buttonStyles = recipe({
  base: [
    buttonReset,
    {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 14px',
      borderRadius: SIZES.radius.sm,
      fontWeight: '400',
      whiteSpace: 'nowrap',
      overflowWrap: 'anywhere',
    },
  ],

  variants: {
    type: {
      inline: {
        borderRadius: SIZES.radius.xs,
        // TODO: This should be dynamic from user choice
        color: COLORS.primary,
        backgroundColor: BLUE[50],
        fontSize: '14px',
        lineHeight: '20px',
        padding: '7px 12px 6px 12px',

        ':hover': {
          color: BLUE[700],
          backgroundColor: BLUE[100],
        },
      },
    },
  },
});
