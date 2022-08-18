import { styled } from '@/styles';

import Input from '../Input';
import { inputFocusStyles, inputStyles } from '../Input/styled';

export const ButtonContainer = styled('span', {
  ...inputStyles,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$lg',
});

export const Container = styled('div', {
  display: 'flex',

  [`& ${Input.Container}`]: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 7,
  },

  [`& ${ButtonContainer}`]: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  [`& ${Input.Container}:focus + ${ButtonContainer}`]: {
    ...inputFocusStyles,
    borderLeftWidth: 0,
  },
});
