import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

export const CARD_WIDTH = 256;

export const cardContainer = style({
  display: 'inline-flex',
  flexDirection: 'column',
  width: CARD_WIDTH,
  minWidth: CARD_WIDTH,
  boxSizing: 'content-box',
  overflow: 'hidden',
  borderRadius: SIZES.radius.sm,
  backgroundColor: COLORS.NEUTRAL_LIGHT[50],
});

export const cardImage = style({
  display: 'inline-block',
  width: '100%',
  height: 160,
});

export const cardContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  fontFamily: FAMILY,
  lineHeight: '20px',
  padding: '11px 16px 10px 16px',
});

export const cardActions = style({
  padding: '0 16px 15px 16px',
  gap: 4,
  ':only-child': {
    marginTop: 16,
  },
});

export const cardTitle = style({
  fontSize: '14px',
  fontWeight: 600,
  color: COLORS.NEUTRAL_DARK[900],
  whiteSpace: 'normal',
});

export const cardDescription = style({
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.NEUTRAL_DARK[400],
  whiteSpace: 'normal',
});
