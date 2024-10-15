import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY, lineClamp } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

export const linkPreviewContainer = recipe({
  base: [
    {
      cursor: 'pointer',
      display: 'flex',
      borderRadius: SIZES.radius.sm,
      padding: '6px 8px 6px 6px',
      backgroundColor: COLORS.NEUTRAL_LIGHT[50],
      fontFamily: FAMILY,
      transition: transition(['background-color']),
      height: 52,
      ':hover': {
        backgroundColor: COLORS.NEUTRAL_LIGHT[100],
      },
      ':active': {
        backgroundColor: COLORS.NEUTRAL_LIGHT[200],
      },
    },
  ],

  variants: {
    inline: {
      true: {
        backgroundColor: 'something-else',
      },
    },
  },
});

export const linkPreviewImage = recipe({
  base: {
    width: 52,
    height: 52,
    borderRadius: SIZES.radius.xs,
    marginRight: 8,
  },

  variants: {
    inline: {
      true: {
        width: 35,
        height: 35,
      },
    },
  },
});

export const linkPreviewDetails = style({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '17px',
});

export const linkPreviewTitle = style({
  flexGrow: 1,
  color: COLORS.NEUTRAL_DARK[900],
  ...lineClamp(2),
});

export const linkPreviewUrl = style({
  flexShrink: 0,
  color: COLORS.NEUTRAL_DARK[100],
  ':hover': {
    color: COLORS.NEUTRAL_DARK[200],
  },
  ':active': {
    color: COLORS.NEUTRAL_DARK[200],
  },
});
