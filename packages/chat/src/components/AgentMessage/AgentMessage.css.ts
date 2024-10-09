import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const messageContainer = recipe({
  base: {
    backgroundColor: COLORS.NEUTRAL_LIGHT[50],
    color: COLORS.NEUTRAL_DARK[900],
    fontFamily: FAMILY,
    position: 'relative',
    width: 'fit-content',
    fontSize: '14px',
    lineHeight: '20px',
    borderRadius: '10px',
  },
  variants: {
    isCodeBlock: {
      true: {
        padding: 0,
      },
    },
  },
});

export const contentStyle = style({
  padding: '11px 16px 10px',
});

export const generatedChin = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px 9px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[100],
  left: 0,
  right: 0,
  bottom: 0,
  width: 'fit-content',
  color: COLORS.NEUTRAL_DARK[200],
  fontFamily: FAMILY,
  fontSize: '12px',
  whiteSpace: 'nowrap',
  lineHeight: '17px',
  gap: '10px',
  fontWeight: 600,
  borderRadius: '0 0 10px 10px',
});

export const aiIconModifier = style({
  color: COLORS.NEUTRAL_DARK[100],
});
