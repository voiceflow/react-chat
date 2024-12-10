import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration, timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import { FAMILY, hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';
import { chatIsClosed, chatIsOpen } from '@/views/ChatWidget/styles.css';

const BUTTON_ROW_MARGIN = 10;

const fadeInAndSlideUp = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const fadeOutSlideDown = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(40px)',
  },
});

export const footerContainer = style({
  width: '100%',
  selectors: {
    [`.${chatIsOpen} &`]: {
      animation: `${fadeInAndSlideUp} .6s ${timingFunction.gentle} forwards`,
    },
    [`.${chatIsClosed} &`]: {
      animationDelay: duration.slow,
      animation: `${fadeOutSlideDown} 300ms ${timingFunction.gentle} forwards`,
    },
  },
});

export const buttonsContainer = style({
  display: 'flex',
  gap: '8px',
  flexWrap: 'nowrap',
  marginBottom: `${BUTTON_ROW_MARGIN}px`,
  overflow: 'hidden',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  padding: '0 20px',
});

export const inputContainer = style({
  padding: '0 20px',
});

export const messageContainer = recipe({
  base: {
    padding: '0 20px',
    position: 'relative',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.00) 29.49%, #FFF 29.5%, #F8F8F8 100%)',
  },
});

export const hasEnded = style({
  top: '-24px',
});

export const messageInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  backgroundColor: COLORS.white,
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
});

export const footerLinksContainer = style({
  color: COLORS.NEUTRAL_DARK[100],
  fontFamily: FAMILY,
  fontSize: '12px',
  lineHeight: '17px',
  width: '100%',
  minHeight: 20,
  padding: '10px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

export const poweredByLink = style({
  flexShrink: 0,
});

export const separator = style({
  height: '2px',
  width: '2px',
  borderRadius: SIZES.radius.round,
  backgroundColor: COLORS.NEUTRAL_LIGHT[500],
});

export const extraLinkStyles = recipe({
  base: {
    color: COLORS.NEUTRAL_DARK[100],
    fontFamily: FAMILY,
    fontSize: '12px',
    lineHeight: '17px',
    textDecorationColor: 'transparent',
    transition: transition(['color', 'text-decoration-color']),
    ...hideTextOverflow(),
  },
  variants: {
    isLink: {
      true: {
        selectors: {
          '&:hover': {
            textDecoration: 'underline',
            color: PALETTE.colors[500],
            textDecorationColor: PALETTE.colors[500],
          },
          '&:active': {
            color: PALETTE.colors[600],
            textDecorationColor: PALETTE.colors[600],
          },
        },
      },
      false: {},
    },
  },
});

export const voiceflowLink = style({
  color: COLORS.NEUTRAL_DARK[100],
  textDecoration: 'underline',
  textDecorationColor: 'transparent',
  transition: transition(['color', 'text-decoration-color']),
  selectors: {
    '&:hover': {
      color: PALETTE.colors[500],
      textDecorationColor: PALETTE.colors[500],
    },
    '&:active': {
      color: PALETTE.colors[600],
      textDecorationColor: 'transparent',
    },
  },
});
