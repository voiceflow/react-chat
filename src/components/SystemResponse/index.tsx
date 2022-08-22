import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Image from '@/components/Image';
import Message from '@/components/Message';

import { MessageType } from './constants';
import { Actions, Container, List, Spacer, Timestamp } from './styled';
import { MessageProps } from './types';
import { formatTime } from './utils';

export * from './types';

export interface ResponseActionProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export interface SystemResponseProps {
  image: string;
  timestamp: string;
  messages: MessageProps[];
  actions?: ResponseActionProps[];
}

const SystemResponse: React.FC<SystemResponseProps> = ({ image, timestamp, messages, actions = [] }) => (
  <>
    <Container>
      <Avatar image={image} />
      <List>
        {messages.map((message, index) =>
          match(message)
            .with({ type: MessageType.TEXT }, ({ text }) => (
              <Message from="system" key={index}>
                {text}
              </Message>
            ))
            .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} key={index} />)
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

export default Object.assign(SystemResponse, {
  Message: MessageType,

  Container,
  List,
  Spacer,
  Timestamp,
  Actions,
});
