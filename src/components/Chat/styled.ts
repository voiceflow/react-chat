import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';
import { styled } from '@/styles';

export const Container = styled('section', {
  width: 380,
  borderRadius: '$2',
  overflow: 'hidden',
  backgroundColor: '$white',
  boxShadow: '0 2px 48px rgba(19,33,68,0.12), 0 0 0 1px $shadow4',
});

export const Dialog = styled('main', {
  padding: '0 $5',

  [`& ${SystemResponse.Container}`]: {
    marginBottom: '$1',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  [`& ${SystemResponse.Container} + ${UserResponse.Container}`]: {
    marginTop: '$5',
  },
  [`& ${UserResponse.Container} + ${SystemResponse.Container}`]: {
    marginTop: '$5',
  },
});
