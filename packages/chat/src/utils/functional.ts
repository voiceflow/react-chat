export const chain =
  <Args extends any[]>(...fns: Array<((...args: Args) => void) | undefined>) =>
  (...args: Args) =>
    fns.forEach((fn) => fn?.(...args));

// eslint-disable-next-line no-empty-function
export const noop = () => {};
