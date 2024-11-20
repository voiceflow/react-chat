import { keyframes, style } from '@vanilla-extract/css';

import { SHADOWS } from '@/styles/box-shadows';
import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

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

const gradientAnimation = keyframes({
  '0%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
  '100%': { backgroundPosition: '0% 50%' },
});

export const circle = style({
  height: '54px',
  width: '54px',
  minWidth: '54px',
  minHeight: '54px',
  borderRadius: '50%',
  background: 'linear-gradient(270deg, #ff6ec4, #7873f5, #4bc0c8)',
  backgroundSize: '200% 200%',
  animation: `${gradientAnimation} 4s ease infinite`,
  animationDuration: '4s',
});

const CIRCLE_SIZE = '54px';

const COLOR_BG1 = 'rgb(108, 0, 162)';
const COLOR_BG2 = 'rgb(0, 17, 82)';
const COLOR1 = '18, 113, 255';
const COLOR2 = '221, 74, 255';
const COLOR3 = '100, 220, 255';
const COLOR4 = '200, 50, 50';
const COLOR5 = '180, 180, 50';
const BLENDING = 'hard-light';
const moveInCircle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '50%': { transform: 'rotate(180deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const moveVertical = keyframes({
  '0%': { transform: 'translateY(-25%)' },
  '50%': { transform: 'translateY(25%)' },
  '100%': { transform: 'translateY(-25%)' },
});

const moveHorizontal = keyframes({
  '0%': { transform: 'translateX(-25%)' },
  '50%': { transform: 'translateX(25%)' },
  '100%': { transform: 'translateX(-25%)' },
});

export const gradientBg = style({
  width: '54px',
  height: '54px',
  minHeight: '54px',
  minWidth: '54px',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '50%',
  background: `linear-gradient(40deg, ${COLOR_BG1}, ${COLOR_BG2})`,
});

export const gradientsContainer = style({
  filter: 'url(#goo) blur(1px)',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
});

export const g1 = style({
  position: 'absolute',
  background: `radial-gradient(circle at center, rgba(${COLOR1}, 0.8) 0, rgba(${COLOR1}, 0) 50%)`,
  mixBlendMode: BLENDING,
  width: '18px',
  height: '18px',
  top: 'calc(50% - 9px)',
  left: 'calc(50% - 9px)',
  animation: `${moveVertical} 20s ease infinite`,
});

export const g2 = style({
  position: 'absolute',
  background: `radial-gradient(circle at center, rgba(${COLOR2}, 0.8) 0, rgba(${COLOR2}, 0) 50%)`,
  mixBlendMode: BLENDING,
  width: '18px',
  height: '18px',
  animation: `${moveInCircle} 20s linear infinite`,
});

export const g3 = style({
  position: 'absolute',
  background: `radial-gradient(circle at center, rgba(${COLOR3}, 0.8) 0, rgba(${COLOR3}, 0) 50%)`,
  mixBlendMode: BLENDING,
  width: '18px',
  height: '18px',
  animation: `${moveInCircle} 30s linear infinite`,
});

export const g4 = style({
  position: 'absolute',
  background: `radial-gradient(circle at center, rgba(${COLOR4}, 0.8) 0, rgba(${COLOR4}, 0) 50%)`,
  mixBlendMode: BLENDING,
  width: '18px',
  height: '18px',
  animation: `${moveHorizontal} 25s ease infinite`,
});

export const g5 = style({
  position: 'absolute',
  background: `radial-gradient(circle at center, rgba(${COLOR5}, 0.8) 0, rgba(${COLOR5}, 0) 50%)`,
  mixBlendMode: BLENDING,
  width: '48px',
  height: '48px',
  animation: `${moveInCircle} 15s ease infinite`,
});

export const interactive = style({
  position: 'absolute',
  background: 'radial-gradient(circle at center, rgba(140, 100, 255, 0.8) 0, rgba(140, 100, 255, 0) 50%)',
  mixBlendMode: BLENDING,
  width: '54px',
  height: '54px',
  minHeight: '54px',
  minWidth: '54px',
  opacity: 1,
  left: 0,
  top: 0,
});

export const animatedLogoStyles = style({
  // width: '30px',
  // height: '22.5px',
});
