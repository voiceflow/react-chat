import { keyframes, style } from '@vanilla-extract/css';

import { duration } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { FAMILY } from '@/styles/font';
import { widgetContainer } from '@/views/ChatWidget/styles.css';

export const fadeIn = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const fadeOut = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '100%': {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
});

export const welcomeMessageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: FAMILY,
  padding: '48px 20px 28px 20px',
  textAlign: 'center',
  opacity: 0,
  selectors: {
    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      animation: `${fadeIn} ${duration.fast} ease-in forwards`,
      animationDelay: duration.slow,
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      animation: `${fadeOut} ${duration.fast} ease-out forwards`,
    },
  },
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
