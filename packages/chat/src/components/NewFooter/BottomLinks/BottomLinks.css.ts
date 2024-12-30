import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

export const smallStyle = style({});

export const footerLinksContainer = recipe({
  base: {
    color: COLORS.NEUTRAL_DARK[100],
    fontFamily: THEME.fontFamily,
    width: '100%',
    padding: '10px 0',
    fontSize: '12px',
    lineHeight: '17px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  variants: {
    small: {
      true: {
        fontSize: '11px',
        lineHeight: '15px',
      },
      false: {},
    },
  },
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: SIZES.radius.round,
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});

export const extraLinkStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: THEME.fontFamily,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      color: THEME.colors[500],
      textDecorationColor: THEME.colors[500],
    },
    '&:active': {
      color: THEME.colors[600],
      textDecorationColor: THEME.colors[600],
    },
  },
});

export const voiceflowLink = style({
  color: COLORS.NEUTRAL_DARK[100],
  textDecoration: 'underline',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  selectors: {
    '&:hover': {
      color: THEME.colors[500],
      textDecorationColor: THEME.colors[500],
    },
    '&:active': {
      color: THEME.colors[600],
      textDecorationColor: 'transparent',
    },
  },
});

export const footerNote = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: THEME.fontFamily,
  fontSize: 'inherit',
  lineHeight: 'inherit',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  ...hideTextOverflow(),
});
