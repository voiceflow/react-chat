import React, { createContext, useMemo } from 'react';

import { RuntimeState, Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<RuntimeState['api']>({} as any);
export const RuntimeStateContext = createContext<RuntimeState['state'] & { shadowRoot: ShadowRoot; autostart: boolean }>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {
  shadowRoot: ShadowRoot;
}

export const RuntimeProvider = ({ children, assistant, config, shadowRoot }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => store.api, []);
  const state = useMemo(() => ({ ...store.state, shadowRoot, autostart: !!config.autostart }), [config, shadowRoot, store.state]);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={state}>{children}</RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
