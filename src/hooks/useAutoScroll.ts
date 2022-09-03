import { useLayoutEffect, useRef } from 'react';

export const useAutoScroll = <T extends HTMLElement>(dependencies: any[] = []): React.RefObject<T> => {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const dialogEl = ref.current;
    if (!dialogEl) return;

    const { scrollTop, scrollHeight, clientHeight } = dialogEl;
    const hiddenHeight = scrollHeight - clientHeight;
    if (hiddenHeight === scrollTop) return;

    dialogEl.scrollTo({ top: hiddenHeight });
  }, dependencies);

  return ref;
};
