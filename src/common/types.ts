import type { VoiceflowRuntimeOptions } from '@voiceflow/sdk-runtime';

import type { SystemResponseProps } from '@/components/SystemResponse';

export type { RuntimeAction } from '@voiceflow/sdk-runtime';

export interface RuntimeContext extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

export interface RuntimeOptions extends Omit<VoiceflowRuntimeOptions<RuntimeContext>, 'url'> {
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
