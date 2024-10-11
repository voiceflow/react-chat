import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

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

export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      width: buttonSize.default.static,
      height: buttonSize.default.static,
      padding: 12,
      backgroundColor: PALETTE.colors[500],
      transition: transition(['transform'], { timingFunction: timingFunction.easeOut }),
      ':hover': {
        transform: 'scale(1.1)',
        backgroundColor: PALETTE.colors[600],
      },
      ':active': {
        transform: 'scale(0.8)',
        backgroundColor: PALETTE.colors[700],
      },
    },
  ],

  variants: {
    withLabel: {
      true: {
        width: 'auto',
        height: buttonSize.withLabel.static,
        padding: 18,
        ':hover': {},
        ':active': {},
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
  base: {
    color: COLORS.white,
    width: 32,
    height: 32,
  },
  variants: {
    withLabel: {
      true: {
        width: 24,
        height: 24,
      },
    },
  },
});
