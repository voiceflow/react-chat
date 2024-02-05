import { useStitches } from '@/contexts';

import { Container, tag } from './styled';

export const ChatMessage = (props) => {
  const { styled } = useStitches();
  const Styled = styled(tag(Container, 'chat'), {
    variants: {
      from: {
        system: {
          color: '$black',
          backgroundColor: '$lightGrey',
        },

        user: {
          color: '$white',
          backgroundColor: '$primary',
          whiteSpace: 'break-spaces',
        },
      },
    },
    defaultVariants: {
      from: 'system',
    },
  });
  return <Styled {...props} />;
};
