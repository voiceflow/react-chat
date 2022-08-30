import Tooltip from '@/components/Tooltip';
import { styled } from '@/styles';

export const Debug = styled('aside', {
  typo: { size: '12px', height: '17px' },
  color: '$darkGrey',
  marginTop: '$2',
});

export const Frame = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

export const Container = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',

  [`& > ${Tooltip.Container}`]: {
    marginTop: '$1',
  },
});
