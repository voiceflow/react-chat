import { useContext, useRef } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Timestamp from '@/components/Timestamp';
import { RuntimeStateAPIContext } from '@/contexts';

import type { FeedbackProps } from '../Feedback';
import Feedback from '../Feedback';
import { MessageType } from './constants';
import { ExtensionMessage } from './ExtensionMessage';
import EndState from './state/end';
import { Controls, List, MessageContainer } from './styled';
import type { MessageProps } from './types';

export interface SystemMessageProps extends React.PropsWithChildren {
  /**
   * An image URL for an avatar to associate this message with.
   */
  avatar: string;

  /**
   * A unix timestamp indicating when this message was sent.
   */
  timestamp: number;

  /**
   * A single message to render.
   */
  message?: MessageProps;

  /**
   * If true, renders an avatar next to the message.
   */
  withImage: boolean;

  /**
   * If provided, will display {@link Feedback} component.
   * @default false
   */
  feedback?: FeedbackProps | undefined;
}

const SystemMessage: React.FC<SystemMessageProps> = ({ avatar, feedback, timestamp, message, withImage, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLSpanElement>(null);

  const { config } = useContext(RuntimeStateAPIContext);

  if (!children && message?.type === MessageType.END) {
    return <EndState />;
  }

  return (
    <>
      <Controls ref={controlsRef} />
      <MessageContainer ref={containerRef} withImage={withImage} scrollable={message?.type === MessageType.CAROUSEL}>
        <Avatar avatar={avatar} />
        <List>
          {children ??
            match(message)
              .with({ type: MessageType.TEXT }, ({ text }) => <Text text={text} />)
              .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} mode={config.render?.mode} />)
              .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} />)
              .with({ type: MessageType.CAROUSEL }, (props) => (
                <Carousel {...R.omit(props, ['type'])} containerRef={containerRef} controlsRef={controlsRef} />
              ))
              .with({ type: MessageType.EXTENSION }, ({ payload }) => (
                <ExtensionMessage extension={payload.extension} trace={payload.trace} />
              ))
              .otherwise(() => null)}
          {feedback && <Feedback {...feedback} />}
        </List>
        <Timestamp value={timestamp} />
      </MessageContainer>
    </>
  );
};

/**
 * An individual message within a system response.
 */
export default SystemMessage;
