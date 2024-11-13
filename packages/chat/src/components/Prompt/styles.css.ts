import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';

const PROMPT_OVERFLOW = 10;

export const promptContainer = recipe({
  base: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    transition: 'transform 320ms cubic-bezier(0.45, 1.29, 0.64, 1), box-shadow 300ms ease',
    transform: `translateY(calc(100% + ${PROMPT_OVERFLOW}px))`,
    padding: '12px',
    borderRadius: SIZES.radius.lg,
    backgroundColor: COLORS.white,
    boxShadow: '0 12px 48px 4px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  variants: {
    visible: {
      true: {
        zIndex: 3,
        transform: 'translateY(0)',
      },
      false: {
        boxShadow: 'none',
      },
    },
  },
});

export const chatOverlay = recipe({
  base: {
    display: 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.16)',
    opacity: 0,
    transition: transition(['opacity']),
  },
  variants: {
    visible: {
      true: {
        display: 'block',
        opacity: 1,
        zIndex: 2,
        pointerEvents: 'auto',
      },
    },
  },
});
