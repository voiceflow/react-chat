// import { createStitches } from '@voiceflow/stitches-react';
import React, { createContext, useMemo } from 'react';

// import { getDefaultTheme } from '@/styles';
// import { StitchesContext } from '../../useStitches';
import { RuntimeState, Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<RuntimeState['api']>({} as any);
export const RuntimeStateContext = createContext<RuntimeState['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config, shadowRoot }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });
  // const { render } = config;

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => store.api, []);

  // const newLocal = createStitches(getDefaultTheme(shadowRoot));

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={store.state}>
        {/* <StitchesContext.Provider value={{ value: newLocal }}> */}
        {children}
        {/* </StitchesContext.Provider> */}
      </RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
