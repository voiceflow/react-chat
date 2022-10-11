import { CSS, styled } from '@/styles';

export const ButtonContainer = styled('div');
export const ChatContainer = styled('div');
export const ChatIframe = styled('iframe');

const MAX_CHAT_HEIGHT = 800;

const animateInStyles: CSS = {
  opacity: 1,
  transform: 'translateY(0%)',
  transition: 'transform 300ms cubic-bezier(0, 0.95, 0.1, 1) 0s, opacity 150ms linear 0s',
};

const animateOutStyles: CSS = {
  opacity: 0,
  transform: `translateY(100%)`,
  transition: 'transform 300ms cubic-bezier(0.85, 0, 0.6, 1) 0s, opacity 150ms linear 0s',
};

export const Container = styled('div', {
  position: 'fixed',
  inset: 0,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',

  [`& > ${ChatContainer}`]: {
    height: '90%',
    maxHeight: MAX_CHAT_HEIGHT,
  },

  [`
      & > ${ButtonContainer},
      & > ${ChatContainer}
    `]: {
    position: 'absolute',
    right: 0,
    bottom: 0,
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
