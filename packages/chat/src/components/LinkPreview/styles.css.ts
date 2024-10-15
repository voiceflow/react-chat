import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const linkPreviewContainer = recipe({
  base: [
    {
      borderRadius: '10px',
    },
  ],

  variants: {
    inline: {
      true: {
        backgroundColor: 'something-else',
      },
    },
  },
});

export const linkPreviewImage = style({});
export const linkPreviewDetails = style({});
export const linkPreviewTitle = style({});
export const linkPreviewUrl = style({});
