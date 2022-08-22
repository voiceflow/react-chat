import { styled } from '@/styles';

import { BaseButton } from './styled';

export const PrimaryButton = styled(BaseButton, {
  height: '$md',
  color: '$white',

  variants: {
    type: {
      info: {
        backgroundColor: '$primary',
      },

      warn: {
        backgroundColor: '$warn',
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
