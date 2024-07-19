import type { BaseRequest } from '@voiceflow/dtos';

import type { SessionOptions } from '@/types';

export enum BroadcastType {
  SAVE_SESSION = 'voiceflow:save_session',

  INTERACT = 'voiceflow:interact',

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

export interface Interact extends BroadcastMessage {
  type: BroadcastType.INTERACT;
  payload: {
    session: SessionOptions;
    action: BaseRequest;
  };
}

export interface Open extends BroadcastMessage {
  type: BroadcastType.OPEN;
}
export interface Close extends BroadcastMessage {
  type: BroadcastType.CLOSE;
}

export type AnyMessage = SaveSession | Interact | Open | Close;

// send messages so that other scripts can listen to them
// https://docs.voiceflow.com/docs/web-chat-api#events
export const broadcast = (message: AnyMessage) => {
  const encodedMessage = JSON.stringify(message);
  window.postMessage(encodedMessage);
};
