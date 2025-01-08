import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration } from '@/styles/animations';
import { THEME } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

import { buttonStyles } from '../Button/styles.css';
import { fadeInSlideUp } from '../UserResponse/styles.css';

export const LAUNCHER_SIZE = 48;
export const LAUNCHER_WITH_LABEL_SIZE = 40;

export const launcherContainer = style({
  width: 'fit-content',
});

export const launcherStyles = recipe({
  base: [
    buttonStyles({ round: true }),
    {
      display: 'flex',
      height: LAUNCHER_SIZE,
      minWidth: '48px',
      backgroundColor: THEME.colors[500],
      position: 'relative', // Establish positioning context
      transition: 'all 0.15s ease-in-out',
      boxShadow:
        '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',

      animation: `${fadeInSlideUp} ${duration.fast} ease-out`,
      width: LAUNCHER_SIZE,
      padding: '8px',
      ':hover': {
        transform: 'scale(1.1)',
        backgroundColor: THEME.colors[600],
      },
      ':active': {
        transform: 'scale(0.8)',
        backgroundColor: THEME.colors[700],
      },

      '::before': {
        content: '""',
        top: '-4px',
        position: 'absolute',
        bottom: '-4px',
        left: '-4px',
        right: '-4px',
        borderRadius: 'inherit',
        backgroundColor: 'transparent',
        zIndex: -1,
      },
    },
  ],

  variants: {
    isOpen: {
      true: {
        filter: 'drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)',
        overflow: 'initial',
        height: '48px',
        width: '48px',
      },
    },

    isDisabled: {
      true: {
        backgroundColor: THEME.colors[300],

        ':hover': {
          transform: 'none',
          backgroundColor: THEME.colors[300],
        },
        ':active': {
          transform: 'none',
          backgroundColor: THEME.colors[300],
        },
      },
    },

    isLoading: {
      true: {},
    },
  },
});

export const loadingSpinnerStyles = style({
  color: 'white',
  height: '24px',
  width: '24px',
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
    withIcon: { false: {} },
  },
  compoundVariants: [
    {
      variants: {
        withIcon: false,
        isOpen: false,
      },
      style: {
        width: 0,
        height: 0,
      },
    },
  ],
});

export const launcherLabelStyles = recipe({
  base: {
    fontSize: '14px',
    fontWeight: 600,
    color: THEME.colors[50],
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

export const closeIconStyles = recipe({
  base: {
    color: THEME.colors[50],
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

export const launcherIconStyles = recipe({
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
    transition: transition(['width', 'opacity']),
    position: 'absolute',
    width: '32px',
    opacity: 0,
  },
  variants: {
    isOpen: {
      true: {},
      false: {},
    },

    isLoading: {
      true: {},
    },
  },

  compoundVariants: [
    {
      variants: {
        isOpen: true,
        isLoading: false,
      },
      style: {
        animation: `${twistInAnimation} 0.2s ease-in-out`,
        opacity: 1,
      },
    },
    {
      variants: {
        isOpen: false,
        isLoading: false,
      },
      style: {
        animation: `${twistOutAnimation} 0.2s ease-in-out`,
        opacity: 0,
        pointerEvents: 'none',
      },
    },
    {
      variants: {
        isLoading: true,
        isOpen: true,
      },
      style: {
        opacity: 0,
      },
    },
    {
      variants: {
        isLoading: true,
        isOpen: false,
      },
      style: {
        opacity: 0,
      },
    },
  ],
});

export const imageStyles = recipe({
  base: {
    transition: transition(['opacity', 'width']),
    height: '32px',
    width: '32px',
    minWidth: '32px',
    pointerEvents: 'none',
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
    isLoading: {
      true: {
        opacity: 0,
      },
    },
  },
});
