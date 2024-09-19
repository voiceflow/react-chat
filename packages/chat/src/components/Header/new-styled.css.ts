import { style } from '@vanilla-extract/css';

export const textOverflowStyles = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

/* export const titleStyles = style([
  textOverflowStyles,
  {
    // typo: { size: 17, weight: '$2', height: '$2' },
    color: 'rgba(255,255,255,0.95)',
  },
]); */
