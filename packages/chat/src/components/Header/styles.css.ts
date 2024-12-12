import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { THEME } from '@/styles/colors.css';
import { hideTextOverflow } from '@/styles/font';
import { SIZES } from '@/styles/sizes';
import { transition } from '@/styles/transitions';
import { chatIsClosed, chatIsOpen } from '@/views/ChatWidget/styles.css';

import { buttonReset } from '../Button/reset.css';
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

export const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
});

export const headerContainer = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: THEME.colors[500],
  padding: '12px 16px 12px 20px',
  height: parseInt(SIZES.sm, 10) + 24, // Add the top and bottom padding
  opacity: 0,
  selectors: {
    [`.${chatIsOpen} &`]: {
      animation: `${fadeIn} .4s ${timingFunction.gentle} forwards`,
      animationDelay: '.2s',
    },
    [`.${chatIsClosed} &`]: {
      animation: `${fadeOut} .3s ${timingFunction.gentle} forwards`,
    },
  },
});

export const headerInnerContainer = style({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  justifyContent: 'space-between',
  minWidth: 0,
});

export const headerTitle = recipe({
  base: {
    fontFamily: THEME.fontFamily,
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 700,
    lineHeight: '23px',
    margin: '0 12px',
    minWidth: 0,
    ...hideTextOverflow(),
  },

  variants: {
    hasAvatar: {
      false: {
        marginLeft: 0,
      },
    },
  },
});

export const headerActions = style({
  display: 'flex',
  gap: '6px',
  flexShrink: 0,
  minWidth: 0,
});

export const headerActionButton = recipe({
  base: [
    buttonReset,
    {
      justifyContent: 'center',
      alignItems: 'center',
      width: 32,
      height: 32,
      borderRadius: SIZES.radius.xs,
      padding: 4,
      color: '#ffffffcc',
      backgroundColor: 'transparent',
      transition: transition(['color', 'background-color']),
      ':hover': {
        color: COLORS.white,
        backgroundColor: '#ffffff29',
      },
      ':active': {
        color: COLORS.white,
        backgroundColor: '#ffffff52',
      },
    },
  ],
});
