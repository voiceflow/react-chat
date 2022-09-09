import {
  ChoiceTraceComponent,
  RuntimeAction,
  RuntimeTrace,
  TextTraceComponent,
  VisualTraceComponent,
  VoiceflowRuntime,
  VoiceflowRuntimeOptions,
} from '@voiceflow/sdk-runtime';
import cuid from 'cuid';
import { useMemo, useState } from 'react';
import { SetOptional } from 'type-fest';

import type { SystemResponseProps } from '@/components/SystemResponse';
import { TurnProps, TurnType } from '@/types';

const RUNTIME_URL = 'https://general-runtime.voiceflow.com';

interface RuntimeContext extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

interface CardTrace {
  title: string;
  imageUrl?: string;
  description: { text: string };
  buttons: { name: string; request: RuntimeAction }[];
}

interface CarouselTrace {
  cards: CardTrace[];
}

export interface RuntimeOptions extends SetOptional<VoiceflowRuntimeOptions<RuntimeContext>, 'url'> {
  versionID: string;
}

const createContext = (): RuntimeContext => ({
  // timestamp: new Date(),
  messages: [],
});

export const useRuntime = ({ url = RUNTIME_URL, versionID, ...options }: RuntimeOptions) => {
  const [turns, setTurns] = useState<TurnProps[]>([]);
  const sessionID = useMemo(() => cuid(), []);

  const runtime = useMemo(() => new VoiceflowRuntime<RuntimeContext>({ ...options, url }), [options.authorization]);
  const interact = async (action: RuntimeAction): Promise<void> => {
    const context = await runtime.interact(createContext(), { versionID, sessionID, action });

    setTurns((prev) => [...prev, { type: TurnType.SYSTEM, timestamp: new Date(), ...context }]);
  };
  const reply = async (message: string, action: RuntimeAction): Promise<void> => {
    setTurns((prev) => [...prev, { type: TurnType.USER, message }]);
    await interact(action);
  };

  runtime.registerStep(
    TextTraceComponent(({ context }, { payload: { message } }) => {
      context.messages.push({ type: 'text', text: message });
      return context;
    })
  );
  runtime.registerStep(
    VisualTraceComponent(({ context }, { payload: { image } }) => {
      context.messages.push({ type: 'image', url: image });
      return context;
    })
  );
  runtime.registerStep(
    ChoiceTraceComponent(({ context }, { payload: { buttons } }) => {
      context.actions = (buttons as { name: string; request: RuntimeAction }[]).map(({ name, request }) => ({
        label: name,
        onClick: () => reply(name, request),
      }));
      return context;
    })
  );
  runtime.registerStep({
    canHandle: ({ type }) => type === 'cardV2',
    handle: ({ context }, { payload: { title, imageUrl, description, buttons } }: RuntimeTrace<never, CardTrace>) => {
      context.messages.push({
        type: 'card',
        title,
        description: description.text,
        image: imageUrl,
        actions: buttons.map(({ name, request }) => ({ label: name, onClick: () => reply(name, request) })),
      });
      return context;
    },
  });
  runtime.registerStep({
    canHandle: ({ type }) => type === 'carousel',
    handle: ({ context }, { payload: { cards } }: RuntimeTrace<never, CarouselTrace>) => {
      context.messages.push({
        type: 'carousel',
        cards: cards.map(({ title, description, imageUrl, buttons }) => ({
          title,
          description: description.text,
          image: imageUrl,
          actions: buttons.map(({ name, request }) => ({ label: name, onClick: () => reply(name, request) })),
        })),
      });
      return context;
    },
  });

  const launch = async (): Promise<void> => interact({ type: 'launch', payload: null });
  const sendMessage = async (message: string): Promise<void> => {
    setTurns((prev) => [...prev, { type: TurnType.USER, message }]);
    await interact({ type: 'text', payload: message });
  };

  return {
    turns,
    launch,
    sendMessage,
  };
};
