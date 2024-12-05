import { style } from '@vanilla-extract/css';

import { DIALOG_PADDING } from '../NewChat/NewChat.css';

export const BUTTON_SIZE = 42;
export const GUTTER_WIDTH = 10;

export const avatarStyle = style({
  alignSelf: 'flex-end',
});

export const cardsContainer = style({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginLeft: `-${DIALOG_PADDING}px`,
  paddingLeft: `${DIALOG_PADDING}px`,
  marginRight: `-${DIALOG_PADDING}px`,
  paddingRight: `${DIALOG_PADDING}px`,
});

export const cardsInnerContainer = style({
  display: 'flex',
  alignItems: 'start',
  gap: `${GUTTER_WIDTH}px`,
});

export const carouselContainer = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
});

export const lastCardSpacer = style({
  display: 'inline-flex',
  height: 1,
  // This is larger than the 'space' at the end, but is ok
  // since we need it to be good for popover mode as well.
  width: 600,
  minWidth: 600,
});
