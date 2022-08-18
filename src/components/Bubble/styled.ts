import { styled } from '@/styles';

export const Frame = styled('div');

export const Container = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: '1px solid $shadow4',
  borderRadius: '$round',
  padding: 0,
  backgroundColor: '$primary',
  boxShadow: '0 1px 6px $shadow6, 0 2px 24px $shadow8',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    size: {
      small: {
        height: '$sm',
        width: '$sm',

        [`& ${Frame}`]: {
          width: '$xs',
          height: '$xs',
        },
      },

      large: {
        height: '$xl',
        width: '$xl',

        [`& ${Frame}`]: {
          width: '$md',
          height: '$md',
        },
      },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});
