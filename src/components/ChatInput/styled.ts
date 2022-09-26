import Bubble from '@/components/Bubble';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { inputFocusStyles, inputStyles } from '@/components/Input/styled';
import { styled } from '@/styles';

export const ButtonContainer = styled('label', {
  ...inputStyles,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '$md',
  cursor: 'text',

  [`& ${Bubble.Container}`]: {
    transform: 'scale(0)',
    trans: ['background-color', 'transform'],
  },

  variants: {
    withContent: {
      true: {
        [`& ${Bubble.Container}`]: {
          transform: 'scale(1)',
          cursor: 'initial',
        },
      },
    },
  },
});

export const Container = styled('div', {
  display: 'flex',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color', 'box-shadow'],

  [`& ${Input.Container}`]: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 7,
    boxShadow: 'none',
  },

  [`& ${ButtonContainer}`]: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  [`& ${Icon.Frame}`]: {
    color: '$white',
  },

  [`& ${Input.Container}:focus`]: {
    borderRightWidth: 0,
  },

  [`& ${Input.Container}:focus + ${ButtonContainer}`]: {
    ...inputFocusStyles,
    borderLeftWidth: 0,
  },
});
