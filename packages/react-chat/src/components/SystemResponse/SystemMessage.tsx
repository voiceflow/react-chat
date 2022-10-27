import { useRef } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Image from '@/components/Image';
import Message from '@/components/Message';
import Timestamp from '@/components/Timestamp';

import { MessageType } from './constants';
import { Container, Controls, List } from './styled';
import { MessageProps } from './types';

export interface SystemMessageProps {
  avatar: string;
  timestamp: Date;
  message: MessageProps;
  withImage: boolean;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ avatar, timestamp, message, withImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLSpanElement>(null);

  return (
    <>
      <Controls ref={controlsRef} />
      <Container ref={containerRef} withImage={withImage} scrollable={message.type === MessageType.CAROUSEL}>
        <Avatar avatar={avatar} />
        <List>
          {match(message)
            .with({ type: MessageType.TEXT }, ({ text }) => <Message from="system">{text}</Message>)
            .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} />)
            .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} />)
            .with({ type: MessageType.CAROUSEL }, (props) => (
              <Carousel {...R.omit(props, ['type'])} containerRef={containerRef} controlsRef={controlsRef} />
            ))
            .otherwise(() => null)}
        </List>
        <Timestamp value={timestamp} />
      </Container>
    </>
  );
};

export default SystemMessage;
