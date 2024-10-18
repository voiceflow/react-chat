import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const footerContainer = style({
  // display: 'flex',
  // flexDirection: 'column',
  position: 'relative',
  // height: '41px',
});

export const scrollableButtonContainer = style({
  display: 'flex',
  gap: '8px',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  // position: 'absolute',
  // top: '-46px',
  // transform: 'translateY(-50%)',
  paddingLeft: '20px',
});

export const messageBackground = recipe({
  base: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: '20px',
  },
  variants: {
    showPoweredBy: {
      true: {
        paddingBottom: '20px',
      },
    },
  },
});

export const messageContainer = recipe({
  base: {
    padding: '0 20px',
  },
  variants: {
    showPoweredBy: {
      true: {
        // paddingBottom: '20px',
      },
    },
  },
});

const fadeIn = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

export const scrollToButtomButtonContainer = style({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '-24px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  animation: `${fadeIn} .15s ease-in`, // Apply the fade-in animation
});

export const poweredByStyles = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'center',
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: '100px',
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});
