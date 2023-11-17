import React, { createContext, useMemo } from 'react';

import { Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<ReturnType<typeof useRuntimeState>['api']>({} as any);
export const RuntimeStateContext = createContext<ReturnType<typeof useRuntimeState>['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => store.api, []);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={store.state}>{children}</RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
