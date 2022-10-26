import Timestamp from '@/components/Timestamp';
import Tooltip from '@/components/Tooltip';
import { styled } from '@/styles';

import Message from '../Message';

export const Debug = styled('aside', {
  typo: { size: '12px', height: '17px' },
  color: '$darkGrey',
  marginTop: '$2',
});

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  alignItems: 'flex-end',

  [`& ${Message.Container}`]: {
    maxWidth: 282,
  },

  [`& > ${Tooltip.Container}`]: {
    marginTop: '$1',
  },
});

export const Row = styled('div', {
  display: 'flex',
  width: '100%',
  alignItems: 'center',

  [`& ${Timestamp.Container}`]: {
    flexGrow: 1,
    marginRight: 8,
    textAlign: 'end',
    opacity: '0%',
    trans: ['opacity'],
  },

  [`&:hover ${Timestamp.Container}`]: {
    opacity: '100%',
  },
});
