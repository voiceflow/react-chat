import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SHADOWS } from '@/styles/box-shadows';
import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { transition } from '@/styles/transitions';

export const voiceWrapper = style({
  display: 'flex',
  // justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: 'fit-content',
});

const loadingVariant = styleVariants({
  true: {},
});

export const voiceWidgetContainer = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 20px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: SHADOWS.Z32_Light,
    overflow: 'hidden',
    width: 'fit-content',
    position: 'relative',
    zIndex: 1,
    userSelect: 'none',
  },
  variants: {
    type: {
      full: {},
      expand: {
        boxShadow: SHADOWS.Z64_Light,
        flexDirection: 'column',
        padding: '32px 24px 24px 24px',
      },
      compact: {
        borderRadius: '100px',
        boxShadow: SHADOWS.Z16_Light,
        gap: '8px',
        padding: '8px',
      },
    },

    isLoading: loadingVariant,
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
        gap: '6px',
      },
      expand: {
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
  fontFamily: THEME.fontFamily,
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

    selectors: {
      [`${loadingVariant.true} &`]: {
        cursor: 'default',
        backgroundColor: THEME.colors[300],
      },
      [`${loadingVariant.true} &:active`]: {
        backgroundColor: THEME.colors[300],
      },
      [`${loadingVariant.true} &:hover`]: {
        backgroundColor: THEME.colors[300],
      },
    },
  },
  variants: {
    type: {
      full: {},
      expand: {
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
        height: '58px',
        width: '58px',
        minWidth: '58px',
        minHeight: '58px',
        marginRight: '16px',
      },
      expand: {
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
  transition: 'transform .5s',
});

export const buttonContent = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    top: '50%',
    left: '50%',
    fontFamily: THEME.fontFamily,

    transform: 'translate(-50%, -50%)',

    position: 'absolute',
    gap: '6px',
    lineHeight: '20px',
    transition: transition(['opacity']),

    selectors: {
      [`${loadingVariant.true} &`]: {
        opacity: 0,
      },
    },
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
  fontFamily: THEME.fontFamily,
});

export const linkSectionModifier = style({
  paddingBottom: '0 !important',
});

export const loaderStyles = style({
  color: 'white',
  height: '20px',
  width: '20px',
});

export const containerLoaderStyles = style({
  position: 'absolute',
  top: '50%',
  left: '50%',

  width: '20px',
  height: '20px',

  transform: 'translate(-50%, -50%)',
  transition: transition(['opacity']),

  opacity: 0,

  selectors: {
    [`${loadingVariant.true} &`]: {
      opacity: 1,
    },
  },
});
