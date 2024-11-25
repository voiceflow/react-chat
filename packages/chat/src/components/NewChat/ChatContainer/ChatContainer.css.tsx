import { recipe } from '@vanilla-extract/recipes';

export const chatWindowStyle = recipe({
  base: {
    height: '100%',
    maxHeight: '800px',
  },
  variants: {
    mobile: {
      true: {
        height: '100vh',
        maxHeight: '100vh',
      },
    },
  },
});
