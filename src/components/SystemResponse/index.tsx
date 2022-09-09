import { useEffect, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Image from '@/components/Image';
import Message from '@/components/Message';
import { useAutoScroll } from '@/hooks';
import { chain } from '@/utils/functional';

import { MessageType } from './constants';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator';
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
  timestamp: Date;
  messages: MessageProps[];
  actions?: ResponseActionProps[];
  animated?: boolean;
}

const SystemResponse: React.FC<SystemResponseProps> = ({ image, timestamp, messages, actions = [], animated = false }) => {
  const [actionUsed, setActionUsed] = useState(false);
  const { showIndicator, visibleMessages } = useAnimatedMessages(messages, animated);
  const showActions = !!actions.length && !showIndicator && !actionUsed;

  const hideActions = () => setActionUsed(true);

  useAutoScroll([visibleMessages.length]);

  if (!messages.length) return null;

  return (
    <>
      {visibleMessages.map((message, index) => (
        <Container withImage={index === messages.length - 1} scrollable={message.type === MessageType.CAROUSEL} key={index}>
          <Avatar image={image} />
          <List>
            {match(message)
              .with({ type: MessageType.TEXT }, ({ text }) => (
                <Message from="system" key={index}>
                  {text}
                </Message>
              ))
              .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} />)
              .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} />)
              .with({ type: MessageType.CAROUSEL }, (props) => <Carousel {...R.omit(props, ['type'])} />)
              .otherwise(() => null)}
          </List>
          <Spacer />
          <Timestamp>{formatTime(timestamp)}</Timestamp>
        </Container>
      ))}

      {showActions && (
        <Actions>
          {actions.map(({ label, onClick }, index) => (
            <Button variant="secondary" onClick={chain(onClick, hideActions)} key={index}>
              {label}
            </Button>
          ))}
        </Actions>
      )}

      {showIndicator && <Indicator image={image} />}
    </>
  );
};

export default Object.assign(SystemResponse, {
  Message: MessageType,

  Container,
  List,
  Spacer,
  Timestamp,
  Actions,
  Indicator,
});
