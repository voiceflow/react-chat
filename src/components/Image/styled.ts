import { styled } from '@/styles';

export const BaseImage = styled('div', {
  height: 200,
  width: 248,
  backgroundColor: '$lightGrey',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  variants: {
    rounded: {
      true: {
        borderRadius: '$1',
      },
    },
  },
  defaultVariants: {
    rounded: true,
  },
});
