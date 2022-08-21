import Bubble from '@/components/Bubble';
import Chat from '@/components/Chat';
import { styled } from '@/styles';

export const Container = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 10,

  [`& ${Bubble.Container}`]: {
    color: '$white',
  },

  [`& ${Chat.Container}`]: {
    height: 800,
  },

  [`& ${Chat.Dialog}`]: {
    flex: 1,
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
