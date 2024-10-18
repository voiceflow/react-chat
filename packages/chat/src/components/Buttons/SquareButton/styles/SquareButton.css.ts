import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { transition } from '@/styles/transitions';

import * as SquareButtonTheme from './SquareButtonTheme.css';

const xLargeSize = '40px';
const largeSize = '36px';
const mediumSize = '32px';
const smallSize = '24px';

const hoveringStyles = {
  backgroundColor: SquareButtonTheme.contract.backgroundColor.hover,
  color: SquareButtonTheme.contract.color.hover,
};

const activeStyles = {
  backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
  color: SquareButtonTheme.contract.color.active,
};

const baseSquareButtonStyles = style({
  border: '0',
  transition: transition(['background-color', 'color']),
  cursor: 'pointer',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: SquareButtonTheme.contract.color.default,

  selectors: {
    '&:enabled:hover:not(:active)': hoveringStyles,

    '&:enabled:active:hover': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
      color: SquareButtonTheme.contract.color.active,
    },

    '&:enabled:active': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
      color: SquareButtonTheme.contract.color.active,
    },
    '&:disabled': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.disabled,
      color: SquareButtonTheme.contract.color.disabled,
      cursor: 'not-allowed',
    },
  },
});

export const squareButtonSizeVariants = styleVariants({
  xlarge: {
    height: xLargeSize,
    width: xLargeSize,
    borderRadius: '10px',
    padding: '8px',
  },
  large: {
    height: largeSize,
    width: largeSize,
    borderRadius: '8px',
    padding: '6px',
  },
  medium: {
    height: mediumSize,
    width: mediumSize,
    borderRadius: '7px',
    padding: '4px',
  },
  small: {
    height: smallSize,
    width: smallSize,
    borderRadius: '6px',
    padding: '0',
  },
});

export const squareButtonStyles = recipe({
  base: baseSquareButtonStyles,
  variants: {
    size: squareButtonSizeVariants,
    isHovering: {
      true: {
        selectors: {
          '&:enabled': hoveringStyles,
        },
      },
    },
    isActive: {
      true: {
        selectors: {
          '&:enabled': activeStyles,
          '&:enabled:hover': activeStyles,
          '&:enabled:hover:not(:active)': {
            backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
            color: SquareButtonTheme.contract.color.active,
          },
        },
      },
    },
  },
});

export const loadingSpinnerStyles = style({
  // top: 1.5,
  position: 'relative',
});
