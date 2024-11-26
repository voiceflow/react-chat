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

export const voiceWidgetContainer = style({
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
  gap: '16px',
});

export const controlSection = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  width: '100%',
  boxSizing: 'border-box',
});

export const titleStyle = style({
  fontFamily: FAMILY,
  fontSize: '14px',
  fontWeight: 400,

  lineHeight: '20px',
  color: COLORS.NEUTRAL_DARK[900],
  textAlign: 'center',
});

export const buttonModifier = style({
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  width: '158px',
  position: 'relative',
  borderRadius: '8px',
  padding: '16px 4px',
  // gap: '6px',
});

export const circle = style({
  // height: '54px',
  // width: '54px',
  // minWidth: '54px',
  // minHeight: '54px',
  // borderRadius: '50%',
  // overflow: 'hidden',
  // background: 'linear-gradient(270deg, #ff6ec4, #7873f5, #4bc0c8)',
  // backgroundSize: '200% 200%',
  // animation: `${gradientAnimation} 4s ease infinite`,
  // animationDuration: '4s',
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
