import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { FAMILY } from '@/old-styles/font';
import { COLORS } from '@/styles/colors';

export const messageContainer = recipe({
  base: {
    backgroundColor: '#F1F2F2',
    color: '#1A1E23',
    padding: '11px 16px 10px',
    fontFamily: FAMILY,
    fontSize: '14px',
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
  gap: 10,
  fontWeight: 600,
  borderRadius: '0 0 10px 10px',
});

export const aiIconModifier = style({
  color: COLORS.NEUTRAL_DARK[100],
});

globalStyle(`${messageContainer} *`, {
  marginTop: 0,
});

globalStyle(`${messageContainer} *:last-child`, {
  marginBottom: 0,
});
