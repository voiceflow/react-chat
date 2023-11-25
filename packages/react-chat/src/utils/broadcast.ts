import { SessionOptions } from '@/common';

export enum BroadcastType {
  SAVE_SESSION = 'voiceflow:save_session',

  OPEN = 'voiceflow:open',
  CLOSE = 'voiceflow:close',
}

export interface BroadcastMessage {
  type: BroadcastType;
  payload?: unknown;
}

export interface SaveSession extends BroadcastMessage {
  type: BroadcastType.SAVE_SESSION;
  payload: SessionOptions;
}

export interface Open extends BroadcastMessage {
  type: BroadcastType.OPEN;
}
export interface Close extends BroadcastMessage {
  type: BroadcastType.CLOSE;
}

export type AnyMessage = SaveSession | Open | Close;

// send messages so that other scripts can listen to them
// https://developer.voiceflow.com/docs/chat-widget#events
export const broadcast = (message: AnyMessage) => {
  const encodedMessage = JSON.stringify(message);
  window.postMessage(encodedMessage);
};
