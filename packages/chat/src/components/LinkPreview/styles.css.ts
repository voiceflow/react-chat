import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY, lineClamp } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

export const linkPreviewContainer = recipe({
  base: [
    {
      display: 'flex',
      borderRadius: SIZES.radius.sm,
      padding: '6px 8px 6px 6px',
      backgroundColor: COLORS.NEUTRAL_LIGHT[50],
      fontFamily: FAMILY,
      transition: transition(['color', 'background-color']),
      height: 64,
      ':hover': {
        cursor: 'pointer',
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
        height: 43,
        padding: '4px 8px 4px 4px',
        backgroundColor: COLORS.NEUTRAL_LIGHT[100],
        ':hover': {
          backgroundColor: COLORS.NEUTRAL_LIGHT[200],
        },
        ':active': {
          backgroundColor: COLORS.NEUTRAL_LIGHT[300],
        },
      },
    },
  },
});

export const linkPreviewImageContainer = recipe({
  base: {
    position: 'relative',
    width: 52,
    height: 52,
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius.xxxs,
    marginRight: 8,
    backgroundColor: COLORS.NEUTRAL_DARK[9006],
    overflow: 'hidden',
  },

  variants: {
    inline: {
      true: {
        width: 35,
        height: 35,
      },
    },
    loading: {
      true: {
        boxShadow: 'none',
      },
    },
  },
});

export const linkPreviewImage = style({
  width: '100%',
  '::after': {
    content: '',
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    right: 0,
    display: 'block',
    boxShadow: '0px -1px 0px 0px rgba(0, 0, 0, 0.04) inset',
  },
});

export const linkPreviewDetails = style({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '17px',
  overflow: 'hidden',
});

export const linkPreviewTitle = recipe({
  base: {
    flexGrow: 1,
    color: COLORS.NEUTRAL_DARK[900],
    ...lineClamp(2),
  },
  variants: {
    inline: {
      true: {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
});

export const linkPreviewUrl = recipe({
  base: {
    flexShrink: 0,
    color: COLORS.NEUTRAL_DARK[100],
    ':hover': {
      color: COLORS.NEUTRAL_DARK[200],
    },
    ':active': {
      color: COLORS.NEUTRAL_DARK[200],
    },
  },
  variants: {
    loading: {
      true: {
        ':hover': {
          color: COLORS.NEUTRAL_DARK[100],
        },
        ':active': {
          color: COLORS.NEUTRAL_DARK[100],
        },
      },
    },
    inline: {
      true: {
        ':hover': {
          color: COLORS.NEUTRAL_DARK[100],
        },
        ':active': {
          color: COLORS.NEUTRAL_DARK[100],
        },
      },
    },
  },
});
