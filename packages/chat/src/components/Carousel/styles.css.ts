import { style } from '@vanilla-extract/css';

export const BUTTON_SIZE = 42;

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
  margin: '0 -20px',
  paddingLeft: '20px',
});

export const lastCardSpacer = style({
  display: 'inline-flex',
  height: 1,
  width: BUTTON_SIZE,
  minWidth: BUTTON_SIZE,
});
