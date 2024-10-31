import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY, hideTextOverflow, lineClamp } from '@/styles/font';
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
        padding: '4px 8px 4px 4px',
        borderRadius: SIZES.radius.xs,
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
    ':hover': {
      backgroundColor: COLORS.NEUTRAL_DARK[9008],
    },
    ':active': {
      backgroundColor: COLORS.NEUTRAL_DARK[90012],
    },
  },

  variants: {
    inline: {
      true: {
        width: 35,
        height: 35,
        color: COLORS.NEUTRAL_DARK[300],
        backgroundColor: COLORS.NEUTRAL_DARK[9008],
        ':hover': {
          color: COLORS.NEUTRAL_DARK[500],
          backgroundColor: COLORS.NEUTRAL_DARK[90012],
        },
        ':active': {
          color: COLORS.NEUTRAL_DARK[700],
          backgroundColor: COLORS.NEUTRAL_DARK[90016],
        },
      },
    },
    shadow: {
      true: {
        boxShadow: 'none',
      },
      false: {
        // Creates an inset box-shadow over an image
        '::after': {
          content: '',
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          right: 0,
          display: 'block',
          boxShadow: '0px -1px 0px 0px rgba(0, 0, 0, 0.08) inset',
        },
      },
    },
  },
});

export const linkPreviewImage = style({
  width: '100%',
});

export const linkPreviewDetails = style({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '17px',
  overflow: 'hidden',
});

export const linkPreviewTitle = recipe({
  base: {
    flexGrow: 1,
    color: COLORS.NEUTRAL_DARK[900],
    maxHeight: '34px',
    ...lineClamp(2),
  },
  variants: {
    inline: {
      true: {
        display: 'block',
        maxHeight: '17px',
        ...hideTextOverflow(),
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
