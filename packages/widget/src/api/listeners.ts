import type { Trace } from '@voiceflow/base-types';
import { Listeners, MESSAGE_TRACES, PostMessage, RuntimeOptions, SessionOptions } from '@voiceflow/react-chat';
import { ActionType, VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import Bowser from 'bowser';

import { RUNTIME_URL } from './constants';

const createContext = () => ({
  messages: [],
});

export const initializeAPIListeners = (
  sendMessage: (message: PostMessage.AnyMessage) => void,
  session: SessionOptions,
  { user, verify, url = RUNTIME_URL, versionID }: RuntimeOptions
) => {
  const sessionID = session.userID;

  const runtime = new VoiceflowRuntime({
    verify,
    url,
    traces: [
      ...MESSAGE_TRACES,
      {
        canHandle: ({ type }) => type === ActionType.NO_REPLY,
        handle: ({ context }, trace: Trace.NoReplyTrace) => {
          if (trace.payload?.timeout) {
            sendMessage({
              type: PostMessage.Type.SET_NO_REPLY_TIMEOUT,
              payload: {
                timeout: trace.payload.timeout,
              },
            });
          }

          return context;
        },
      },
    ],
  });

  const ActionRequestListener: Listeners.MessageListener<PostMessage.Type.ACTION_REQUEST> = {
    type: PostMessage.Type.ACTION_REQUEST,
    action: async ({ payload: { action } }) => {
      const context = await runtime.interact(createContext(), { sessionID, action, ...(versionID && { versionID }) });

      sendMessage({
        type: PostMessage.Type.ACTION_RESPONSE,
        payload: {
          context,
        },
      });
    },
  };

  const SaveTranscriptListener: Listeners.MessageListener<PostMessage.Type.SAVE_TRANSCRIPT> = {
    type: PostMessage.Type.SAVE_TRANSCRIPT,
    action: async () => {
      const {
        browser: { name: browser },
        os: { name: os },
        platform: { type: device },
      } = Bowser.parse(window.navigator.userAgent);

      await runtime.createTranscript(sessionID, {
        ...(os && { os }),
        ...(browser && { browser }),
        ...(device && { device }),
        ...(user && { user }),
      });
    },
  };

  const SaveFeedbackListener: Listeners.MessageListener<PostMessage.Type.SAVE_FEEDBACK> = {
    type: PostMessage.Type.SAVE_FEEDBACK,
    action: async ({ payload: { text, name, last_user_input } }) => {
      await runtime.feedback({
        sessionID,
        text,
        name,
        last_user_input,
        ...(versionID && { versionID }),
      });
    },
  };

  const listeners = [ActionRequestListener, SaveTranscriptListener, SaveFeedbackListener];

  // ensure unique listeners
  const listenerTypes = new Set(listeners.map(({ type }) => type));
  Listeners.context.listeners = Listeners.context.listeners.filter(({ type }) => !listenerTypes.has(type));
  Listeners.context.listeners.push(...listeners);
};
