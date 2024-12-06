import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { buttonStyles } from '@/components/Button/styles.css';
import { fadeInSlideUp } from '@/components/UserResponse/styles.css';
import { duration, timingFunction } from '@/styles/animations';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

const LAUNCHER_WITH_LABEL_SIZE = 40;
const BEZIER = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const launcherStyles = recipe({
  base: {
    borderRadius: '9999px',
    transition: `all 0.3s ${BEZIER}`,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: PALETTE.colors[50],
    willChange: 'max-width, transform',
    height: LAUNCHER_WITH_LABEL_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: FAMILY,
    fontSize: '14px',
    lineHeight: '20px',
    animation: `${fadeInSlideUp} ${duration.fast} ease-out`,

    boxShadow:
      '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
    fontWeight: '600',
    overflowWrap: 'anywhere',
    backgroundColor: PALETTE.colors[500],
    maxWidth: '500px',
    ':hover': {
      transform: 'scale(1.1)',
      backgroundColor: PALETTE.colors[600],
    },
    ':active': {
      transform: 'scale(0.8)',
      backgroundColor: PALETTE.colors[700],
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
  },
});

export const launcherLabelStyles = style({
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  padding: '3px 0 1px 0',
  transition: `all 0.3s ${BEZIER}`,
});

export const iconAndLabelWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7.1px',
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
    width: '24px',
    height: '24px',
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
    width: 32,
    height: 32,
    position: 'absolute',
    borderRadius: 2,
    left: 0,

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
    isImage: {
      true: {
        height: '24px',
        width: '24px',
      },
    },
  },
});

export const imageIconWrapper = style({
  position: 'relative',
  minWidth: '24px',
  minHeight: '24px',
});
