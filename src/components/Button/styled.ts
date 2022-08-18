import { styled } from '@/styles';

export const BaseButton = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  padding: '0 14px',
  borderRadius: '$1',
  fontFamily: '$default',
  fontSize: '$2',
  fontWeight: '$2',
  lineHeight: '$1',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },
});
