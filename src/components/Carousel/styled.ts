import Card from '@/components/Card';
import { styled } from '@/styles';

export const Container = styled('div', {
  display: 'flex',
  whiteSpace: 'nowrap',

  [`& ${Card.Container}`]: {
    height: 'fit-content',
    flexShrink: 0,
    marginLeft: 12,

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
});
