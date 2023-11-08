import { BaseRequest } from '@voiceflow/base-types';
import { serializeToText } from '@voiceflow/slate-serializer/text';
import cuid from 'cuid';
import { useEffect, useState } from 'react';

import { LaunchOptions, Listeners, PostMessage, RuntimeOptions, SendMessage, SessionOptions, SessionStatus } from '@/common';
import type { MessageProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import { TurnProps, TurnType, UserTurnProps } from '@/types';
import { handleActions } from '@/utils/actions';

import { useStateRef } from './useStateRef';

interface UseRuntimeProps extends RuntimeOptions {
  session: SessionOptions;
  saveSession?: (session: SessionOptions) => void;
}

export enum FeedbackName {
  POSITIVE = 'Thumbs up',
  NEGATIVE = 'Thumbs down',
}

const DEFAULT_SESSION_PARAMS = {
  turns: [],
  startTime: Date.now(),
  status: SessionStatus.IDLE,
};

/**
 * A wrapper for the Voiceflow runtime client.
 */
export const useRuntime = ({ versionID, verify, user, ...config }: UseRuntimeProps) => {
  const [indicator, setIndicator] = useState(false);
  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>({ ...DEFAULT_SESSION_PARAMS, ...config.session });
  const [lastInteractionAt, setLastInteractionAt] = useState<number | null>(Date.now());
  const [noReplyTimeout, setNoReplyTimeout] = useState<number | null>(null);

  // REQUEST
  const interact = async (action: BaseRequest.BaseRequest): Promise<void> => {
    setIndicator(true);

    Listeners.sendMessage({ type: PostMessage.Type.ACTION_REQUEST, payload: { action } });
  };

  // RESPONSE
  Listeners.useListenMessage(PostMessage.Type.ACTION_RESPONSE, ({ payload: { context } }) => {
    setIndicator(false);

    setTurns((prev) => [
      ...prev,
      {
        id: cuid(),
        type: TurnType.SYSTEM,
        timestamp: Date.now(),
        ...context,
      },
    ]);

    config.saveSession?.(sessionRef.current);

    let finishedAnimatingAt = Date.now();

    context.messages.forEach((message) => {
      finishedAnimatingAt += message.delay ?? 1000;
    });

    setLastInteractionAt(finishedAnimatingAt);
  });

  Listeners.useListenMessage(PostMessage.Type.SET_NO_REPLY_TIMEOUT, ({ payload: { timeout } }) => {
    setNoReplyTimeout(timeout * 1000);
    setLastInteractionAt(Date.now());
  });

  useEffect(() => {
    let noReplyTimer: NodeJS.Timeout | undefined;

    const checkNoReply = () => {
      const ready = isStatus(SessionStatus.ACTIVE);

      if (ready && noReplyTimeout && lastInteractionAt) {
        const timeSinceLastInteraction = Date.now() - lastInteractionAt;
        if (timeSinceLastInteraction > noReplyTimeout) {
          // Trigger no reply action
          interact({ type: BaseRequest.RequestType.NO_REPLY, payload: null });
        }
      }

      noReplyTimer = setTimeout(checkNoReply, 1000);
    };

    checkNoReply();

    return () => {
      clearTimeout(noReplyTimer);
    };
  }, [noReplyTimeout, lastInteractionAt]);

  const setTurns = (action: (turns: TurnProps[]) => TurnProps[]) => {
    setSession((prev) => ({ ...prev, turns: action(prev.turns) }));
  };
  const setStatus = (status: SessionStatus) => {
    setSession((prev) => (prev.status === status ? prev : { ...prev, status }));
  };
  const isStatus = (status: SessionStatus) => {
    return sessionRef.current.status === status;
  };

  const send: SendMessage = async (message, action) => {
    if (sessionRef.current.status === SessionStatus.ENDED) return;

    // create a transcript on the first turn
    if (sessionRef.current.turns.length === 1) {
      Listeners.sendMessage({ type: PostMessage.Type.SAVE_TRANSCRIPT });
    }

    handleActions(action);

    setTurns((prev) => [
      ...prev,
      {
        id: cuid(),
        type: TurnType.USER,
        message,
        timestamp: Date.now(),
      },
    ]);
    await interact(action);
  };

  const reset = () => setTurns(() => []);

  const launch = async ({ event }: LaunchOptions = {}): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact(event ?? { type: BaseRequest.RequestType.LAUNCH, payload: null });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: BaseRequest.RequestType.TEXT, payload: message });

  const feedback = async (name: FeedbackName, lastTurnMessages: MessageProps[], userTurn: UserTurnProps | null): Promise<void> => {
    const aiMessages: string[] = [];

    lastTurnMessages.forEach((message) => {
      if (!message.ai) return;
      if (message.type !== MessageType.TEXT) return;
      const text = typeof message.text === 'string' ? message.text : serializeToText(message.text);

      aiMessages.push(text);
    });

    Listeners.sendMessage({
      type: PostMessage.Type.SAVE_FEEDBACK,
      payload: {
        name,
        text: aiMessages,
        last_user_input: userTurn,
      },
    });
  };

  const addTurn = (turn: TurnProps) => setTurns((prev) => [...prev, turn]);

  return {
    send,
    reply,
    reset,
    launch,
    interact,
    feedback,
    indicator,
    session,
    setStatus,
    isStatus,
    addTurn,
  };
};
