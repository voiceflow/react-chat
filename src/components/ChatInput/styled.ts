import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { inputFocusStyles, inputStyles } from '@/components/Input/styled';
import { styled } from '@/styles';

export const ButtonContainer = styled('span', {
  ...inputStyles,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$md',
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

  [`& ${Icon.Frame}`]: {
    color: '$white',
  },

  [`& ${Input.Container}:focus + ${ButtonContainer}`]: {
    ...inputFocusStyles,
    borderLeftWidth: 0,
  },
});
