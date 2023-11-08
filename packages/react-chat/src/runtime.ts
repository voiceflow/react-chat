import {
  CardV2TraceComponent,
  ChoiceTraceComponent,
  RuntimeAction,
  TextTraceComponent,
  Trace,
  TraceDeclaration,
  VisualTraceComponent,
} from '@voiceflow/sdk-runtime';

import { CardProps, isValidCard } from './components/Card';
import type { SystemResponseProps } from './components/SystemResponse';
import { MessageType } from './components/SystemResponse/constants';

export interface RuntimeContext extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

export const MESSAGE_TRACES: TraceDeclaration<RuntimeContext, any>[] = [
  TextTraceComponent(({ context }, { payload }) => {
    const { slate, message } = payload;

    context.messages.push({
      type: MessageType.TEXT,
      text: slate?.content || message,
      delay: payload.delay,
      ...(payload.ai ? { ai: payload.ai } : {}),
    });
    return context;
  }),
  VisualTraceComponent(({ context }, { payload: { image } }) => {
    context.messages.push({ type: MessageType.IMAGE, url: image });
    return context;
  }),
  ChoiceTraceComponent(({ context }, { payload: { buttons } }) => {
    context.actions = (buttons as { name: string; request: RuntimeAction }[]).map(({ name, request }) => ({
      name,
      request,
    }));
    return context;
  }),
  CardV2TraceComponent(({ context }, { payload: { title, imageUrl, description, buttons } }) => {
    const card: CardProps = {
      title,
      description: description.text,
      image: imageUrl,
      actions: buttons.map(({ name, request }) => ({ name, request })),
    };

    if (isValidCard(card)) {
      context.messages.push({
        type: 'card',
        ...card,
      });
    }
    return context;
  }),
  {
    canHandle: ({ type }) => type === Trace.TraceType.CAROUSEL,
    handle: ({ context }, { payload }: Trace.Carousel) => {
      const cards: CardProps[] = payload.cards
        .map(({ title, description, imageUrl, buttons }) => ({
          title,
          description: description.text,
          image: imageUrl,
          actions: buttons.map(({ name, request }) => ({ name, request })),
        }))
        .filter(isValidCard);

      if (cards.length) {
        context.messages.push({
          type: MessageType.CAROUSEL,
          cards,
        });
      }

      return context;
    },
  },
  {
    canHandle: ({ type }) => type === Trace.TraceType.END,
    handle: ({ context }) => {
      context.messages.push({ type: MessageType.END });
      return context;
    },
  },
];
