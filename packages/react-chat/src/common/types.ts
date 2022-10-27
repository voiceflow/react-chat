import type * as Runtime from '@voiceflow/sdk-runtime';
import { ChatPersistence, ChatPosition, ChatPublishing } from '@voiceflow/voiceflow-types/build/cjs/version/chat';

export { ChatPersistence, ChatPosition };

export interface RuntimeOptions extends Omit<Runtime.RuntimeOptions, 'url'> {
  url?: string | undefined;
  userID?: string | undefined;
  versionID?: string | undefined;
}

export type Assistant = Omit<ChatPublishing & Required<Omit<ChatPublishing, 'launcher'>>, 'selectedIntents'>;

export interface ChatConfig extends RuntimeOptions {
  assistant?: Assistant;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && !!object;
};

export const isEnumValue = <T extends { [k: string]: string }>(value: any, enumObject: T): value is T[keyof T] =>
  typeof value === 'string' && Object.values(enumObject).includes(value);
