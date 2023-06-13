import {
  CardV2TraceComponent,
  ChoiceTraceComponent,
  RuntimeAction,
  TextTraceComponent,
  Trace,
  TraceDeclaration,
  VisualTraceComponent,
} from '@voiceflow/sdk-runtime';

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
    context.messages.push({
      type: 'card',
      title,
      description: description.text,
      image: imageUrl,
      actions: buttons.map(({ name, request }) => ({ name, request })),
    });
    return context;
  }),
  {
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
  },
  {
    canHandle: ({ type }) => type === Trace.TraceType.END,
    handle: ({ context }) => {
      context.messages.push({ type: MessageType.END });
      return context;
    },
  },
];
