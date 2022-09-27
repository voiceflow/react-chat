import { Bubble, Chat, Loader } from '@/components';
import { createTransition, styled } from '@/styles';

const CHAT_HEIGHT = 800;

export const Container = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',

  [`& ${Bubble.Container}`]: {
    color: '$white',
  },

  [`& ${Chat.Container}`]: {
    height: CHAT_HEIGHT,
    opacity: 0,
    transform: `translateY(${CHAT_HEIGHT}px)`,
    transition: createTransition(['transform', 'opacity'], 300),
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
        [`& ${Chat.Container}`]: {
          opacity: 1,
          transform: 'translateY(0px)',
        },
      },
    },
  },
});
