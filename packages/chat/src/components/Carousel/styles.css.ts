import { style } from '@vanilla-extract/css';

export const cardsContainer = style({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const cardsInnerContainer = style({
  display: 'flex',
  alignItems: 'start',
});

export const cardStyle = style({
  margin: '0 5px',
});

export const carouselContainer = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  display: 'flex',
});
