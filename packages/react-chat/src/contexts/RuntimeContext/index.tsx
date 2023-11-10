import React, { createContext } from 'react';

import { Settings, useRuntimeState } from './useRuntimeState';

export const RuntimeContext = createContext<ReturnType<typeof useRuntimeState>>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config }: RuntimeProviderProps) => {
  const api = useRuntimeState({ assistant, config });

  return <RuntimeContext.Provider value={api}>{children}</RuntimeContext.Provider>;
};
