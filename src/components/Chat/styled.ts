import Prompt from '@/components/Prompt';
import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';
import { styled } from '@/styles';

export const Container = styled('article', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: 380,
  borderRadius: '$2',
  overflow: 'hidden',
  backgroundColor: '$white',
  boxShadow: '0 2px 48px rgba(19,33,68,0.12), 0 0 0 1px $shadow4',

  [`& ${Prompt.Container}`]: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 1,
  },
});

export const Overlay = styled('div', {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 0,
  backgroundColor: '$shadow12',
});

export const Dialog = styled('main', {
  overflowY: 'scroll',
  overflowX: 'hidden',

  [`
    & > ${UserResponse.Container},
    & > ${SystemResponse.Container}
  `]: {
    padding: '0 $5',
  },

  [`& > ${SystemResponse.Actions}`]: {
    padding: '0 $5 0 54px',
  },

  [`& ${SystemResponse.Container}`]: {
    marginBottom: '$1',

    '&:last-of-type': {
      marginBottom: 0,
    },
  },

  [`& ${UserResponse.Container} + ${UserResponse.Container}`]: {
    marginTop: '$1',
  },

  [`
    & ${SystemResponse.Container} + ${UserResponse.Container},
    & ${UserResponse.Container} + ${SystemResponse.Container}
  `]: {
    marginTop: '$5',
  },
});
