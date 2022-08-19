import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Card, { CardProps } from '@/components/Card';
import Carousel from '@/components/Carousel';
import Message from '@/components/Message';
import { StringifiedEnum } from '@/types';

import { Actions, Container, List, Spacer, Timestamp } from './styled';
import { formatTime } from './utils';

export enum MessageType {
  TEXT = 'text',
  CARD = 'card',
  CAROUSEL = 'carousel',
}

export interface TextMessageProps {
  type: StringifiedEnum<MessageType.TEXT>;
  value: string;
}

export interface CardMessageProps extends CardProps {
  type: StringifiedEnum<MessageType.CARD>;
}

export interface CarouselMessageProps {
  type: StringifiedEnum<MessageType.CAROUSEL>;
  cards: CardProps[];
}

export type MessageProps = TextMessageProps | CardMessageProps | CarouselMessageProps;

export interface ResponseActionProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface ResponseProps {
  image: string;
  timestamp: string;
  messages: MessageProps[];
  actions?: ResponseActionProps[];
}

const Response: React.FC<ResponseProps> = ({ image, timestamp, messages, actions = [] }) => (
  <>
    <Container>
      <Avatar image={image} />
      <List>
        {messages.map((message, index) =>
          match(message)
            .with({ type: MessageType.TEXT }, ({ value }) => (
              <Message from="system" key={index}>
                {value}
              </Message>
            ))
            .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} key={index} />)
            .with({ type: MessageType.CAROUSEL }, (props) => <Carousel {...R.omit(props, ['type'])} key={index} />)
            .otherwise(() => null)
        )}
      </List>
      <Spacer />
      <Timestamp>{formatTime(timestamp)}</Timestamp>
    </Container>
    {!!actions.length && (
      <Actions>
        {actions.map(({ label, onClick }, index) => (
          <Button variant="secondary" onClick={onClick} key={index}>
            {label}
          </Button>
        ))}
      </Actions>
    )}
  </>
);

export default Object.assign(Response, {
  Container,
  List,
  Spacer,
  Timestamp,
  Actions,
});
