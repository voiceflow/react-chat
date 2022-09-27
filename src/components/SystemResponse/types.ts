import { CardProps } from '@/components/Card';
import { StringifiedEnum } from '@/types/util';

import { MessageType } from './constants';

export interface TextMessageProps {
  type: StringifiedEnum<MessageType.TEXT>;
  text: React.ReactNode;
}

export interface ImageMessageProps {
  type: StringifiedEnum<MessageType.IMAGE>;
  url: string;
}

export interface CardMessageProps extends CardProps {
  type: StringifiedEnum<MessageType.CARD>;
}

export interface CarouselMessageProps {
  type: StringifiedEnum<MessageType.CAROUSEL>;
  cards: CardProps[];
}

export type MessageProps = TextMessageProps | ImageMessageProps | CardMessageProps | CarouselMessageProps;
