import { BaseRequest } from '@voiceflow/base-types';
import type { AuthVerify, PublicVerify, RuntimeAction, RuntimeOptions as SDKRuntimeOptions } from '@voiceflow/sdk-runtime';
import { ChatPersistence, ChatPosition, ChatPublishing } from '@voiceflow/voiceflow-types/build/cjs/version/chat';

import { TurnProps } from '@/types';

export { ChatPersistence, ChatPosition };
export type { RuntimeAction };

export type SendMessage = (action: RuntimeAction, message?: string) => Promise<void>;

export interface LaunchOptions {
  event?: BaseRequest.BaseRequest;
}

export interface RuntimeOptions<Verify extends AuthVerify | PublicVerify = AuthVerify | PublicVerify> extends SDKRuntimeOptions<Verify> {
  user?:
    | {
        name?: string;
        image?: string;
      }
    | undefined;
  userID?: string;
  versionID?: string | undefined;
  launch?: LaunchOptions;

  allowDangerousHTML?: boolean;
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
