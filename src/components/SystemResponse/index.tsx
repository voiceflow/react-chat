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

import { MessageType } from './constants';
import Indicator from './Indicator';
import { Actions, Container, List, Timestamp } from './styled';
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

const SystemResponse: React.FC<SystemResponseProps> = ({ image, timestamp, messages, actions = [], animated }) => {
  const shouldAnimate = animated && messages.length;

  const [isIndicatorVisible, setIndicatorVisible] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(shouldAnimate ? [] : messages);

  useAutoScroll([visibleMessages.length]);

  useEffect(() => {
    if (!shouldAnimate) return undefined;

    setIndicatorVisible(true);
    setVisibleMessages([]);

    const remaining = [...messages];
    let timer: NodeJS.Timeout;
    const setTimer = () => {
      timer = setTimeout(() => {
        const next = remaining.shift()!;

        setVisibleMessages((prev) => [...prev, next]);

        if (remaining.length === 0) {
          setIndicatorVisible(false);
        } else {
          setTimer();
        }
      }, 1000);
    };

    setTimer();

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
          <Timestamp>{formatTime(timestamp)}</Timestamp>
        </Container>
      ))}

      {!!actions.length && !isIndicatorVisible && (
        <Actions>
          {actions.map(({ label, onClick }, index) => (
            <Button variant="secondary" onClick={onClick} key={index}>
              {label}
            </Button>
          ))}
        </Actions>
      )}

      {isIndicatorVisible && <Indicator image={image} />}
    </>
  );
};

export default Object.assign(SystemResponse, {
  Message: MessageType,

  Container,
  List,
  Timestamp,
  Actions,
  Indicator,
});
