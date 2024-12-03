import { recipe } from '@vanilla-extract/recipes';

export const chatWindowStyle = recipe({
  base: {
    height: '100%',
    maxHeight: 'calc(800px - env(safe-area-inset-bottom))',
  },
  variants: {
    mobile: {
      true: {
        height: 'calc(100vh - env(safe-area-inset-bottom))',
        maxHeight: 'calc(100vh - env(safe-area-inset-bottom))',
      },
    },
  },
});
