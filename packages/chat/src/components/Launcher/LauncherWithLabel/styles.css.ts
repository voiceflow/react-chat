import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { fadeInSlideUp } from '@/components/UserResponse/styles.css';
import { duration } from '@/styles/animations';
import { THEME } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

const LAUNCHER_WITH_LABEL_SIZE = 40;
const BEZIER = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const launcherStyles = recipe({
  base: {
    borderRadius: '9999px',
    transition: `all ${duration.mid} ${BEZIER}`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: THEME.colors[50],
    willChange: 'max-width, transform',
    height: LAUNCHER_WITH_LABEL_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: THEME.fontFamily,
    fontSize: '14px',
    lineHeight: '20px',
    animation: `${fadeInSlideUp} ${duration.fast} ease-out`,

    boxShadow:
      '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
    fontWeight: '600',
    overflowWrap: 'anywhere',
    backgroundColor: THEME.colors[500],
    maxWidth: '500px',
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
  variants: {
    isOpen: {
      true: {
        maxWidth: LAUNCHER_WITH_LABEL_SIZE,
        filter: 'drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)',
        gap: 0,
        padding: '8px',
      },
      false: {
        maxWidth: '500px',
        padding: '8px 16px 8px 12px',
      },
    },
    noImage: { true: {} },
  },
  compoundVariants: [
    {
      variants: {
        isOpen: false,
        noImage: true,
      },
      style: {
        paddingLeft: '10px',
      },
    },
  ],
});

export const launcherLabelStyles = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  padding: '3px 0 1px 0',
  transition: `all ${duration.mid} ${BEZIER}`,
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
    height: '32px',
    left: 0,
    opacity: 0,
  },
  variants: {
    isOpen: {
      true: {
        animation: `${twistInAnimation} 0.2s ease-in-out forwards`,
        animationDelay: '0.2s',
      },
      false: {
        animation: `${twistOutAnimation} 0.2s ease-in-out forwards`,
        pointerEvents: 'none',
      },
    },
  },
});

export const imageIconStyle = recipe({
  base: {
    height: '24px',
    width: '24px',
    position: 'absolute',
    borderRadius: 2,
    left: 0,
    pointerEvents: 'none',

    flexShrink: 0,
    transition: transition(['opacity']),
  },
  variants: {
    isOpen: {
      true: {
        opacity: 0,
        transitionDelay: '0.2s',
      },
      false: {
        opacity: 1,
      },
    },
  },
});

export const imageIconWrapper = recipe({
  base: {
    position: 'relative',
    transition: transition(['min-width', 'min-height']),
  },
  variants: {
    noImage: { true: {}, false: {} },
    isOpen: {
      true: {
        transitionDelay: '0.2s',
        minWidth: '32px',
        minHeight: '32px',
      },
      false: {
        minWidth: '24px',
        minHeight: '24px',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        noImage: true,
        isOpen: false,
      },
      style: {
        minWidth: '0 !important',
      },
    },
    {
      variants: {
        noImage: true,
        isOpen: true,
      },
      style: {
        minWidth: '32px',
      },
    },
  ],
});
