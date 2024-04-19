import { styled } from '@/styles';

import { ButtonVariant } from './constants';
import { Container, tag } from './styled';

export const TertiaryButton = styled(tag(Container, ButtonVariant.TERTIARY), {
  height: '$sm',
  border: '1px solid #191D220F',
  color: '$primary',
  backgroundColor: '#191D220F',
  boxShadow: '0 1px 2px $shadow2',
  trans: ['border-color'],

  '&:hover': {
    borderColor: '#191D221F',
  },
});
