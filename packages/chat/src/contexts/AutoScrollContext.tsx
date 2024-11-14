import React, { createContext, useCallback, useMemo, useState } from 'react';

export interface AutoScrollContext {
  scrollToBottom: () => void;
}

export const AutoScrollContext = createContext<AutoScrollContext>({
  scrollToBottom: () => undefined,
});

export const IsAutoScrollingContext = createContext<boolean>(false);

export const { Consumer: AutoScrollConsumer } = AutoScrollContext;

export interface AutoScrollProviderProps<T> extends React.PropsWithChildren {
  target: React.RefObject<T>;
}

export const AutoScrollProvider = <T extends HTMLElement>({ target, children }: AutoScrollProviderProps<T>) => {
  const [autoScrolling, setAutoScrolling] = useState(false);

  const scrollToBottom = useCallback(() => {
    setAutoScrolling(true);
    setTimeout(() => {
      setAutoScrolling(false);
    }, 700);

    requestAnimationFrame(() => {
      const el = target.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const hiddenHeight = scrollHeight - clientHeight;
      if (hiddenHeight === scrollTop) return;

      el.scrollTo({ top: hiddenHeight, behavior: 'smooth' });
    });
  }, []);

  const context = useMemo(() => ({ scrollToBottom }), [scrollToBottom]);

  return (
    <AutoScrollContext.Provider value={context}>
      <IsAutoScrollingContext.Provider value={autoScrolling}>{children} </IsAutoScrollingContext.Provider>
    </AutoScrollContext.Provider>
  );
};
