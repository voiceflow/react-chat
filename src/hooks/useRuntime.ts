import { BaseText } from '@voiceflow/base-types';
import {
  ChoiceTraceComponent,
  RuntimeAction,
  RuntimeTrace,
  TextTraceComponent,
  TextTracePayload,
  VisualTraceComponent,
  VoiceflowRuntime,
  VoiceflowRuntimeOptions,
} from '@voiceflow/sdk-runtime';
import { serializeToJSX } from '@voiceflow/slate-serializer/jsx';
import cuid from 'cuid';
import { MutableRefObject, useMemo, useState } from 'react';

import type { SystemResponseProps } from '@/components/SystemResponse';
import { TurnProps, TurnType } from '@/types';
import { handleActions } from '@/utils/actions';

const RUNTIME_URL = 'https://general-runtime.voiceflow.com';
const DEFAULT_MESSAGE_DELAY = 2000;

interface RuntimeContext extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

interface SlateTextTrace extends TextTracePayload {
  slate: {
    id: string;
    content: BaseText.SlateTextValue;
  };
}

interface CardTrace {
  title: string;
  imageUrl?: string;
  description: { text: string };
  buttons: { name: string; request: RuntimeAction }[];
}

interface CarouselTrace {
  cards: CardTrace[];
}

export interface RuntimeOptions extends Omit<VoiceflowRuntimeOptions<RuntimeContext>, 'url'> {
  url?: string | undefined;
  userID?: string | undefined;
  hasEnded?: MutableRefObject<boolean>;
  versionID?: string | undefined;
  messageDelay?: number | undefined;
}

const createContext = (): RuntimeContext => ({
  messages: [],
});

const isSlateText = (text: TextTracePayload): text is SlateTextTrace => 'slate' in text;

export const useRuntime = ({ url = RUNTIME_URL, versionID, userID, messageDelay = DEFAULT_MESSAGE_DELAY, hasEnded, ...options }: RuntimeOptions) => {
  const [turns, setTurns] = useState<TurnProps[]>([]);
  const [indicator, setIndicator] = useState(false);
  const sessionID = useMemo(() => (userID ? encodeURIComponent(userID) : cuid()), []);

  const runtime = useMemo(() => new VoiceflowRuntime<RuntimeContext>({ ...options, url }), [options.verify]);
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
        messageDelay,
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
      if (isSlateText(payload)) {
        context.messages.push({ type: 'text', text: serializeToJSX(payload.slate.content) });
      } else {
        context.messages.push({ type: 'text', text: payload.message });
      }
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
        onClick: () => send(name, request),
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
        actions: buttons.map(({ name, request }) => ({ label: name, onClick: () => send(name, request) })),
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

    await interact({ type: 'launch', payload: null });
  };

  const reply = async (message: string): Promise<void> => send(message, { type: 'text', payload: message });

  return {
    turns,
    reset,
    launch,
    reply,
    indicator,
  };
};
