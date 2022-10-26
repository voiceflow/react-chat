import type * as Runtime from '@voiceflow/sdk-runtime';

export interface RuntimeOptions extends Omit<Runtime.RuntimeOptions, 'url'> {
  url?: string | undefined;
  userID?: string | undefined;
  versionID?: string | undefined;
}

export interface Assistant {
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface ChatConfig extends RuntimeOptions {
  assistant?: Assistant;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && !!object;
};
