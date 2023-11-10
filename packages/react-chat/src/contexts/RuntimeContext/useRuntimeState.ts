import { BaseRequest } from '@voiceflow/base-types';
import { isTextRequest } from '@voiceflow/base-types/build/cjs/request';
import { ActionType, PublicVerify, Trace, TraceDeclaration } from '@voiceflow/sdk-runtime';
import cuid from 'cuid';
import { useEffect, useState } from 'react';

import { Assistant, LaunchOptions, RuntimeOptions, SendMessage, SessionOptions, SessionStatus } from '@/common';
import type { RuntimeMessage } from '@/contexts/RuntimeContext/messages';
import { useStateRef } from '@/hooks/useStateRef';
import { TurnProps, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';
import { getSession, saveSession } from '@/utils/session';

import { useRuntimeAPI } from './useRuntimeAPI';

export interface Settings {
  assistant: Assistant;
  config: RuntimeOptions<PublicVerify>;
}

const DEFAULT_SESSION_PARAMS = {
  turns: [],
  startTime: Date.now(),
  status: SessionStatus.IDLE,
};

export const useRuntimeState = ({ assistant, config }: Settings) => {
  const [isOpen, setOpen] = useState(false);

  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>(() => ({
    ...DEFAULT_SESSION_PARAMS,
    // retrieve stored session
    ...getSession(assistant.persistence, config.verify.projectID, config.userID),
  }));

  const [indicator, setIndicator] = useState(false);

  // TODO: refactor no-reply system
  const [lastInteractionAt, setLastInteractionAt] = useState<number | null>(Date.now());
  const [noReplyTimeout, setNoReplyTimeout] = useState<number | null>(null);
  const noReplyHandler: TraceDeclaration<RuntimeMessage, any> = {
    canHandle: ({ type }) => type === ActionType.NO_REPLY,
    handle: ({ context }, trace: Trace.NoReplyTrace) => {
      if (trace.payload?.timeout) {
        setNoReplyTimeout(trace.payload.timeout * 1000);
        setLastInteractionAt(Date.now());
      }
      return context;
    },
  };

  const runtime = useRuntimeAPI({ ...config, ...session, traceHandlers: [noReplyHandler] });

  // status management
  const setStatus = (status: SessionStatus) => {
    setSession((prev) => (prev.status === status ? prev : { ...prev, status }));
  };
  const isStatus = (status: SessionStatus) => {
    return sessionRef.current.status === status;
  };

  // turn management
  const setTurns = (action: (turns: TurnProps[]) => TurnProps[]) => {
    setSession((prev) => ({ ...prev, turns: action(prev.turns) }));
  };

  const addTurn = (turn: TurnProps) => setTurns((prev) => [...prev, turn]);

  const reset = () => setTurns(() => []);

  const interact: SendMessage = async (action: BaseRequest.BaseRequest, message?: string) => {
    if (sessionRef.current.status === SessionStatus.ENDED) return;

    // create a transcript on the first turn, do this async
    if (sessionRef.current.turns.length === 1) runtime.saveTranscript();

    handleActions(action);

    const userMessage = message || (isTextRequest(action) ? action.payload : null);
    if (userMessage) {
      addTurn({
        id: cuid(),
        type: TurnType.USER,
        message: userMessage,
        timestamp: Date.now(),
      });
    }

    setIndicator(true);
    const context = await runtime.interact(action);
    setIndicator(false);

    addTurn({
      id: cuid(),
      type: TurnType.SYSTEM,
      timestamp: Date.now(),
      ...context,
    });

    saveSession(assistant.persistence, config.verify.projectID, sessionRef.current);

    const finishedAnimatingAt = context.messages.reduce((acc, message) => {
      return acc + (message.delay ?? 1000);
    }, Date.now());

    setLastInteractionAt(finishedAnimatingAt);
  };

  const launch = async ({ event }: LaunchOptions = {}): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact(event ?? { type: BaseRequest.RequestType.LAUNCH, payload: null });
  };

  const reply = async (message: string): Promise<void> => interact({ type: BaseRequest.RequestType.TEXT, payload: message });

  // TODO: refactor no-reply system
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

  const open = async () => {
    setOpen(true);

    if (isStatus(SessionStatus.IDLE)) {
      await launch();
    }
  };

  const close = () => setOpen(false);

  return {
    state: {
      session,
      isOpen,
      indicator,
    },
    api: {
      launch,
      reply,
      open,
      interact,
      close,
      addTurn,
      feedback: runtime.saveFeedback,
      setStatus,
      isStatus,
      reset,

      // these are meant to be static, so bundling them with the API
      assistant,
      config,
    },
  };
};
