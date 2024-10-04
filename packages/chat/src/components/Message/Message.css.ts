import { globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { FAMILY } from '@/old-styles/font';

export const messageContainer = recipe({
  base: {
    backgroundColor: '#F1F2F2',
    color: '#1A1E23',
    padding: '11px 16px 10px',
    fontFamily: FAMILY,
    fontSize: '14px',
    borderRadius: '10px',
  },
  variants: {
    isCodeBlock: {
      true: {
        padding: 0,
      },
    },
  },
});

globalStyle(`${messageContainer} *`, {
  marginTop: 0,
  marginBottom: 16,
});

globalStyle(`${messageContainer} *:last-child`, {
  marginBottom: 0,
});
