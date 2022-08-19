import Card from '@/components/Card';
import { styled } from '@/styles';

export const Container = styled('div', {
  whiteSpace: 'nowrap',

  [`& ${Card.Container}`]: {
    marginLeft: 14,

    '&:first-of-type': {
      marginLeft: 0,
    },
  },
});
