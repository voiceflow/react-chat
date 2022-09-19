import { Bubble, Chat, Loader } from '@/components';
import { styled } from '@/styles';

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
    height: 800,
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
});

export const ChatEnded = styled(Chat.Timestamp, {
  padding: 0,
});
