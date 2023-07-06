import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

export const tag = tagFactory(ClassName.BUTTON);

export const Reset = styled('button', {
  border: 0,
  padding: 0,

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },
});

export const Container = styled(tag(Reset), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 14px',
  borderRadius: '$1',
  typo: { weight: '$2' },
  whiteSpace: 'nowrap',
  overflowWrap: 'anywhere',
});
