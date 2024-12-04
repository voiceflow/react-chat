import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { duration, timingFunction } from '@/styles/animations';
import { COLORS } from '@/styles/colors';
import { transition } from '@/styles/transitions';
import { chatIsClosed, chatIsOpen } from '@/views/ChatWidget/styles.css';

import { fadeIn, fadeOut } from '../Header/styles.css';

export const DIALOG_PADDING = 20;

export const chatContainer = recipe({
  base: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    backgroundColor: COLORS.white,
    position: 'relative',
    boxShadow: '0 0 0 1px rgb(22 26 30 / 6%), rgba(22, 26, 30, 0.16) 0px 8px 80px',
    overflow: 'hidden',
  },
  variants: {
    mobile: {
      true: {
        borderRadius: 0,
      },
    },
  },
});

globalStyle(`${chatContainer.classNames.base} *`, {
  boxSizing: 'border-box',
});

export const dialogContainer = style({
  position: 'relative',
  padding: `0 ${DIALOG_PADDING}px ${DIALOG_PADDING}px ${DIALOG_PADDING}px`,
  marginBottom: `-${DIALOG_PADDING}px`,
  overflow: 'hidden',
  scrollbarWidth: 'none',
  flexGrow: 1,
  overflowY: 'auto',
  width: '100%',
});

export const bottomSpacer = recipe({
  base: {
    display: 'block',
    width: '100%',
    transition: transition(['height']),
  },
  variants: {
    hasEnded: {
      true: {
        height: '0px',
      },
      false: {
        height: '20px',
      },
    },
  },
});

export const chatEndedContainer = style({
  padding: '4px 0',
});

export const chatContentWrapper = style({
  opacity: 0,
  width: '100%',
  selectors: {
    [`.${chatIsOpen} &`]: {
      animation: `${fadeIn} ${duration.slow} ${timingFunction.gentle} forwards`,
      animationDelay: '.6s',
      pointerEvents: 'auto',
    },
    [`.${chatIsClosed} &`]: {
      animation: `${fadeOut} ${duration.slow} ease-out`,
      pointerEvents: 'none',
    },
  },
});
