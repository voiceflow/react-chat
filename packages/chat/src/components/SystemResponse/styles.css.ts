import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
  marginLeft: 12,
});

export const actionsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: 8,
  paddingLeft: 44,
});

export const actionButton = style({
  height: 'unset',
  padding: '7px 0',
  margin: '8px 8px 0 0',
  whiteSpace: 'normal',
  textAlign: 'start',
});

export const indicatorContainer = style({
  display: 'flex',
  alignItems: 'center',
});
