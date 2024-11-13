import { style } from '@vanilla-extract/css';

import { COLORS } from '@/styles/colors';
import { CHAT_WIDTH } from '@/views/ChatWidget/styles.css';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';
import { CARD_WIDTH } from '../Card/styles.css';
import { DIALOG_PADDING } from '../NewChat/NewChat.css';
import { MESSAGE_PADDING } from '../SystemResponse/styles.css';

export const BUTTON_SIZE = 42;
export const GUTTER_WIDTH = 10;

/**
 * The white space between the carousel and the edge of the Chat widget.
 * This is required because the last card takes up less space than the width
 * of the chat widget.
 */
const LEFT_SPACE = DIALOG_PADDING + SMALL_AVATAR_SIZE + MESSAGE_PADDING;

export const cardsContainer = style({
  position: 'relative',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginLeft: `-${LEFT_SPACE}px`,
  paddingLeft: `${LEFT_SPACE}px`,
  marginRight: `-${DIALOG_PADDING}px`,
  paddingRight: `${DIALOG_PADDING}px`,
});

export const cardsInnerContainer = style({
  display: 'flex',
  alignItems: 'start',
  gap: `${GUTTER_WIDTH}px`,
  backgroundColor: COLORS.white,
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
