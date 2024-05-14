import type { BaseRequest } from '@voiceflow/dtos';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import { ChatPersistence, ChatPosition } from '@voiceflow/voiceflow-types/build/cjs/version/chat';

import type { TurnProps } from './turn';

export { ChatPersistence, ChatPosition };
export type { RuntimeAction };

export type SendMessage = (action: BaseRequest, message?: string) => Promise<void>;

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
