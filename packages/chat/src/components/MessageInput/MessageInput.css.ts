import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const themedFocusRing = createVar();

export const inputContainer = recipe({
  base: {
    position: 'relative',
    borderRadius: '25px',
    display: 'flex',
    zIndex: 1,
    justifyContent: 'space-between',
    padding: '7px 7px 7px 20px',
    fontSize: '14px',
    boxSizing: 'border-box',
    border: `1px solid ${COLORS.NEUTRAL_LIGHT[100]}`,
    backgroundColor: COLORS.white,
    boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.02), 0px 8px 42px -16px rgba(0, 0, 0, 0.08)',
    transition: transition(['border', 'box-shadow', 'border-radius', 'opacity']),
    selectors: {
      '&:hover': {
        cursor: 'text',
        border: `1px solid ${COLORS.NEUTRAL_LIGHT[200]}`,
      },
    },
  },
  variants: {
    multiline: {
      true: {
        borderRadius: '20px',
      },
    },
    hasEnded: {
      true: {
        opacity: 0,
      },
    },
  },
});

export const mockFocusRing = recipe({
  base: {
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    right: '-1px',
    bottom: '-1px',
    borderRadius: '25px',
    pointerEvents: 'none',
    opacity: 0,
    boxShadow: `inset 0 0 0 0px ${PALETTE.colors[500]}`,
    transition: transition(['opacity', 'box-shadow', 'border-radius']),
    selectors: {
      [`${inputContainer()}:focus-within &`]: {
        opacity: 1,
        boxShadow: `inset 0 0 0 2px ${PALETTE.colors[500]}`,
      },
    },
  },
  variants: {
    multiline: {
      true: {
        borderRadius: '20px',
      },
    },
  },
});

export const input = style({
  width: '100%',
  scrollbarWidth: 'none',
  borderColor: 'transparent',
  resize: 'none',
  fontFamily: FAMILY,
  fontSize: '14px',
  boxSizing: 'border-box',
  outline: 'transparent 0px',

  padding: '0',
  lineHeight: '20px',
  paddingTop: '2px',
  color: COLORS.NEUTRAL_DARK[900],
  selectors: {
    '&::placeholder': {
      color: COLORS.NEUTRAL_DARK[100],
    },
  },
});

export const multilineInput = style({
  borderRadius: '25px',
});

export const inputBlock = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 'auto',
  marginRight: '8px',
});

export const buttonContainer = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '8px',
  height: '100%',
});

export const audioInputButton = recipe({
  base: {
    display: 'flex',
    borderRadius: 100,
    overflow: 'hidden', // Ensures smooth shrinking
    transition: transition(['opacity', 'width']), // Common transitions
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    hidden: {
      true: {
        opacity: 0,
        transition: 'opacity 0.15s, width 0.15s 0.15s', // Delay width transition to occur after opacity
        width: 0,
      },
      false: {
        opacity: 1,
        transition: 'opacity 0.15s 0.15s, width 0s', // Delay opacity to occur after width expands
      },
    },
  },
});
