import { recipe } from '@vanilla-extract/recipes';

export const messageContainer = recipe({
  base: {
    position: 'relative',

    width: '100%',
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
