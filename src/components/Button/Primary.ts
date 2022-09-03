import { styled } from '@/styles';

import { BaseButton } from './styled';

export const PrimaryButton = styled(BaseButton, {
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
