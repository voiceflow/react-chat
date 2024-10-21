import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
});

export const carouselContainer = style({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const cardsContainer = style({
  // position: 'absolute',
});
