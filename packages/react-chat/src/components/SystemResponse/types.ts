import { Text } from '@voiceflow/base-types';

import { CardProps } from '@/components/Card';
import { StringifiedEnum } from '@/types/util';

import { MessageType } from './constants';

export interface BaseMessageProps {
  delay?: number | undefined;
  ai?: boolean;
}

export interface TextMessageProps extends BaseMessageProps {
  type: StringifiedEnum<MessageType.TEXT>;
  text: string | Text.SlateTextValue;
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

export interface CustomMessage extends BaseMessageProps {
  type: `custom_${string}`;
  payload: any;
}

export type MessageProps = TextMessageProps | ImageMessageProps | CardMessageProps | CarouselMessageProps | EndMessage | CustomMessage;
