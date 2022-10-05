import { styled } from '@/styles';

export const AvatarContainer = styled('div', {
  flexShrink: 0,
  borderRadius: '$round',
  backgroundColor: '$lightGrey',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  variants: {
    size: {
      small: {
        height: 26,
        width: 26,
      },

      large: {
        height: '$xxl',
        width: '$xxl',
        boxSizing: 'border-box',
        border: '1px solid $shadow2',
        boxShadow: '0 4px 16px $shadow4',
      },
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
