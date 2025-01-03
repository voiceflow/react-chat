import type { Text, Trace } from '@voiceflow/base-types';

import type { CardProps } from '@/components/Card/types';
import type { ResponseExtension } from '@/dtos/Extension.dto';
import type { StringifiedEnum } from '@/types/util';

import type { MessageType } from './constants';

export interface BaseMessageProps {
  delay?: number | undefined;
  ai?: boolean;
}

export interface TextMessageProps extends BaseMessageProps {
  type: StringifiedEnum<MessageType.TEXT>;
  text: string | Text.SlateTextValue;
  audio?: { src: string };
}

export interface StreamedMessageProps extends BaseMessageProps {
  type: StringifiedEnum<MessageType.STREAM>;
  text: string | Text.SlateTextValue;

  // // a promise that resolves when the stream is finished
  // finished: Promise<void>;
  useStream: () => string;
}

export interface ImageMessageProps extends BaseMessageProps {
  type: StringifiedEnum<MessageType.IMAGE>;
  url: string | null;
}

export interface CardMessageProps extends CardProps, BaseMessageProps {
  type: StringifiedEnum<MessageType.CARD>;
}

export interface CarouselMessageProps extends BaseMessageProps {
  type: StringifiedEnum<MessageType.CAROUSEL>;
  cards: CardProps[];
}

export interface EndMessage extends BaseMessageProps {
  type: StringifiedEnum<MessageType.END>;
}

export interface ExtensionMessage extends BaseMessageProps {
  type: StringifiedEnum<MessageType.EXTENSION>;
  payload: {
    trace: Trace.AnyTrace;
    extension: ResponseExtension;
  };
}

export interface CustomMessage extends BaseMessageProps {
  type: `custom_${string}`;
  payload: any;
}

export type MessageProps =
  | TextMessageProps
  | StreamedMessageProps
  | ImageMessageProps
  | CardMessageProps
  | CarouselMessageProps
  | EndMessage
  | ExtensionMessage
  | CustomMessage;
