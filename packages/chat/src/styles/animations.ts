export const duration = {
  slow: '0.5s',
  default: '0.15s',
  fast: '0.08s',
  fastest: '0.05s',
};

export const timingFunction = {
  default: 'ease',
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  linear: 'linear',
  gentle: 'cubic-bezier(0.25, 1, 0.5, 1)',
};

export const delay = {
  initial: 0.04,
  increment: 0.03,
};

export const componentAnimations = {
  widgetAppearance: {
    transform: '0.3s',
    opacity: duration.default,
  },
  endChat: {
    transform: '0.25s',
    opacity: duration.fast,
    boxShadow: duration.slow,
  },
  welcomeMessage: {
    duration: '0.6s',
    delays: {
      avatar: '0.25s',
      title: '0.35s',
      description: '0.45s',
    },
  },
};
