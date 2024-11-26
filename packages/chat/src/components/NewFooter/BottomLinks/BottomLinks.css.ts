import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
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
      color: PALETTE.colors[500],
      textDecorationColor: PALETTE.colors[500],
    },
    '&:active': {
      color: PALETTE.colors[600],
      textDecorationColor: PALETTE.colors[600],
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
      color: PALETTE.colors[500],
      textDecorationColor: PALETTE.colors[500],
    },
    '&:active': {
      color: PALETTE.colors[600],
      textDecorationColor: 'transparent',
    },
  },
});
