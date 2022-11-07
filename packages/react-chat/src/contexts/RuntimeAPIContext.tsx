import React, { createContext, useMemo } from 'react';

import type { useRuntime } from '@/hooks';

export interface RuntimeAPIContext extends Pick<ReturnType<typeof useRuntime>, 'send' | 'setStatus'> {}

export const RuntimeAPIContext = createContext<RuntimeAPIContext | null>(null);

export const RuntimeAPIProvider = ({ children, ...api }: RuntimeAPIContext & React.PropsWithChildren) => {
  const context = useMemo(() => api, []);

  return <RuntimeAPIContext.Provider value={context}>{children}</RuntimeAPIContext.Provider>;
};
