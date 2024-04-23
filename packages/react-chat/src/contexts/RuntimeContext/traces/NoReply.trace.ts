import type { Trace } from '@voiceflow/base-types';
import type { TraceDeclaration } from '@voiceflow/sdk-runtime';
import { ActionType } from '@voiceflow/sdk-runtime';

import { DEFAULT_MESSAGE_DELAY } from '@/components/SystemResponse/constants';

import type { RuntimeMessage } from '../messages';

export const NoReply = (callback: (timeout: number) => void): TraceDeclaration<RuntimeMessage, any> => ({
  canHandle: ({ type }) => type === ActionType.NO_REPLY,
  handle: ({ context }, trace: Trace.NoReplyTrace) => {
    if (trace.payload?.timeout) {
      // messages take 1 second to animate in, on top of the delay
      const messageDelays = context.messages.reduce(
        (acc, message) => acc + (message.delay ?? 1000) + DEFAULT_MESSAGE_DELAY,
        0
      );
      const timeout = trace.payload.timeout * 1000 + messageDelays;

      // eslint-disable-next-line callback-return
      callback(timeout);
    }
    return context;
  },
});
