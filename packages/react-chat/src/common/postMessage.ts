import type { RuntimeAction } from '@voiceflow/sdk-runtime';

import { RuntimeContext } from '@/runtime';
import { UserTurnProps } from '@/types';

import { Assistant, ChatConfig, SessionOptions } from './types';
import { isObject } from './utils';

export enum Type {
  SESSION = 'voiceflow:session',

  SAVE_SESSION = 'voiceflow:save_session',

  ACTION_REQUEST = 'voiceflow:action_request',
  ACTION_RESPONSE = 'voiceflow:action_response',

  SAVE_TRANSCRIPT = 'voiceflow:save_transcript',
  SAVE_FEEDBACK = 'voiceflow:save_feedback',

  SET_NO_REPLY_TIMEOUT = 'voiceflow:set_no_reply_timeout',

  OPEN = 'voiceflow:open',
  CLOSE = 'voiceflow:close',
}

export interface Message {
  type: Type;
  payload?: unknown;
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

export interface ActionRequest extends Message {
  type: Type.ACTION_REQUEST;
  payload: { action: RuntimeAction };
}

export interface ActionResponse extends Message {
  type: Type.ACTION_RESPONSE;
  payload: { context: RuntimeContext };
}

export interface SaveTranscript extends Message {
  type: Type.SAVE_TRANSCRIPT;
}

export interface SaveFeedback extends Message {
  type: Type.SAVE_FEEDBACK;
  payload: {
    name: string;
    text: string[];
    last_user_input: UserTurnProps | null;
  };
}

export interface SetNoReplyTimeout extends Message {
  type: Type.SET_NO_REPLY_TIMEOUT;
  payload: { timeout: number };
}

export type AnyMessage = Session | SaveSession | Open | Close | ActionRequest | ActionResponse | SaveTranscript | SaveFeedback | SetNoReplyTimeout;

export type MessageTypeMap<T extends AnyMessage = AnyMessage> = { [K in T['type']]: T extends { type: K } ? T : never };

export const isPostMessage = (message: unknown): message is Message => {
  return isObject(message) && typeof message.type === 'string' && Object.values<string>(Type).includes(message.type);
};

export const isClosePostMessage = (message: unknown): message is Close => {
  return isObject(message) && message.type === Type.CLOSE;
};
