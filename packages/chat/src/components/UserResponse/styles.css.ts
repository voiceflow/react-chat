import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';

export const messageContainer = recipe({
  base: {
    fontFamily: FAMILY,
    fontSize: '14px',
    lineHeight: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    alignItems: 'flex-end',
  },
  variants: {
    isFirst: {
      true: {
        marginTop: '0px',
      },
      false: {
        marginTop: '16px',
      },
    },
  },
});

export const messageRow = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

export const messageStyle = style({
  display: 'inline-block',
  padding: '10px 14px',
  borderRadius: SIZES.radius.sm,
  overflowWrap: 'anywhere',
  color: PALETTE.colors[50],
  backgroundColor: PALETTE.colors[500],
  whiteSpace: 'break-spaces',
});

export const debugMessage = style({
  fontSize: '12px',
  lineHeight: '17px',
  color: COLORS.NEUTRAL_DARK[200],
  marginTop: SIZES.m,
});
