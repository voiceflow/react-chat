import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const chatWindow = recipe({
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
