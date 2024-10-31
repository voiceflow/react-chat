import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY, hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

import { cardContainer } from '../Card/styles.css';
import { buttonReset } from './reset.css';

export const buttonStyles = recipe({
  base: [
    buttonReset,
    {
      fontFamily: FAMILY,
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 14px',
      transition: transition(['background-color', 'color']),
      borderRadius: SIZES.radius.sm,
      fontWeight: '400',
      overflowWrap: 'anywhere',
      ...hideTextOverflow(),
    },
  ],

  variants: {
    type: {
      inline: {
        borderRadius: SIZES.radius.xs,
        color: PALETTE.colors[500],
        backgroundColor: PALETTE.colors[50],
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
      primary: {
        paddingTop: 2,
        color: COLORS.white,
        backgroundColor: PALETTE.colors[500],
        borderRadius: SIZES.radius.xxs,
        height: SIZES.sm,
        fontWeight: 600,
        display: 'block',
        width: '100%',
        ':hover': {
          backgroundColor: PALETTE.colors[600],
        },
        ':active': {
          backgroundColor: PALETTE.colors[700],
        },
      },
      secondary: {
        paddingTop: 2,
        color: COLORS.NEUTRAL_DARK[500],
        backgroundColor: COLORS.NEUTRAL_DARK[9008],
        borderRadius: SIZES.radius.xxs,
        height: SIZES.sm,
        fontWeight: 600,
        display: 'block',
        width: '100%',
        ':hover': {
          color: COLORS.NEUTRAL_DARK[700],
          backgroundColor: COLORS.NEUTRAL_DARK[90012],
        },
        ':active': {
          color: COLORS.NEUTRAL_DARK[900],
          backgroundColor: COLORS.NEUTRAL_DARK[90020],
        },

        selectors: {
          // Specific styles for buttons inside the Card component
          [`.${cardContainer} &`]: {
            display: 'block',
            width: '100%',
            marginBottom: 4,
          },
        },
      },
    },

    large: {
      true: {
        height: 40,
      },
    },

    round: {
      true: {
        borderRadius: 9999,
      },
    },
  },
});
