import { style } from '@vanilla-extract/css';

export const buttonReset = style({
  border: 0,
  padding: 0,
  ':focus': {
    outline: 0,
  },
  ':hover': {
    cursor: 'pointer',
  },
});
