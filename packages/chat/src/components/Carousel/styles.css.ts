import { style } from '@vanilla-extract/css';

import { CHAT_WIDTH } from '@/views/ChatWidget/styles.css';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';
import { CARD_WIDTH } from '../Card/styles.css';
import { DIALOG_PADDING } from '../NewChat/NewChat.css';
import { MESSAGE_PADDING } from '../SystemResponse/styles.css';

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

const MESSAGE_WIDTH = CHAT_WIDTH - DIALOG_PADDING - SMALL_AVATAR_SIZE - MESSAGE_PADDING;
const CAROUSEL_SPACER = MESSAGE_WIDTH - CARD_WIDTH;

export const lastCardSpacer = style({
  display: 'inline-flex',
  height: 1,
  width: CAROUSEL_SPACER,
  minWidth: CAROUSEL_SPACER,
});
