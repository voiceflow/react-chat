import { CSS, styled } from '@/styles';

const DefaultImageStyles: CSS = {
  width: 248,

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
};

export const DefaultImage = styled('img', DefaultImageStyles);

export const BackgroundImage = styled('div', {
  ...DefaultImageStyles,

  height: 200,
  backgroundColor: '$lightGrey',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});
