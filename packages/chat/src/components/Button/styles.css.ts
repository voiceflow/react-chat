import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PALETTE } from '@/styles/colors.css';
import { SIZES } from '@/styles/sizes';

import { buttonReset } from './reset.css';

export const roundButton = style({
  borderRadius: '999px !important',
});

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
      primary: {
        // TODO(COR-3533) - Add Primary/Secondary buttons
        // Currently just a placeholder
      },
      secondary: {
        // TODO(COR-3533) - Add Primary/Secondary buttons
        // Currently just a placeholder
      },
      inline: {
        borderRadius: SIZES.radius.xs,
        color: PALETTE.colors[500],
        backgroundColor: PALETTE.colors[50],
        fontSize: '14px',
        lineHeight: '20px',
        padding: '7px 12px 6px 12px',

        ':hover': {
          color: PALETTE.colors[700],
          backgroundColor: PALETTE.colors[100],
        },
        ':active': {
          color: PALETTE.colors[800],
          backgroundColor: PALETTE.colors[200],
        },
      },
    },
    round: {
      true: {
        borderRadius: 9999,
      },
    },
  },
});
