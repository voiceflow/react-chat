import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { CSS, styled } from '@/styles';

const CHAT_WIDTH = 380;
const MAX_CHAT_HEIGHT = 800;

const tag = tagFactory(ClassName.WIDGET);

export const ChatContainer = styled(tag('div', 'chat'), {
  width: CHAT_WIDTH,
  overflow: 'hidden',
  borderRadius: '$2',
  boxShadow: '0 2px 48px rgba(19,33,68,0.16), 0 0 0 1px $shadow4',

  height: '90%',
  maxHeight: MAX_CHAT_HEIGHT,

  '@mobile': {
    position: 'fixed',
    height: 'unset',
    maxHeight: 'unset',
    width: 'unset',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 0,
    boxShadow: 'none',
  },
});

export const LauncherContainer = styled(tag('div', 'launcher'), {});

const animateInStyles: CSS = {
  opacity: 1,
  pointerEvents: 'auto',
  transform: 'translateY(0%)',
  transition: 'transform 300ms cubic-bezier(0, 0.95, 0.1, 1), opacity 150ms linear',
};

const animateOutStyles: CSS = {
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(100%)',
  transition: 'transform 300ms cubic-bezier(0.85, 0, 0.6, 1), opacity 150ms linear',
};

export const Container = styled(tag('div'), {
  position: 'fixed',
  inset: 0,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  pointerEvents: 'none',
  zIndex: 10000,

  [`
    & > ${LauncherContainer},
    & > ${ChatContainer}
  `]: {
    position: 'absolute',
  },

  variants: {
    withChat: {
      true: {
        [`& > ${ChatContainer}`]: {
          ...animateInStyles,
        },
        [`& > ${LauncherContainer}`]: {
          ...animateOutStyles,
        },
      },
      false: {
        [`& > ${ChatContainer}`]: {
          ...animateOutStyles,
        },
        [`& > ${LauncherContainer}`]: {
          ...animateInStyles,
        },
      },
    },
    isHidden: {
      true: {
        display: 'none',
      },
    },
  },
});
