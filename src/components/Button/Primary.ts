import { styled } from '@/styles';

import { BaseButton } from './styled';

export const PrimaryButton = styled(BaseButton, {
  height: '$lg',
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
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
});
