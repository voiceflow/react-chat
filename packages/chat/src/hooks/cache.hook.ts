import { useRef } from 'react';

export const useCachedValue = <T>(value: T): React.MutableRefObject<T> => {
  const ref = useRef<T>(value);

  ref.current = value;

  return ref;
};

export const useConst = <T>(value: T): T => {
  const ref = useRef<T>();

  if (ref.current === undefined) {
    ref.current = value;
  }

  return ref.current;
};

export const useCreateConst = <T>(creator: () => T): T => {
  const ref = useRef<T>();

  if (ref.current === undefined) {
    ref.current = creator();
  }

  return ref.current;
};
