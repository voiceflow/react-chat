export const chain =
  <Args extends any[]>(...fns: Array<((...args: Args) => void) | undefined>) =>
  (...args: Args) =>
    fns.forEach((fn) => fn?.(...args));
