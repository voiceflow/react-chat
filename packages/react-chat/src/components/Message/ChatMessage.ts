import { styled } from '@/styles';

import { Container } from './styled';

export const ChatMessage = styled(Container, {
  variants: {
    from: {
      system: {
        color: '$black',
        backgroundColor: '$lightGrey',
      },

      user: {
        color: '$white',
        backgroundColor: '$primary',
      },
    },
  },
  defaultVariants: {
    from: 'system',
  },
});
