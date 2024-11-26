import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { FAMILY, hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

export const footerLinksContainer = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  width: '100%',
  minHeight: 20,
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: SIZES.radius.round,
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});

export const extraLinkStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
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
  fontSize: '12px',
  lineHeight: '17px',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  ...hideTextOverflow(),
});
