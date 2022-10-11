import Chat from '@/components/Chat';
import { styled } from '@/styles';

export const ChatWidgetContainer = styled('div', {
  height: '100%',

  [`& ${Chat.Container}`]: {
    height: '100%',
  },
});
