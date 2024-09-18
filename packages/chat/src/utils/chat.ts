export const createPlaceholderMethods = (
  createMessage: (method: string) => string
): Omit<VoiceflowChat, 'load' | 'destroy'> => {
  const noopWarn = (method: string) => (): any => console.warn(createMessage(method));

  return {
    open: noopWarn('open'),
    hide: noopWarn('hide'),
    show: noopWarn('show'),
    close: noopWarn('close'),
    interact: noopWarn('interact'),

    proactive: {
      clear: noopWarn('proactive.clear'),
      push: noopWarn('proactive.push'),
    },
  };
};
