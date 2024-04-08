/* eslint-disable import/no-relative-packages */
import { SocketEvent } from '../../shared/socket-event.enum';

export const connectLiveAgent = (conversation: any, agent: any) => ({
  type: SocketEvent.LIVE_AGENT_CONNECT,
  data: { conversation, agent },
});

export const disconnectLiveAgent = (conversation: any, agent: any) => ({
  type: SocketEvent.LIVE_AGENT_DISCONNECT,
  data: { conversation, agent },
});

export const sendLiveAgentMessage = (message: string) => ({
  type: SocketEvent.LIVE_AGENT_MESSAGE,
  data: { message },
});
