import { CardTraceDTO, CarouselTraceDTO, ChoiceTraceDTO, TextTraceDTO, VisualTraceDTO } from '@voiceflow/dtos-interact';
import type { RuntimeAction, TraceDeclaration } from '@voiceflow/sdk-runtime';
import {
  CardV2TraceComponent,
  ChoiceTraceComponent,
  TextTraceComponent,
  Trace,
  VisualTraceComponent,
} from '@voiceflow/sdk-runtime';

import type { CardProps } from '@/components/Card/types';
import type { SystemResponseProps } from '@/components/SystemResponse';
import { MessageType } from '@/components/SystemResponse/constants';

export interface RuntimeMessage extends Pick<SystemResponseProps, 'messages' | 'actions'> {}

const isValidCard = (card: CardProps) => {
  return !!card.title || !!card.description || !!card.image || !!card.actions?.filter(({ name }) => !!name).length;
};

export const MESSAGE_TRACES: TraceDeclaration<RuntimeMessage, any>[] = [
  TextTraceComponent(({ context }, trace) => {
    if (!TextTraceDTO.safeParse(trace).success) return context;

    const { slate, message, ai, delay, audio } = trace.payload;

    context.messages.push({
      type: MessageType.TEXT,
      text: slate?.content || message,
      delay,
      ...(ai ? { ai } : {}),
      ...(audio ? { audio } : {}),
    });

    return context;
  }),
  VisualTraceComponent(({ context }, trace) => {
    if (!VisualTraceDTO.safeParse(trace).success) return context;

    context.messages.push({ type: MessageType.IMAGE, url: trace.payload.image });
    return context;
  }),
  ChoiceTraceComponent(({ context }, trace) => {
    if (!ChoiceTraceDTO.safeParse(trace).success) return context;

    const {
      payload: { buttons },
    } = trace;
    context.actions = (buttons as { name: string; request: RuntimeAction }[]).map(({ name, request }) => ({
      name,
      request,
    }));
    return context;
  }),
  CardV2TraceComponent(({ context }, trace) => {
    if (!CardTraceDTO.safeParse(trace).success) return context;

    const {
      payload: { title, imageUrl, description, buttons },
    } = trace;
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
    handle: ({ context }, trace: Trace.Carousel) => {
      if (!CarouselTraceDTO.safeParse(trace).success) return context;

      const cards: CardProps[] = trace.payload.cards
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
