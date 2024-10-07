import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const messageContainer = recipe({
  base: {
    backgroundColor: COLORS.ACCENT[500],
    color: COLORS.ACCENT[50],
    padding: '11px 16px 10px',
    fontFamily: FAMILY,
    position: 'relative',
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
    generated: {
      true: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
  },
});

export const generatedChin = style({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px 9px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[100],
  color: COLORS.NEUTRAL_DARK[200],
  fontFamily: FAMILY,
  fontSize: '12px',
  whiteSpace: 'nowrap',
  lineHeight: '17px',
  gap: 10,
  fontWeight: 600,
  borderRadius: '0 0 10px 10px',
});

export const aiIconModifier = style({
  color: COLORS.NEUTRAL_DARK[100],
});
