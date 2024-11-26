import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SHADOWS } from '@/styles/box-shadows';
import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { transition } from '@/styles/transitions';

export const voiceWrapper = style({
  display: 'flex',
  // justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: 'fit-content',
});

export const voiceWidgetContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: SHADOWS.Z64_Light,
    overflow: 'hidden',
    width: 'fit-content',
    position: 'relative',
    zIndex: 1,
    userSelect: 'none',
  },
  variants: {
    type: {
      full: {},
      expanded: {
        flexDirection: 'column',
        padding: '32px 24px 24px 24px',
      },
      compact: {
        borderRadius: '100px',
        gap: '8px',
        padding: '8px',
      },
    },
  },
});

export const controlSection = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    width: '100%',
  },
  variants: {
    type: {
      full: {
        gap: '8px',
      },
      expanded: {
        alignItems: 'center',
        paddingTop: '12px',
        gap: '12px',
      },
      compact: {
        gap: '4px',
      },
    },
  },
});

export const titleStyle = style({
  fontFamily: FAMILY,
  fontSize: '14px',
  fontWeight: 400,

  lineHeight: '20px',
  color: COLORS.NEUTRAL_DARK[900],
  textAlign: 'center',
});

export const buttonModifier = recipe({
  base: {
    width: '158px',
    position: 'relative',
    borderRadius: '8px',
    padding: '16px 4px',
  },
  variants: {
    type: {
      full: {},
      expanded: {
        width: '182px',
      },
      compact: {
        borderRadius: '100px',
        width: '194px',
      },
    },
  },
});

export const circle = recipe({
  base: {
    borderRadius: '50%',
    height: '54px',
    width: '54px',
    minWidth: '54px',
    minHeight: '54px',
    background: 'rgba(0, 0, 0, 0.06)',
  },
  variants: {
    type: {
      full: {
        height: '54px',
        width: '54px',
        minWidth: '54px',
        minHeight: '54px',
        marginRight: '16px',
      },
      expanded: {
        height: '80px',
        width: '80px',
        minWidth: '80px',
        minHeight: '80px',
        marginBottom: '8px',
      },
      compact: {
        height: '32px',
        width: '32px',
        minWidth: '32px',
        minHeight: '32px',
      },
    },
  },
});

export const imageStyles = style({
  borderRadius: '50%',
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  transition: 'transform 1s',
});

export const buttonContent = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    top: '50%',
    left: '50%',

    transform: 'translate(-50%, -50%)',

    position: 'absolute',
    gap: '6px',
    lineHeight: '20px',
    transition: transition(['opacity']),
  },
  variants: {
    isVisible: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

export const buttonText = style({
  paddingTop: '2px',
});

export const linkSectionModifier = style({
  paddingBottom: 0,
});
