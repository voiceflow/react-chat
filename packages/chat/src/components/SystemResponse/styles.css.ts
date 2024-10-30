import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { SMALL_AVATAR_SIZE } from '../Avatar/styles.css';

export const MESSAGE_PADDING = 12;

export const hide = style({
  visibility: 'hidden',
});

export const systemMessageContainer = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  variants: {
    first: {
      true: {
        marginTop: 12,
      },
    },
  },
});

export const responseAvatar = style({
  marginBottom: 4,
});

export const messageContainer = style({
  width: `calc(100% - ${MESSAGE_PADDING + SMALL_AVATAR_SIZE}px)`,
  marginLeft: MESSAGE_PADDING,
});

export const actionsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  margin: '16px 0 8px 0',
  paddingLeft: 44,
});

export const indicatorContainer = style({
  display: 'flex',
  alignItems: 'center',
});
