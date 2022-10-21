import { useContext, useLayoutEffect } from 'react';

import { AutoScrollContext } from '@/contexts';

export const useAutoScroll = (dependencies: any[] = []): void => {
  const { scrollToBottom } = useContext(AutoScrollContext);

  useLayoutEffect(() => {
    scrollToBottom();
  }, dependencies);
};
