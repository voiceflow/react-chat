import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { CSS, styled } from '@/styles';

const tag = tagFactory(ClassName.TEXTAREA);

export const textareaStyles: CSS = {
  height: '$md',
  boxSizing: 'border-box',
  border: '1px solid rgba(115,115,118,0.3)',
  borderRight: 'none',
  borderRadius: '$1 0 0 $1',
  backgroundColor: '$white',
  boxShadow: '0 1px 12px $shadow2',
  trans: ['border-color'],
  resize: 'none',
};

export const textareaFocusStyles: CSS = {
  border: '1px solid rgba(115,115,118,0.5)',
  borderRight: 'none',
};

export const Container = styled(tag('textarea'), {
  ...textareaStyles,
  typo: {},
  // TODO use tokens
  padding: '9px $4 5px',
  width: 'calc(100% - 42px)',

  color: '$black',

  '&:focus': {
    ...textareaFocusStyles,
    outline: 'none',
  },

  '&::placeholder': {
    color: '$darkGrey',
  },
});
