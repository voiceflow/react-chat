import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const CHAT_WIDTH = 400;
const MAX_CHAT_HEIGHT = 800;

export const LAUNCHER_MARGIN = 16;

const WIDGET_Z_INDEX = 10000;

export const widgetContainer = recipe({
  base: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: WIDGET_Z_INDEX,
  },
  variants: {
    hidden: {
      true: {},
    },
    withChat: {
      true: {},
      false: {},
    },
  },
});

export const chatContainer = style({
  maxHeight: MAX_CHAT_HEIGHT,
  pointerEvents: 'auto',
  opacity: 0,
  width: 0,
  transition: 'opacity 300ms cubic-bezier(0.85, 0, 0.6, 1), width 300ms cubic-bezier(0.85, 0, 0.6, 1)',
  transformOrigin: 'right center', // Set transform origin to right
  selectors: {
    [`${widgetContainer.classNames.base} &`]: {
      position: 'absolute',
    },

    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      opacity: 1,
      pointerEvents: 'auto',
      width: CHAT_WIDTH, // Grow width without affecting inner content
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      opacity: 0,
      pointerEvents: 'none',
      width: 0,
    },
  },
});

export const launcherContainer = style({
  pointerEvents: 'auto',
  selectors: {
    [`${widgetContainer.classNames.base} &`]: {
      position: 'absolute',
    },
  },
});
