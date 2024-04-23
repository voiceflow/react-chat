import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import { serializeToText } from '@voiceflow/slate-serializer/text';
import Bowser from 'bowser';
import { useMemo } from 'react';

import type { MessageProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import type { SessionOptions, UserTurnProps } from '@/types';

import type { RuntimeMessage } from './messages';
import { MESSAGE_TRACES } from './messages';

export enum FeedbackName {
  POSITIVE = 'Thumbs up',
  NEGATIVE = 'Thumbs down',
}

export const createContext = (): RuntimeMessage => ({
  messages: [],
});

export const useRuntimeAPI = ({
  url,
  user,
  userID,
  verify,
  versionID,
  traceHandlers = [],
}: ChatConfig & Pick<SessionOptions, 'userID'> & { traceHandlers?: typeof MESSAGE_TRACES }) => {
  const runtime: VoiceflowRuntime<RuntimeMessage> = useMemo(
    () =>
      new VoiceflowRuntime<RuntimeMessage>({
        verify,
        url,
        traces: [...MESSAGE_TRACES, ...traceHandlers],
      }),
    []
  );

  const interact = async (action: RuntimeAction) =>
    runtime.interact(createContext(), {
      sessionID: encodeURIComponent(userID),
      action,
      ...(versionID && { versionID }),
    });

  const saveFeedback = async (name: FeedbackName, lastTurnMessages: MessageProps[], userTurn: UserTurnProps | null) => {
    const aiMessages: string[] = [];

    lastTurnMessages.forEach((message) => {
      if (!message.ai) return;
      if (message.type !== MessageType.TEXT) return;
      const text = typeof message.text === 'string' ? message.text : serializeToText(message.text);

      aiMessages.push(text);
    });

    await runtime.feedback({
      sessionID: encodeURIComponent(userID),
      name,
      text: aiMessages,
      lastUserTurn: userTurn,
      ...(versionID && { versionID }),
    });
  };

  const saveTranscript = async () => {
    const {
      browser: { name: browser },
      os: { name: os },
      platform: { type: device },
    } = Bowser.parse(window.navigator.userAgent);

    await runtime.createTranscript(userID, {
      ...(os && { os }),
      ...(browser && { browser }),
      ...(device && { device }),
      ...(user && { user: user as { name: string } }),
    });
  };

  return { interact, saveFeedback, saveTranscript };
};
