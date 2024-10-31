import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';

export const proactiveContainer = recipe({
  base: {
    position: 'absolute',
    bottom: '100%',
    width: 256,
    display: 'flex',
    flexDirection: 'column',
  },

  variants: {
    side: {
      right: {
        right: 0,
        alignItems: 'end',
      },
      left: {
        left: 0,
        alignItems: 'start',
      },
    },
  },
});

export const singleMessage = style({
  padding: '11px 16px 10px 16px',
  maxWidth: 256,
  color: '#1A1E23',
  boxShadow:
    '0px 1px 3px 1px rgba(22, 26, 30, 0.01), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 0px 0px rgba(22, 26, 30, 0.02)',
  borderRadius: SIZES.radius.xxs,
  backgroundColor: COLORS.white,
  fontSize: 14,
});

export const messageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '16px 0',
  alignItems: 'inherit',
});

export const closeButton = style({
  width: SIZES.sm,
  height: SIZES.sm,
  borderRadius: SIZES.radius.round,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#656D75',
  cursor: 'pointer',
  backgroundColor: COLORS.white,
  boxShadow: '',
  ':hover': {
    color: '',
  },
  ':active': {
    color: '',
  },
});

export const closeButtonIcon = style({
  width: 10,
  height: 10,
});
