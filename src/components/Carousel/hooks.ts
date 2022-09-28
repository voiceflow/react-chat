import { RefObject } from 'react';

export const useRefHandler =
  <T extends any>(ref: RefObject<T>, callback: (value: T) => void) =>
  () => {
    const value = ref.current;
    if (!value) return;

    callback(value);
  };
