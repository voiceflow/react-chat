import type { AuthVerify, PublicVerify, RuntimeAction, RuntimeOptions as SDKRuntimeOptions } from '@voiceflow/sdk-runtime';
import { ChatPersistence, ChatPosition, ChatPublishing } from '@voiceflow/voiceflow-types/build/cjs/version/chat';

import { TurnProps } from '@/types';

export { ChatPersistence, ChatPosition };
export type { RuntimeAction };

export type SendMessage = (message: string, action: RuntimeAction) => Promise<void>;

export interface RuntimeOptions<Verify extends AuthVerify | PublicVerify = AuthVerify | PublicVerify> extends Omit<SDKRuntimeOptions<Verify>, 'url'> {
  url?: string | undefined;
  user?:
    | {
        name?: string;
        image?: string;
      }
    | undefined;
  userID?: string;
  versionID?: string | undefined;
}

export enum SessionStatus {
  IDLE = 'IDLE',
  ACTIVE = 'ACTIVE',
  ENDED = 'ENDED',
}

export interface SessionOptions {
  userID: string;
  turns?: TurnProps[];
  startTime?: number;
  status?: SessionStatus;
}

export type Assistant = Omit<ChatPublishing & Required<Omit<ChatPublishing, 'launcher' | 'stylesheet'>>, 'selectedIntents'>;

export interface ChatConfig extends RuntimeOptions<PublicVerify> {
  assistant?: Assistant;
}
