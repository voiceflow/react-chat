import { ChatConfig, isObject, RuntimeAction } from './types';

export enum Type {
  LOAD = 'voiceflow:load',
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

export type AnyMessage = Load | Open | Close | Interact;

export type MessageTypeMap<T extends AnyMessage = AnyMessage> = { [K in T['type']]: T extends { type: K } ? T : never };

export const isPostMessage = (message: unknown): message is Message => {
  return isObject(message) && typeof message.type === 'string' && Object.values<string>(Type).includes(message.type);
};

export const isClosePostMessage = (message: unknown): message is Close => {
  return isObject(message) && message.type === Type.CLOSE;
};
