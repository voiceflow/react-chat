import { styled } from '@/styles';

import { BaseButton } from './styled';

export const SecondaryButton = styled(BaseButton, {
  height: '$md',
  border: '1px solid rgba(61,130,226,0.45)',
  color: '$primary',
  backgroundColor: '$white',
  boxShadow: '0 1px 2px $shadow2',

  '&:hover': {
    borderColor: '$primary',
  },
});
