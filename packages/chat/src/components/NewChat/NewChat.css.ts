import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { COLORS } from '@/styles/colors';

export const DIALOG_PADDING = 20;

export const chatContainer = recipe({
  base: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    backgroundColor: COLORS.white,
    position: 'relative',
    boxShadow:
      '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 40px 64px -32px rgba(22, 26, 30, 0.12)',
    overflow: 'hidden',
  },
  variants: {
    mobile: {
      true: {
        borderRadius: 0,
      },
    },
  },
});

globalStyle(`${chatContainer.classNames.base} *`, {
  boxSizing: 'border-box',
});

export const dialogContainer = style({
  position: 'relative',
  padding: `0 ${DIALOG_PADDING}px ${DIALOG_PADDING}px ${DIALOG_PADDING}px`,
  marginBottom: `-${DIALOG_PADDING}px`,
  overflow: 'hidden',
  scrollbarWidth: 'none',
  flexGrow: 1,
  overflowY: 'auto',
});

export const bottomSpacer = style({
  display: 'block',
  width: '100%',
  height: '24px',
});

export const chatEndedContainer = style({
  padding: '4px 0',
});
