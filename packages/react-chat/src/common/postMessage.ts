import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import { Assistant, ChatConfig, isObject } from './types';

export enum Type {
  LOAD = 'voiceflow:load',
  LOADED = 'voiceflow:loaded',

  OPEN = 'voiceflow:open',
  CLOSE = 'voiceflow:close',
  INTERACT = 'voiceflow:interact',
}

export interface Message {
  type: Type;
  payload?: unknown;
}

export interface Load extends Message {
  type: Type.LOAD;
  payload: ChatConfig;
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

export interface Loaded extends Message {
  type: Type.LOADED;
  payload: Assistant;
}

export type AnyMessage = Load | Open | Close | Interact | Loaded;

export type MessageTypeMap<T extends AnyMessage = AnyMessage> = { [K in T['type']]: T extends { type: K } ? T : never };

export const isPostMessage = (message: unknown): message is Message => {
  return isObject(message) && typeof message.type === 'string' && Object.values<string>(Type).includes(message.type);
};

export const isClosePostMessage = (message: unknown): message is Close => {
  return isObject(message) && message.type === Type.CLOSE;
};
