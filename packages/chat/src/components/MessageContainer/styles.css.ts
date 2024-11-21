import { recipe } from '@vanilla-extract/recipes';

export const messageContainer = recipe({
  base: {
    position: 'relative',
    margin: '16px 0',
  },
  variants: {
    isLast: {
      true: {
        marginBottom: 0,
      },
    },
  },
});
