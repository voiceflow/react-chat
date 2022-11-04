import { useEffect, useRef } from 'react';

export const useDidUpdateEffect = (callback: () => void | VoidFunction, dependencies: unknown[] = []): void => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      return callback();
    }

    didMount.current = true;

    return undefined;
  }, dependencies);
};
