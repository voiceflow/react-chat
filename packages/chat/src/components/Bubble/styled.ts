import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { styled } from '@/styles';

const tag = tagFactory(ClassName.BUBBLE);

export const Container = styled(tag(Button.Reset), {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '$round',
  backgroundColor: '$primary',
  trans: ['background-color', 'box-shadow'],

  '&:hover': {
    backgroundColor: '$darkPrimary',
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
