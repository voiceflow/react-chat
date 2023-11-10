import React, { createContext, useMemo } from 'react';

import { Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<ReturnType<typeof useRuntimeState>['api']>({} as any);
export const RuntimeStateContext = createContext<ReturnType<typeof useRuntimeState>['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });

  const api = useMemo(() => store.api, []);
  const state = useMemo(() => store.state, []);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={state}>{children}</RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
