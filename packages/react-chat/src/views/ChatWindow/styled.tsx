import Chat from '@/components/Chat';
import { useStitches } from '@/contexts';

export const ChatWindowContainer = (props) => {
  const { styled } = useStitches();
  const StyledComponent = styled('div', {
    height: '100%',

    [`& ${Chat.Container}`]: {
      height: '100%',
    },
  });
  return <StyledComponent {...props} />;
};
