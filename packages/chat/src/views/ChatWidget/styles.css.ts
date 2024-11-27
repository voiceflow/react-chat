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

export const chatIsOpen = widgetContainer.classNames.variants.withChat.true;
export const chatIsClosed = widgetContainer.classNames.variants.withChat.false;

export const chatContainer = style({
  width: CHAT_WIDTH,
  maxHeight: MAX_CHAT_HEIGHT,
  pointerEvents: 'auto',

  selectors: {
    [`${widgetContainer.classNames.base} &`]: {
      position: 'absolute',
    },

    [`.${widgetContainer.classNames.variants.withChat.true} &`]: {
      opacity: 1,
      pointerEvents: 'auto',
      transform: 'translateY(0%)',
      transition: 'transform 300ms cubic-bezier(0, 0.95, 0.1, 1), opacity 150ms linear',
    },
    [`.${widgetContainer.classNames.variants.withChat.false} &`]: {
      opacity: 0,
      pointerEvents: 'none',
      transform: 'translateY(100%)',
      transition: 'transform 300ms cubic-bezier(0.85, 0, 0.6, 1), opacity 150ms linear',
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

export const fauxWidgetBackground = style({
  width: '100%',
  height: '100%',
  borderRadius: '16px',
  boxShadow:
    '0px 0px 0px 1px rgba(22, 26, 30, 0.06), 0px 1px 1px 0px rgba(22, 26, 30, 0.04), 0px 4px 8px -32px rgba(22, 26, 30, 0.04), 0px 10px 16px -32px rgba(22, 26, 30, 0.06), 0px 16px 20px -32px rgba(22, 26, 30, 0.08), 0px 24px 32px -32px rgba(22, 26, 30, 0.08), 0px 32px 40px -32px rgba(22, 26, 30, 0.10), 0px 40px 64px -32px rgba(22, 26, 30, 0.12)',
});
