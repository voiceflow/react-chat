import ActionMessage from '@/components/ActionMessage';
import { styled } from '@/styles';

export const Debug = styled('aside', {
  typo: { size: '$1', height: '17px' },
  color: '$darkGrey',
  marginTop: '$2',
});

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',

  [`& > ${ActionMessage.Container}`]: {
    marginTop: '$1',
  },
});
