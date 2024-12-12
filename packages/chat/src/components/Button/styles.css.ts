import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

import { cardContainer } from '../Card/styles.css';
import { buttonReset } from './reset.css';

export const buttonStyles = recipe({
  base: [
    buttonReset,
    {
      fontFamily: THEME.fontFamily,
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
        color: THEME.colors[500],
        backgroundColor: THEME.colors[50],
        lineHeight: '20px',
        padding: '7px 12px 6px 12px',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
        textAlign: 'left',
        height: 'fit-content',
        ':hover': {
          color: THEME.colors[700],
          backgroundColor: THEME.colors[100],
        },
        ':active': {
          color: THEME.colors[800],
          backgroundColor: THEME.colors[200],
        },
      },
      primary: {
        paddingTop: 2,
        color: COLORS.white,
        backgroundColor: THEME.colors[500],
        borderRadius: SIZES.radius.xxs,
        height: SIZES.sm,
        fontWeight: 600,
        display: 'block',
        width: '100%',
        ':hover': {
          backgroundColor: THEME.colors[600],
        },
        ':active': {
          backgroundColor: THEME.colors[700],
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
          },
        },
      },
    },

    large: {
      true: {
        borderRadius: SIZES.radius.xs,
        padding: '11px 16px 9px 16px',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        lineHeight: '20px',
        justifyContent: 'center',
      },
    },

    round: {
      true: {
        borderRadius: 9999,
      },
    },
  },
});
