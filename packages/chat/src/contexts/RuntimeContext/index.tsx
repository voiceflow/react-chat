import React, { createContext, useMemo } from 'react';

import type { RuntimeState, Settings } from './useRuntimeState';
import { useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<RuntimeState['api']>({} as any);
export const RuntimeStateContext = createContext<RuntimeState['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {
  extend?: (runtime: RuntimeState['api']) => RuntimeState['api'];
}

export const RuntimeProvider = ({ children, extend, ...settings }: RuntimeProviderProps) => {
  const store = useRuntimeState(settings);

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => extend?.(store.api) ?? store.api, []);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={store.state}>{children}</RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
