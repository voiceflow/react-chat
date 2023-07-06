import { styled } from '@/styles';

import { Container, tag } from './styled';

export const ChatMessage = styled(tag(Container, 'chat'), {
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
