import { recipe } from '@vanilla-extract/recipes';

import { SIZES } from '@/styles/sizes';

export const imageStyles = recipe({
  base: [],
  variants: {
    rounded: {
      true: {
        borderRadius: SIZES.radius.sm,
      },
    },
    mode: {
      overlay: {
        width: 248,
      },
      embedded: {
        width: '100%',
        maxWidth: 512,
      },
    },
  },
  defaultVariants: {
    rounded: true,
    mode: 'overlay',
  },
});
