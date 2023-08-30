import { Trace as BaseTypesTrace } from '@voiceflow/base-types';
import { ActionType, RuntimeAction, Trace, TraceDeclaration, VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import { serializeToText } from '@voiceflow/slate-serializer/text';
import Bowser from 'bowser';
import cuid from 'cuid';
import { useEffect, useMemo, useState } from 'react';

import { RuntimeOptions, SendMessage, SessionOptions, SessionStatus } from '@/common';
import type { MessageProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import { RUNTIME_URL } from '@/constants';
import { MESSAGE_TRACES, RuntimeContext } from '@/runtime';
import { TurnProps, TurnType, UserTurnProps } from '@/types';
import { handleActions } from '@/utils/actions';

import { useStateRef } from './useStateRef';

const createContext = (): RuntimeContext => ({
  messages: [],
});

interface UseRuntimeProps extends RuntimeOptions {
  session: SessionOptions;
  saveSession?: (session: SessionOptions) => void;
  traces?: TraceDeclaration<RuntimeContext, any>[];
}

export enum FeedbackName {
  POSITIVE = 'Thumbs up',
  NEGATIVE = 'Thumbs down',
}

const DEFAULT_RUNTIME_STATE: Required<SessionOptions> = {
  turns: [],
  userID: cuid(),
  startTime: Date.now(),
  status: SessionStatus.IDLE,
};

/**
 * A wrapper for the Voiceflow runtime client.
 */
export const useRuntime = ({ url = RUNTIME_URL, versionID, verify, user, ...config }: UseRuntimeProps, dependencies: any[] = []) => {
  const [indicator, setIndicator] = useState(false);
  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>({ ...DEFAULT_RUNTIME_STATE, ...config.session });
  const [lastInteractionAt, setLastInteractionAt] = useState<number | null>(Date.now());
  const [noReplyTimeout, setNoReplyTimeout] = useState<number | null>(null);

  useEffect(() => {
    let noReplyTimer: NodeJS.Timeout | undefined;

    const checkNoReply = () => {
      const ready = isStatus(SessionStatus.ACTIVE);

      if (ready && noReplyTimeout && lastInteractionAt) {
        const timeSinceLastInteraction = Date.now() - lastInteractionAt;
        if (timeSinceLastInteraction > noReplyTimeout) {
          // Trigger no reply action
          interact({ type: ActionType.NO_REPLY, payload: null });
        }
      }

      noReplyTimer = setTimeout(checkNoReply, 1000);
    };

    checkNoReply();

    return () => {
      clearTimeout(noReplyTimer);
    };
  }, [noReplyTimeout, lastInteractionAt]);

  const runtime: VoiceflowRuntime<RuntimeContext> = useMemo(
    () =>
      new VoiceflowRuntime<RuntimeContext>({
        verify,
        url,
        traces: [
          ...(config.traces ?? []),
          ...MESSAGE_TRACES,
          {
            canHandle: ({ type }) => type === Trace.TraceType.NO_REPLY,
            handle: ({ context }, _trace) => {
              const trace = _trace as BaseTypesTrace.NoReplyTrace;

              setNoReplyTimeout(trace.payload.timeout * 1000);
              setLastInteractionAt(Date.now());

              return context;
            },
          },
        ],
      }),
    dependencies
  );

  const setTurns = (action: (turns: TurnProps[]) => TurnProps[]) => {
    setSession((prev) => ({ ...prev, turns: action(prev.turns) }));
  };
  const setStatus = (status: SessionStatus) => {
    setSession((prev) => (prev.status === status ? prev : { ...prev, status }));
  };
  const isStatus = (status: SessionStatus) => {
    return sessionRef.current.status === status;
  };

  const interact = async (action: RuntimeAction): Promise<void> => {
    setIndicator(true);

    const context = await runtime.interact(createContext(), { sessionID: sessionRef.current.userID, action, ...(versionID && { versionID }) });

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
  };

  const send: SendMessage = async (message, action) => {
    if (sessionRef.current.status === SessionStatus.ENDED) return;

    if (sessionRef.current.turns.length === 1) {
      // create transcript asynchronously in background
      const {
        browser: { name: browser },
        os: { name: os },
        platform: { type: device },
      } = Bowser.parse(window.navigator.userAgent);

      runtime.createTranscript(session.userID, { ...(os && { os }), ...(browser && { browser }), ...(device && { device }), ...(user && { user }) });
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

  const launch = async (): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact({ type: ActionType.LAUNCH, payload: null });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: ActionType.TEXT, payload: message });

  const feedback = async (name: FeedbackName, lastTurnMessages: MessageProps[], userTurn: UserTurnProps | null): Promise<void> => {
    const aiMessages: string[] = [];

    lastTurnMessages.forEach((message) => {
      if (!message.ai) return;
      if (message.type !== MessageType.TEXT) return;
      const text = typeof message.text === 'string' ? message.text : serializeToText(message.text);

      aiMessages.push(text);
    });

    await runtime.feedback({
      sessionID: sessionRef.current.userID,
      text: aiMessages,
      name,
      last_user_input: userTurn,
      ...(versionID && { versionID }),
    });
  };

  const register = (trace: TraceDeclaration<RuntimeContext, any>) => runtime.registerStep(trace);

  const addTurn = (turn: TurnProps) => setTurns((prev) => [...prev, turn]);

  return {
    send,
    reply,
    register,
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
