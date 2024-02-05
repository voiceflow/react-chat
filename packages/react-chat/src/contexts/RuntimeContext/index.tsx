import { createStitches } from '@voiceflow/stitches-react';
import React, { createContext, useMemo } from 'react';

import { getDefaultTheme } from '@/styles';

import { StitchesContext } from '../../useStitches';
import { RuntimeState, Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<RuntimeState['api']>({} as any);
export const RuntimeStateContext = createContext<RuntimeState['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config, shadowRoot }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });
  const { render } = config;
  console.log(
    'In runtime provider',
    shadowRoot,
    store.api,
    store.state,
    store.state.session.turns.length,
    store.state.session.startTime,
    store.state.session.turns
  );

  const _shadowRoot = useMemo(() => {
    console.log('shadowRoot in memo', shadowRoot);

    return shadowRoot;
  }, [shadowRoot]);

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => store.api, []);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={store.state}>
        <StitchesContext.Provider value={{ value: createStitches(getDefaultTheme(_shadowRoot)) }}>{children}</StitchesContext.Provider>
      </RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
