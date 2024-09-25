import { useCallback, useMemo, useRef, useState } from 'react';

interface Storage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

const createUseStorageHook =
  <S extends Storage>(storage: S) =>
  <T>(name: string, defaultValue: T) =>
    useMemo(() => {
      const storageName = `voiceflow-chat-widget:${name}`;

      return {
        get: (): T => {
          try {
            const item = storage.getItem(storageName);

            return item === null ? defaultValue : JSON.parse(item);
          } catch {
            return defaultValue;
          }
        },

        set: (value: T) => storage.setItem(storageName, JSON.stringify(value)),

        clear: () => storage.removeItem(storageName),
      };
    }, []);

const createUseStorageStateHook = <S extends Storage>(storage: S) => {
  const useStorage = createUseStorageHook(storage);

  return <T>(name: string, initialState: T) => {
    const storage = useStorage(name, initialState);
    const [value, setValue] = useState(storage.get);
    const ref = useRef(value);

    const setStorageValue = useCallback<React.Dispatch<React.SetStateAction<T>>>((value) => {
      setValue((prevState) => {
        let nextValue: T;

        if (typeof value === 'function') {
          nextValue = (value as (prevState: T) => T)(prevState);
        } else {
          nextValue = value;
        }

        storage.set(nextValue);
        ref.current = nextValue;

        return nextValue;
      });
    }, []);

    return [value, setStorageValue, ref] as const;
  };
};

export const useLocalStorage = createUseStorageHook(globalThis.localStorage);
export const useSessionStorage = createUseStorageHook(globalThis.localStorage);

export const useLocalStorageState = createUseStorageStateHook(globalThis.localStorage);
export const useSessionStorageState = createUseStorageStateHook(globalThis.sessionStorage);
