import React, { createContext, useCallback, useMemo } from 'react';

export interface AutoScrollContext {
  scrollToBottom: () => void;
}

export const AutoScrollContext = createContext<AutoScrollContext>({
  scrollToBottom: () => undefined,
});

export const { Consumer: AutoScrollConsumer } = AutoScrollContext;

export interface AutoScrollProviderProps<T> extends React.PropsWithChildren {
  target: React.RefObject<T>;
}

export const AutoScrollProvider = <T extends HTMLElement>({ target, children }: AutoScrollProviderProps<T>) => {
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      const el = target.current;
      if (!el) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const hiddenHeight = scrollHeight - clientHeight;
      if (hiddenHeight === scrollTop) return;

      el.scrollTo({ top: hiddenHeight });
    });
  }, []);

  const context = useMemo(() => ({ scrollToBottom }), [scrollToBottom]);

  return <AutoScrollContext.Provider value={context}>{children}</AutoScrollContext.Provider>;
};
