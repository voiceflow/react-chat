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
import { serializeToJSX } from '@voiceflow/slate-serializer/jsx';
import cuid from 'cuid';
import { MutableRefObject, useMemo, useState } from 'react';

import { RUNTIME_URL, RuntimeContext, RuntimeOptions } from '@/common';
import { MessageType } from '@/components/SystemResponse/constants';
import { TurnProps, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';

const createContext = (): RuntimeContext => ({
  messages: [],
});

interface UseRuntimeProps extends RuntimeOptions {
  hasEnded?: MutableRefObject<boolean>;
}

export const useRuntime = ({ url = RUNTIME_URL, versionID, userID, hasEnded, verify }: UseRuntimeProps) => {
  const [turns, setTurns] = useState<TurnProps[]>([]);
  const [indicator, setIndicator] = useState(false);
  const sessionID = useMemo(() => (userID ? encodeURIComponent(userID) : cuid()), []);

  const runtime = useMemo(() => new VoiceflowRuntime<RuntimeContext>({ verify, url }), [verify]);
  const interact = async (action: RuntimeAction): Promise<void> => {
    setIndicator(true);

    const context = await runtime.interact(createContext(), { sessionID, action, ...(versionID ? { versionID } : {}) });

    setIndicator(false);

    setTurns((prev) => [
      ...prev,
      {
        id: cuid(),
        type: TurnType.SYSTEM,
        timestamp: new Date(),
        ...context,
      },
    ]);
  };

  const send = async (message: string, action: RuntimeAction): Promise<void> => {
    if (hasEnded?.current) return;

    handleActions(action);

    setTurns((prev) => [
      ...prev,
      {
        id: cuid(),
        type: TurnType.USER,
        message,
        timestamp: new Date(),
      },
    ]);
    await interact(action);
  };

  runtime.registerStep(
    TextTraceComponent(({ context }, { payload }) => {
      const { slate, message } = payload;
      context.messages.push({
        type: MessageType.TEXT,
        text: slate?.content ? serializeToJSX(slate.content) : message,
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
        label: name,
        onClick: () => send(name, request),
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
        actions: buttons.map(({ name, request }) => ({ label: name, onClick: () => send(name, request) })),
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
          actions: buttons.map(({ name, request }) => ({ label: name, onClick: () => send(name, request) })),
        })),
      });
      return context;
    },
  });

  const reset = () => setTurns([]);

  const launch = async (): Promise<void> => {
    if (turns.length) {
      reset();
    }

    await interact({ type: ActionType.LAUNCH, payload: null });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: ActionType.TEXT, payload: message });

  return {
    turns,
    reset,
    launch,
    reply,
    interact,
    indicator,
  };
};
