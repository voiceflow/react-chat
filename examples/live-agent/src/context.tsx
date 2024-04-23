import { RuntimeProvider as BaseProvider } from '@voiceflow/react-chat';
import { createNanoEvents } from 'nanoevents';
import { useMemo } from 'react';

import { ASSISTANT, CONFIG } from './config';
import { LiveAgent } from './traces/LiveAgent.trace';
import type { LiveAgentEvents } from './use-live-agent.hook';
import { useLiveAgent } from './use-live-agent.hook';

export const RuntimeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const emitter = useMemo(() => createNanoEvents<LiveAgentEvents>(), []);
  const liveAgent = useLiveAgent(emitter);

  return (
    <BaseProvider
      assistant={ASSISTANT}
      config={CONFIG}
      traceHandlers={[LiveAgent((platform) => emitter.emit('live_agent', platform))]}
      extend={liveAgent.extend}
    >
      {children}
    </BaseProvider>
  );
};
