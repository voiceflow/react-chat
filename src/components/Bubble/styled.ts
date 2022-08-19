import Icon from '@/components/Icon';
import { styled } from '@/styles';

export const Container = styled('button', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  borderRadius: '$round',
  padding: 0,
  backgroundColor: '$primary',

  '&:focus': {
    outline: 0,
  },

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    size: {
      small: {
        height: '$xs',
        width: '$xs',

        [`& ${Icon.Frame}`]: {
          width: '$xxs',
          height: '$xxs',
        },
      },

      large: {
        height: '$xl',
        width: '$xl',
        border: '1px solid $shadow4',
        boxShadow: '0 1px 6px $shadow6, 0 2px 24px $shadow8',

        [`& ${Icon.Frame}`]: {
          width: '$sm',
          height: '$sm',
        },
      },
    },
  },
  defaultVariants: {
    size: 'large',
  },
});
