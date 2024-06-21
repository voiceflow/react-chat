import type { BaseRequest } from '@voiceflow/dtos';
import { isTextRequest, RequestType } from '@voiceflow/dtos';
import type { TraceDeclaration } from '@voiceflow/sdk-runtime';
import cuid from 'cuid';
import { useState } from 'react';

import type { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import { useStateRef } from '@/hooks/useStateRef';
import type { SendMessage, SessionOptions, TurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';
import { broadcast, BroadcastType } from '@/utils/broadcast';
import { getSession, saveSession } from '@/utils/session';

import type { RuntimeMessage } from './messages';
import { resolveAction } from './runtime.utils';
import { EffectExtensions } from './traces/EffectExtensions.trace';
import { NoReply } from './traces/NoReply.trace';
import { ResponseExtensions } from './traces/ResponseExtensions.trace';
import { useNoReply } from './useNoReply';
import { createContext, useRuntimeAPI } from './useRuntimeAPI';

export interface Settings {
  assistant: AssistantOptions;
  config: ChatConfig;
  traceHandlers?: TraceDeclaration<RuntimeMessage, any>[];
}

const DEFAULT_SESSION_PARAMS = {
  turns: [],
  startTime: Date.now(),
};

export const useRuntimeState = ({ assistant, config, traceHandlers }: Settings) => {
  const [isOpen, setOpen] = useState(false);

  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>(() => ({
    ...DEFAULT_SESSION_PARAMS,
    status: config.autostart ? SessionStatus.IDLE : SessionStatus.ENDED,
    // retrieve stored session
    ...getSession(assistant.persistence, config.verify.projectID, config.userID),
  }));

  const [indicator, setIndicator] = useState(false);
  const { clearNoReplyTimeout, setNoReplyTimeout } = useNoReply(() => ({ interact, isStatus }));

  const runtime = useRuntimeAPI({
    ...config,
    ...session,
    traceHandlers: [
      NoReply(setNoReplyTimeout),
      ...EffectExtensions(assistant.extensions),
      ...ResponseExtensions(assistant.extensions),
      ...(traceHandlers ?? []),
    ],
  });

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

  const interact: SendMessage = async (action: BaseRequest, message?: string) => {
    clearNoReplyTimeout();

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

    const userAction = resolveAction(action, getTurns());

    setIndicator(true);
    const context = await runtime.interact(userAction).catch((error) => {
      // TODO: better define error condition
      console.error(error);
      return createContext();
    });
    setIndicator(false);

    addTurn({
      id: cuid(),
      type: TurnType.SYSTEM,
      timestamp: Date.now(),
      ...context,
    });

    broadcast({ type: BroadcastType.INTERACT, payload: { session: sessionRef.current, action: userAction } });
    saveSession(assistant.persistence, config.verify.projectID, sessionRef.current);
  };

  const launch = async (): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact(config.launch?.event ?? { type: RequestType.LAUNCH });
  };

  const reply = async (message: string): Promise<void> => interact({ type: RequestType.TEXT, payload: message });

  const open = async () => {
    broadcast({ type: BroadcastType.OPEN });
    setOpen(true);

    if (isStatus(SessionStatus.IDLE)) {
      await launch();
    }
  };

  const close = () => {
    broadcast({ type: BroadcastType.CLOSE });
    saveSession(assistant.persistence, config.verify.projectID, sessionRef.current);
    setOpen(false);
  };

  const getTurns = () => sessionRef.current.turns;

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
      getTurns,

      // these are meant to be static, so bundling them with the API
      assistant,
      config,
    },
  };
};

export type RuntimeState = ReturnType<typeof useRuntimeState>;
