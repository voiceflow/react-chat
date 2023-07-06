import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { CSS, styled } from '@/styles';

const tag = tagFactory(ClassName.INPUT);

export const inputStyles: CSS = {
  height: '$md',
  boxSizing: 'border-box',
  border: '1px solid rgba(115,115,118,0.3)',
  borderRadius: '$1',
  backgroundColor: '$white',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color'],
};

export const inputFocusStyles: CSS = {
  border: '1px solid rgba(115,115,118,0.5)',
};

export const Container = styled(tag('input'), {
  ...inputStyles,
  padding: '0 $4',
  typo: {},
  color: '$black',

  '&:focus': {
    ...inputFocusStyles,
    outline: 0,
  },

  '&::placeholder': {
    color: '$darkGrey',
  },
});
