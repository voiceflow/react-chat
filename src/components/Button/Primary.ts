import { styled } from '@/styles';

import { Container } from './styled';

export const PrimaryButton = styled(Container, {
  height: '$md',
  color: '$white',
  trans: ['background-color'],

  variants: {
    type: {
      info: {
        backgroundColor: '$primary',

        '&:hover': {
          backgroundColor: '$darkPrimary',
        },
      },

      warn: {
        backgroundColor: '$warn',

        '&:hover': {
          backgroundColor: '$darkWarn',
        },
      },

      subtle: {
        color: '$black',
        backgroundColor: 'inherit',
        trans: ['color'],

        '&:hover': {
          color: '#000',
        },
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
});
