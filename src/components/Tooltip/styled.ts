import Message from '@/components/Message';
import { styled } from '@/styles';

export const Button = styled('button', {
  height: '$sm',
  border: '1px solid $medGrey',
  borderTopColor: 'rgba(223,223,223,0.5)',
  borderRadius: '$1',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  typo: { weight: '$2' },
  color: '$primary',
  backgroundColor: '#fbfbfb',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },
});

export const Container = styled('div', {
  display: 'inline-flex',
  flexDirection: 'column',

  [`& ${Message.Debug}`]: {
    boxShadow: 'none',
  },

  variants: {
    withAction: {
      true: {
        boxShadow: '0 1px 2px $shadow2',

        [`& ${Message.Debug}`]: {
          borderBottom: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    },
  },
});
