import { keyframes, style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';

export const fadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const welcomeMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: FAMILY,
  padding: '48px 20px 44px 20px',
  textAlign: 'center',
  animation: `${fadeIn} 0.5s ease-in-out`,
});

export const avatarContainer = style({
  marginBottom: '16px',
});

export const welcomeMessageTitle = style({
  marginBottom: '4px',
  fontSize: '22px',
  fontWeight: 700,
  color: COLORS.NEUTRAL_DARK[900],
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const welcomeMessageDescription = style({
  margin: 0,
  fontSize: '14px',
  fontWeight: 400,
  color: COLORS.NEUTRAL_DARK[100],
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
