import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import { Assistant, ChatConfig, SessionOptions } from './types';
import { isObject } from './utils';

export enum Type {
  FETCH_ASSISTANT = 'voiceflow:fetch_assistant',
  FETCHED_ASSISTANT = 'voiceflow:fetched_assistant',

  SESSION = 'voiceflow:session',

  SAVE_SESSION = 'voiceflow:save_session',

  OPEN = 'voiceflow:open',
  CLOSE = 'voiceflow:close',
  INTERACT = 'voiceflow:interact',
}

export interface Message {
  type: Type;
  payload?: unknown;
}

export interface FetchAssistant extends Message {
  type: Type.FETCH_ASSISTANT;
  payload: ChatConfig;
}

export interface FetchedAssistant extends Message {
  type: Type.FETCHED_ASSISTANT;
  payload: Assistant;
}

export interface Session extends Message {
  type: Type.SESSION;
  payload: ChatConfig & { assistant: Assistant; session: SessionOptions };
}

export interface SaveSession extends Message {
  type: Type.SAVE_SESSION;
  payload: SessionOptions;
}

export interface Open extends Message {
  type: Type.OPEN;
}
export interface Close extends Message {
  type: Type.CLOSE;
}

export interface Interact extends Message {
  type: Type.INTERACT;
  payload: RuntimeAction;
}

export type AnyMessage = FetchAssistant | FetchedAssistant | Session | SaveSession | Open | Close | Interact;

export type MessageTypeMap<T extends AnyMessage = AnyMessage> = { [K in T['type']]: T extends { type: K } ? T : never };

export const isPostMessage = (message: unknown): message is Message => {
  return isObject(message) && typeof message.type === 'string' && Object.values<string>(Type).includes(message.type);
};

export const isClosePostMessage = (message: unknown): message is Close => {
  return isObject(message) && message.type === Type.CLOSE;
};
