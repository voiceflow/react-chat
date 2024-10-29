import { RuntimeProvider as BaseProvider } from '@voiceflow/chat';

// import { createNanoEvents } from 'nanoevents';
// import { useMemo } from 'react';
import { ASSISTANT, CONFIG } from './config';
// import { LiveAgent } from './traces/LiveAgent.trace';
// import type { LiveAgentEvents } from './use-live-agent.hook';
// import { useLiveAgent } from './use-live-agent.hook';

export const RuntimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const emitter = useMemo(() => createNanoEvents<LiveAgentEvents>(), []);
  // const liveAgent = useLiveAgent(emitter);

  return (
    <BaseProvider assistant={ASSISTANT} config={CONFIG}>
      {children}
    </BaseProvider>
  );
};
