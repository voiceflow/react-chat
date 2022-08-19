import { styled } from '@/styles';

export const BaseButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  padding: '0 14px',
  borderRadius: '$1',
  typo: { weight: '$2' },
  whiteSpace: 'nowrap',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },
});
