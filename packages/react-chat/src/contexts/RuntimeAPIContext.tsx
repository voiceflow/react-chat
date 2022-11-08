import React, { createContext, useMemo } from 'react';
import * as R from 'remeda';

import type { useRuntime } from '@/hooks';

export interface RuntimeAPIContext extends Pick<ReturnType<typeof useRuntime>, 'send' | 'setStatus'> {}

export const RuntimeAPIContext = createContext<RuntimeAPIContext>({
  send: R.noop,
  setStatus: R.noop,
});

export const RuntimeAPIProvider = ({ children, ...api }: RuntimeAPIContext & React.PropsWithChildren) => {
  const context = useMemo(() => api, []);

  return <RuntimeAPIContext.Provider value={context}>{children}</RuntimeAPIContext.Provider>;
};
