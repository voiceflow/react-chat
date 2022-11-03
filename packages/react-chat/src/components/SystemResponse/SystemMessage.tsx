import { serializeToJSX } from '@voiceflow/slate-serializer/jsx';
import { useRef } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { SendMessage } from '@/common';
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
  send?: SendMessage | undefined;
  avatar: string;
  timestamp: number;
  message: MessageProps;
  withImage: boolean;
  onEnd?: VoidFunction | undefined;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ send, avatar, timestamp, message, withImage, onEnd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLSpanElement>(null);

  if (message.type === MessageType.END) {
    onEnd?.();
    return null;
  }

  return (
    <>
      <Controls ref={controlsRef} />
      <Container ref={containerRef} withImage={withImage} scrollable={message.type === MessageType.CAROUSEL}>
        <Avatar avatar={avatar} />
        <List>
          {match(message)
            .with({ type: MessageType.TEXT }, ({ text }) => <Message from="system">{typeof text === 'string' ? text : serializeToJSX(text)}</Message>)
            .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} />)
            .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} send={send} />)
            .with({ type: MessageType.CAROUSEL }, (props) => (
              <Carousel {...R.omit(props, ['type'])} send={send} containerRef={containerRef} controlsRef={controlsRef} />
            ))
            .otherwise(() => null)}
        </List>
        <Timestamp value={timestamp} />
      </Container>
    </>
  );
};

export default SystemMessage;
