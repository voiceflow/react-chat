import { keyframes, style } from '@vanilla-extract/css';

import { componentAnimations, timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
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
  fontFamily: THEME.fontFamily,
  padding: '48px 20px 28px 20px',
  textAlign: 'center',
});

export const avatarContainer = style({
  marginBottom: '16px',
  opacity: 0,
  selectors: {
    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      animation: `${fadeIn} ${componentAnimations.welcomeMessage.duration} ${timingFunction.gentle} forwards`,
      animationDelay: componentAnimations.welcomeMessage.delays.avatar,
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      animation: `${fadeOut} 0.4s ${timingFunction.gentle} forwards`,
    },
  },
});

export const welcomeMessageTitle = style({
  marginBottom: '2px',
  fontSize: '22px',
  fontWeight: 700,
  color: COLORS.NEUTRAL_DARK[900],
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  opacity: 0,
  selectors: {
    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      animation: `${fadeIn} ${componentAnimations.welcomeMessage.duration} ${timingFunction.gentle} forwards`,
      animationDelay: componentAnimations.welcomeMessage.delays.title,
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      animation: `${fadeOut} ${componentAnimations.welcomeMessage.duration} ${timingFunction.gentle} forwards`,
    },
  },
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
  opacity: 0,
  selectors: {
    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      animation: `${fadeIn} ${componentAnimations.welcomeMessage.duration} ${timingFunction.gentle} forwards`,
      animationDelay: componentAnimations.welcomeMessage.delays.description,
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      animation: `${fadeOut} 0.4s ${timingFunction.gentle} forwards`,
    },
  },
});
