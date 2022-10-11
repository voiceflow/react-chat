import { ChatConfig, isObject } from './types';

export enum Type {
  LOAD = 'load',
  OPEN = 'open',
  OPENED = 'opened',
  CLOSE = 'close',
  CLOSED = 'closed',
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
export interface Opened extends Message {
  type: Type.OPENED;
}
export interface Close extends Message {
  type: Type.CLOSE;
}
export interface Closed extends Message {
  type: Type.CLOSED;
}

export type AnyMessage = Load | Open | Opened | Close | Closed;

export type MessageTypeMap<T extends AnyMessage = AnyMessage> = { [K in T['type']]: T extends { type: K } ? T : never };

export const isPostMessage = (message: unknown): message is Message => {
  return isObject(message) && typeof message.type === 'string' && Object.values<string>(Type).includes(message.type);
};

export const isClosePostMessage = (message: unknown): message is Close => {
  return isObject(message) && message.type === Type.CLOSE;
};
