import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { buttonStyles } from '@/components/Button/styles.css';
import { timingFunction } from '@/styles/animations';
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
    transformOrigin: 'right',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    willChange: 'max-width, transform',
    height: LAUNCHER_WITH_LABEL_SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    fontFamily: FAMILY,
    fontSize: '14px',
    lineHeight: '20px',

    boxShadow:
      '0px 1px 0px 0px rgba(22, 26, 30, 0.02), 0px 0px 0px 1px rgba(22, 26, 30, 0.04), 0px 1px 5px -4px rgba(22, 26, 30, 0.08), 0px 4px 8px -6px rgba(22, 26, 30, 0.08), 0px 1px 3px 1px rgba(22, 26, 30, 0.01)',
    fontWeight: '600',
    overflowWrap: 'anywhere',
    backgroundColor: PALETTE.colors[500],
    maxWidth: '500px',
  },
  variants: {
    isOpen: {
      true: {
        maxWidth: LAUNCHER_WITH_LABEL_SIZE,
        filter: 'drop-shadow(rgba(0, 0, 0, 0.06) 0px 1px 6px) drop-shadow(rgba(0, 0, 0, 0.16) 0px 2px 32px)',
      },
      false: {},
    },
  },
});

const openAnimation = keyframes({
  '0%': { minWidth: '0' },
  '80%': { minWidth: '100%' },
  '100%': { minWidth: '100%' },
});

const closeAnimation = keyframes({
  '0%': { minWidth: '100%' },
  '20%': { minWidth: '100%' },
  '80%': { minWidth: '0', opacity: 1 },
  '100%': { minWidth: '0', opacity: 0 },
});

export const iconAndLabelWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '7.1px',
});

export const launcherLabelStyles = recipe({
  base: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    textAlign: 'left',
    padding: '3px 0 1px 0',
    display: 'block',
  },
  variants: {
    isOpen: {
      true: {
        animation: `${closeAnimation} 0.3s ${timingFunction.gentle} forwards`,
      },
      false: {
        animation: `${openAnimation} 0.3s ${timingFunction.gentle} forwards`,
        animationDelay: '0.2s',
      },
    },
  },
});

export const playIconStyles = recipe({
  base: {
    width: 32,
    height: 32,
    borderRadius: 2,
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
    left: '4px',
    top: '4px',
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
    withLabel: {
      true: {
        position: 'relative',
      },
    },
  },
});

export const imageStyles = style({
  width: '24px',
  height: '24px',
});
