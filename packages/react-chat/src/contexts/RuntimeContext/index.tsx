import { createStitches } from '@voiceflow/stitches-react';
import React, { createContext, useMemo } from 'react';

import { getDefaultTheme } from '@/styles';

import { StitchesContext } from '../../useStitches';
import { RuntimeState, Settings, useRuntimeState } from './useRuntimeState';

// split up API and state to prevent unnecessary re-renders
export const RuntimeStateAPIContext = createContext<RuntimeState['api']>({} as any);
export const RuntimeStateContext = createContext<RuntimeState['state']>({} as any);

interface RuntimeProviderProps extends React.PropsWithChildren, Settings {}

export const RuntimeProvider = ({ children, assistant, config }: RuntimeProviderProps) => {
  const store = useRuntimeState({ assistant, config });
  const { render } = config;

  const shadowRoot = useMemo(() => {
    if (render?.mode === 'bubble') {
      return document.getElementById('voiceflow-chat')!.attachShadow({ mode: 'open' });
    }
    return render!.target!.attachShadow({ mode: 'open' });
  }, [render, children]);

  // api is a static object, so we can use useMemo to prevent unnecessary re-renders
  const api = useMemo(() => store.api, []);

  return (
    <RuntimeStateAPIContext.Provider value={api}>
      <RuntimeStateContext.Provider value={store.state}>
        <StitchesContext.Provider value={{ value: createStitches(getDefaultTheme(shadowRoot)) }}>{children}</StitchesContext.Provider>
      </RuntimeStateContext.Provider>
    </RuntimeStateAPIContext.Provider>
  );
};
