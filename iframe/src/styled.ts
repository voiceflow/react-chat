import { CSS, styled } from '@/styles';

const CHAT_WIDTH = 380;
const MAX_CHAT_HEIGHT = 800;

export const ButtonContainer = styled('div', {});

export const ChatContainer = styled('div', {
  width: CHAT_WIDTH,
  overflow: 'hidden',
  borderRadius: '$2',
  boxShadow: '0 2px 48px rgba(19,33,68,0.12), 0 0 0 1px $shadow4',

  height: '90%',
  maxHeight: MAX_CHAT_HEIGHT,
});

export const ChatIframe = styled('iframe', {
  width: '100%',
  height: '100%',
  border: 'none',
});

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

export const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  pointerEvents: 'none',
  zIndex: 10000,

  [`
    & > ${ButtonContainer},
    & > ${ChatContainer}
  `]: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },

  variants: {
    withChat: {
      true: {
        [`& > ${ChatContainer}`]: {
          ...animateInStyles,
        },
        [`& > ${ButtonContainer}`]: {
          ...animateOutStyles,
        },
      },
      false: {
        [`& > ${ChatContainer}`]: {
          ...animateOutStyles,
        },
        [`& > ${ButtonContainer}`]: {
          ...animateInStyles,
        },
      },
    },
  },
});
