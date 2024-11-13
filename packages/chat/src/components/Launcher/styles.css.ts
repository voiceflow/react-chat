import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { PALETTE } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';

export const LAUNCHER_SIZE = 48;

export const launchContainer = style({
  width: 'fit-content',
});

export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      display: 'flex',
      height: LAUNCHER_SIZE,
      minWidth: '48px',
      backgroundColor: PALETTE.colors[500],
      transition: transition([
        'color',
        'background-color',
        'transform',
        'width',
        'height',
        'max-width',
        'max-height',
        'min-width',
        'min-height',
        'padding',
      ]),
      boxShadow:
        '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
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
        padding: '8px 16px 8px 12px',
        height: '40px',
      },
      false: {
        height: '48px',
        width: '48px',
        padding: '8px',
      },
    },
    isOpen: {
      true: {
        height: '48px',
        width: '48px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        withLabel: true,
        isOpen: true,
      },
      style: {
        height: '40px',
        width: '40px',
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        padding: '8px',
      },
    },
  ],
});

export const iconContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '32px',
    height: '32px',
  },
  variants: {
    isOpen: {
      true: {},
      false: {
        width: '24px',
        height: '24px',
      },
    },
    withLabel: { true: {}, false: {} },
  },
  compoundVariants: [
    {
      variants: {
        withLabel: false,
        isOpen: false,
      },
      style: {
        width: '24px',
        height: '24px',
      },
    },
    {
      variants: {
        withLabel: true,
        isOpen: true,
      },
      style: {
        width: '24px',
        height: '24px',
      },
    },
  ],
});

export const launcherLabelStyles = recipe({
  base: {
    fontSize: '14px',
    fontWeight: 600,
    color: PALETTE.colors[50],
    lineHeight: '20px',
    marginLeft: '6px',
    paddingTop: 1,
    opacity: 1,
    width: 'fit-content',
    transition: 'opacity 50ms,  max-width 100ms, margin-left 300ms',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
        maxWidth: 0,
        width: 0,
        marginLeft: 0,
      },
      false: {
        opacity: 1,
        maxWidth: 'fit-content',
        width: 'fit-content',
      },
    },
  },
});

export const launcherIconStyles = recipe({
  base: {
    color: PALETTE.colors[50],
    width: 32,
    height: 32,
    borderRadius: 2,
    flexShrink: 0,
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

export const playIconStyles = recipe({
  base: {
    width: 32,
    height: 32,
    borderRadius: 2,
    position: 'absolute',
    flexShrink: 0,
    transition: transition(['opacity']),
    animationDelay: '0.1s',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
      },
      false: {
        opacity: 1,
      },
    },
    withLabel: {
      true: {},
      false: {},
    },
  },
});

export const twistInAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
  '100%': {
    opacity: 1,
    transform: 'rotate(0deg)',
  },
});

export const twistOutAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    opacity: 0,
    transform: 'rotate(-45deg)',
  },
});

export const closeChevron = recipe({
  base: {
    transform: 'rotate(0deg)',
    transition: transition(['width']),
    position: 'absolute',
    width: '32px',
    opacity: 0,
  },
  variants: {
    isOpen: {
      true: {
        animation: `${twistInAnimation} 0.2s ease-in-out`,
        opacity: 1,
      },
      false: {
        animation: `${twistOutAnimation} 0.2s ease-in-out`,
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    withLabel: {
      true: {
        position: 'relative',
      },
    },
  },
});

export const imageStyles = recipe({
  base: {
    transition: transition(['opacity', 'width']),
    width: '24px',
    height: '24px',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
        width: 0,
      },
      false: {
        opacity: 1,
      },
    },
    withLabel: {
      true: {
        // position: 'relative',
        height: '24px',
        width: '24px',
      },
      false: {
        height: '32px',
        width: '32px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        withLabel: true,
        isOpen: true,
      },
      style: {
        height: '0px',
        width: '0px',
      },
    },
  ],
});
