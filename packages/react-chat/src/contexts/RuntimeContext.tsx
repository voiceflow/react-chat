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
import React, { createContext, useMemo, useState } from 'react';

import { RuntimeOptions, SendMessage, SessionOptions, SessionStatus } from '@/common';
import type { SystemResponseProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';
import { RUNTIME_URL } from '@/constants';
import { useStateRef } from '@/hooks/useStateRef';
import { TurnProps, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';

export interface RuntimeContextAPI {
  send: SendMessage;
  reset: () => void;
  reply: (message: string) => Promise<void>;
  launch: () => Promise<void>;
  interact: (action: RuntimeAction) => Promise<void>;
  indicator: boolean;

  session: Required<SessionOptions>;
  sessionRef: React.MutableRefObject<SessionOptions>;

  setStatus: (status: SessionStatus) => void;
  isStatus: (status: SessionStatus) => boolean;
}

export const RuntimeContext = createContext<RuntimeContextAPI | null>(null);

export const { Consumer: RuntimeConsumer } = RuntimeContext;

export interface RuntimeProviderProps extends RuntimeOptions, React.PropsWithChildren {
  session: SessionOptions;
  saveSession?: (session: SessionOptions) => void;
}

const DEFAULT_RUNTIME_STATE: Required<SessionOptions> = {
  turns: [],
  userID: cuid(),
  startTime: Date.now(),
  status: SessionStatus.IDLE,
};

export interface RuntimeState extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

const interactState = (): RuntimeState => ({
  messages: [],
});

export const RuntimeProvider: React.FC<RuntimeProviderProps> = ({ url = RUNTIME_URL, user, verify, versionID, children, ...config }) => {
  const [indicator, setIndicator] = useState(false);
  const [session, setSession, sessionRef] = useStateRef<Required<SessionOptions>>({ ...DEFAULT_RUNTIME_STATE, ...config.session });

  const runtime = useMemo(() => new VoiceflowRuntime<RuntimeState>({ verify, url }), [verify]);

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

    const context = await runtime.interact(interactState(), { sessionID: sessionRef.current.userID, action, ...(versionID && { versionID }) });

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
      context.messages.push({ type: MessageType.END });
      return context;
    },
  });

  const reset = () => setTurns(() => []);

  const launch = async (): Promise<void> => {
    if (sessionRef.current.turns.length) reset();

    setStatus(SessionStatus.ACTIVE);
    await interact({ type: ActionType.LAUNCH, payload: null });

    // create transcript asynchronously in background
    const {
      browser: { name: browser },
      os: { name: os },
      platform: { type: device },
    } = Bowser.parse(window.navigator.userAgent);

    runtime.createTranscript(session.userID, { ...(os && { os }), ...(browser && { browser }), ...(device && { device }), ...(user && { user }) });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: ActionType.TEXT, payload: message });

  return (
    <RuntimeContext.Provider
      value={{
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
      }}
    >
      {children}
    </RuntimeContext.Provider>
  );
};
