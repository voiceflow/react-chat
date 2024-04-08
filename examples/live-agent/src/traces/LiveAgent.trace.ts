import { TraceHandler } from '@voiceflow/react-chat';

import { LiveAgentPlatform } from '../../shared/live-agent-platform.enum';

export const LiveAgent = (handoff: (platform: LiveAgentPlatform) => void): TraceHandler => ({
  canHandle: ({ type }) => (type as string) === 'talk_to_agent',
  handle: ({ context }, trace) => {
    handoff(trace.payload.platform);
    return context;
  },
});
