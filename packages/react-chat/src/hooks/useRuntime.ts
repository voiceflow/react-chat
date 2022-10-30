import {
  ActionType,
  CardV2TraceComponent,
  ChoiceTraceComponent,
  RuntimeAction,
  TextTraceComponent,
  Trace,
  VisualTraceComponent,
  VoiceflowRuntime,
} from '@voiceflow/sdk-runtime';
import Bowser from 'bowser';
import cuid from 'cuid';
import { useMemo, useState } from 'react';

import { RuntimeOptions, SendMessage, SessionOptions, SessionStatus } from '@/common';
import type { SystemResponseProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import { RUNTIME_URL } from '@/constants';
import { TurnProps, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';

import { useStateRef } from './useStateRef';

export interface RuntimeContext extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

const createContext = (): RuntimeContext => ({
  messages: [],
});

interface UseRuntimeProps extends RuntimeOptions {
  session: SessionOptions;
  saveSession?: (session: SessionOptions) => void;
}

const DEFAULT_RUNTIME_STATE: Required<SessionOptions> = {
  turns: [],
  userID: cuid(),
  startTime: Date.now(),
  status: SessionStatus.IDLE,
};

export const useRuntime = ({ url = RUNTIME_URL, versionID, verify, ...config }: UseRuntimeProps) => {
  const [indicator, setIndicator] = useState(false);
  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>({ ...DEFAULT_RUNTIME_STATE, ...config.session });

  const runtime = useMemo(() => new VoiceflowRuntime<RuntimeContext>({ verify, url }), [verify]);

  const setTurns = (action: (turns: TurnProps[]) => TurnProps[]) => {
    setSession((prev) => ({ ...prev, turns: action(prev.turns) }));
  };
  const setStatus = (status: SessionStatus) => {
    setSession((prev) => ({ ...prev, status }));
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
  };

  const send: SendMessage = async (message, action) => {
    if (sessionRef.current.status === SessionStatus.ENDED) return;

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

  runtime.registerStep(
    TextTraceComponent(({ context }, { payload }) => {
      const { slate, message } = payload;
      context.messages.push({
        type: MessageType.TEXT,
        text: slate?.content || message,
        delay: slate?.messageDelayMilliseconds,
      });
      return context;
    })
  );
  runtime.registerStep(
    VisualTraceComponent(({ context }, { payload: { image } }) => {
      context.messages.push({ type: MessageType.IMAGE, url: image });
      return context;
    })
  );
  runtime.registerStep(
    ChoiceTraceComponent(({ context }, { payload: { buttons } }) => {
      context.actions = (buttons as { name: string; request: RuntimeAction }[]).map(({ name, request }) => ({
        name,
        request,
      }));
      return context;
    })
  );
  runtime.registerStep(
    CardV2TraceComponent(({ context }, { payload: { title, imageUrl, description, buttons } }) => {
      context.messages.push({
        type: 'card',
        title,
        description: description.text,
        image: imageUrl,
        actions: buttons.map(({ name, request }) => ({ name, request })),
      });
      return context;
    })
  );
  runtime.registerStep({
    canHandle: ({ type }) => type === Trace.TraceType.CAROUSEL,
    handle: ({ context }, { payload: { cards } }: Trace.Carousel) => {
      context.messages.push({
        type: MessageType.CAROUSEL,
        cards: cards.map(({ title, description, imageUrl, buttons }) => ({
          title,
          description: description.text,
          image: imageUrl,
          actions: buttons.map(({ name, request }) => ({ name, request })),
        })),
      });
      return context;
    },
  });

  runtime.registerStep({
    canHandle: ({ type }) => type === Trace.TraceType.END,
    handle: ({ context }) => {
      setStatus(SessionStatus.ENDED);
      return context;
    },
  });

  const reset = () => setTurns(() => []);

  const launch = async (): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact({ type: ActionType.LAUNCH, payload: null });

    // create transcript asynchronously in background
    const { browser, os, platform } = Bowser.parse(window.navigator.userAgent);
    runtime.createTranscript(session.userID, { browser: browser.name!, os: os.name!, device: platform.type! });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: ActionType.TEXT, payload: message });

  return {
    send,
    reply,
    reset,
    launch,
    interact,
    indicator,
    session,
    sessionRef,
    setStatus,
    isStatus,
  };
};
