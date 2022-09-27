import { Bubble, Chat, Loader } from '@/components';
import { createTransition, CSS, styled } from '@/styles';

const CHAT_HEIGHT = 800;

const animationStyles: CSS = {
  opacity: 0,
  transform: `translateY(100%)`,
  transition: `${createTransition(['background-color'])}, ${createTransition(['transform', 'opacity'], 300)}`,
};

const postAnimatedStyles: CSS = {
  opacity: 1,
  transform: 'translateY(0%)',
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
    ...animationStyles,
    color: '$white',
  },

  [`& > ${Chat.Container}`]: {
    ...animationStyles,
    height: CHAT_HEIGHT,
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
          ...postAnimatedStyles,
        },
      },
      false: {
        [`& > ${Bubble.Container}`]: {
          ...postAnimatedStyles,
        },
      },
    },
  },
});
