import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const systemMessageContainer = recipe({
  base: {
    display: 'flex',
  },
});
