import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { CSS, styled } from '@/styles';

const tag = tagFactory(ClassName.TEXTAREA);

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

export const Container = styled(tag('textarea'), {
  ...inputStyles,
  typo: {},
  // TODO use tokens
  padding: '6px $4',
  width: 'calc(100% - 42px)',
  color: '$black',

  '&:focus': {
    ...inputFocusStyles,
    outline: 'none',
  },

  '&::placeholder': {
    color: '$darkGrey',
  },
});
