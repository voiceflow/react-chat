import { Bubble, Chat, Loader } from '@/components';
import { CSS, styled } from '@/styles';

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
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',

  [`& > ${Bubble.Container}`]: {
    color: '$white',
  },

  [`& > ${Chat.Container}`]: {
    height: '90%',
    maxHeight: MAX_CHAT_HEIGHT,
  },

  [`& ${Chat.Dialog}`]: {
    flex: 1,
  },

  [`& ${Loader}`]: {
    margin: 'auto',
  },

  [`
    & > ${Bubble.Container},
    & > ${Chat.Container}
  `]: {
    position: 'absolute',
    right: '$6',
    bottom: '$6',
  },

  variants: {
    withChat: {
      true: {
        [`& > ${Chat.Container}`]: {
          ...animateInStyles,
        },
        [`& > ${Bubble.Container}`]: {
          ...animateOutStyles,
        },
      },
      false: {
        [`& > ${Chat.Container}`]: {
          ...animateOutStyles,
        },
        [`& > ${Bubble.Container}`]: {
          ...animateInStyles,
        },
      },
    },
  },
});
