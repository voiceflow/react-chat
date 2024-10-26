import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const systemMessageContainer = recipe({
  base: {
    display: 'flex',
  },
});

export const actionsContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: 8,
  padding: '',
});

export const actionButton = style({
  height: 'unset',
  paddingTop: 7,
  paddingBottom: 7,
  marginTop: 8,
  marginRight: 8,
  whiteSpace: 'normal',
  textAlign: 'start',
});
