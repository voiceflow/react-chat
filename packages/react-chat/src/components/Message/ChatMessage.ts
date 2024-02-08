import { styled } from '../../../setup';
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
        whiteSpace: 'break-spaces',
      },
    },

    mode: {
      embedded: {
        maxWidth: '100%',
      },
      bubble: {
        maxWidth: 248,
      },
    },
  },
  defaultVariants: {
    from: 'system',
    mode: 'bubble',
  },
  compoundVariants: [
    {
      from: 'system',
      mode: 'embedded',
      css: {
        maxWidth: '100%',
      },
    },
    {
      from: 'user',
      mode: 'embedded',
      css: {
        maxWidth: '80%',
      },
    },
  ],
});
