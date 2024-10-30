import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

const CARET_HEIGHT = 6;
const OFFSET = 32;

export const debugContainerStyles = style({
  position: 'relative',
  marginTop: CARET_HEIGHT,
  border: '1px solid #dfdfdf',
  padding: '10px 14px',
  backgroundColor: COLORS.white,
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
});

export const caretStyles = recipe({
  base: {
    position: 'absolute',
    top: -CARET_HEIGHT,
  },
  variants: {
    orientation: {
      left: {
        left: OFFSET,
        right: 'unset',
      },
      right: {
        right: OFFSET,
        left: 'unset',
      },
    },
  },
  defaultVariants: {
    orientation: 'left',
  },
});
