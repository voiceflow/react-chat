import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

const CARET_HEIGHT = 6;
const OFFSET = 32;

export const debugContainerStyles = recipe({
  base: {
    position: 'relative',
    marginTop: `${CARET_HEIGHT}px`,
    border: '1px solid #dfdfdf',
    padding: '10px 14px',
    backgroundColor: 'red',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
  },
  variants: {
    orientation: {
      left: {
        selectors: {
          '& svg': {
            position: 'absolute',
            top: `-${CARET_HEIGHT}px`,
            left: `${OFFSET}px`,
          },
        },
      },
      right: {
        selectors: {
          '& svg': {
            position: 'absolute',
            top: `-${CARET_HEIGHT}px`,
            right: `${OFFSET}px`,
          },
        },
      },
    },
  },
  defaultVariants: {
    orientation: 'left',
  },
});
