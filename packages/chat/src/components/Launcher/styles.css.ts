import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration, timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { buttonStyles } from '../Button/styles.css';

const buttonSize = {
  default: {
    static: 56,
    hover: 62,
    active: 45,
  },
  withLabel: {
    static: 48,
    hover: 53,
    active: 43,
  },
};

// TODO: Check if i can define the size with a var or sprinkle
export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      width: buttonSize.default.static,
      height: buttonSize.default.static,
      backgroundColor: PALETTE.colors[500],
      transitionDuration: duration.default,
      transitionBehavior: timingFunction.easeOut,
      transitionProperty: 'width height',
      ':hover': {
        width: buttonSize.default.hover,
        height: buttonSize.default.hover,
        backgroundColor: PALETTE.colors[600],
      },
      ':active': {
        width: buttonSize.default.active,
        height: buttonSize.default.active,
        backgroundColor: PALETTE.colors[700],
      },
    },
  ],

  variants: {
    withLabel: {
      true: {
        width: 'auto',
        height: buttonSize.withLabel.static,
        ':hover': {
          width: 'auto',
          height: buttonSize.withLabel.hover,
        },
        ':active': {
          width: 'auto',
          height: buttonSize.withLabel.active,
        },
      },
    },
  },
});

export const launcherLabelStyles = style({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.white,
  lineHeight: '20px',
  marginRight: 8,
  paddingTop: 1,
});

export const launcherIconStyles = recipe({
  variants: {
    withLabel: {
      true: {
        width: 24,
        height: 24,
      },
    },
  },
});
