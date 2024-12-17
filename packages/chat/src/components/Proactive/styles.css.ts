import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

export const proactiveContainer = recipe({
  base: {
    position: 'absolute',
    bottom: '100%',
    width: 256,
    display: 'flex',
    flexDirection: 'column',
    transition: transition(['opacity']),
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
  color: COLORS.NEUTRAL_DARK[900],
  boxShadow:
    '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
  borderRadius: SIZES.radius.xs,
  backgroundColor: COLORS.white,
  fontSize: 14,
  lineHeight: '20px',
  fontFamily: THEME.fontFamily,
  opacity: 0,
  transition: transition(['opacity']),
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
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: COLORS.NEUTRAL_LIGHT[100],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#656D75',
  cursor: 'pointer',
  backgroundColor: COLORS.white,
  boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.06)',
  transition: transition(['opacity', 'color', 'transform']),
  ':hover': {
    backgroundColor: COLORS.white,
    color: COLORS.NEUTRAL_DARK[600],
    transform: 'scale(1.15)',
  },
  ':active': {
    backgroundColor: COLORS.white,
    color: COLORS.NEUTRAL_DARK[800],
    transform: 'scale(0.8)',
  },
});

export const closeButtonIcon = style({
  width: 10,
  height: 10,
  marginBottom: 2,
});

export const closed = style({
  opacity: 0,
  pointerEvents: 'none',
});
