import { useRef } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import Image from '@/components/Image';
import Text from '@/components/Text';
import Timestamp from '@/components/Timestamp';

import Feedback, { FeedbackProps } from '../Feedback';
import { MessageType } from './constants';
import EndState from './state/end';
import { Controls, List, MessageContainer } from './styled';
import { MessageProps } from './types';

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
   * A single message to render with a {@link Message} component.
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
              .with({ type: MessageType.IMAGE }, ({ url }) => <Image image={url} />)
              .with({ type: MessageType.CARD }, (props) => <Card {...R.omit(props, ['type'])} />)
              .with({ type: MessageType.CAROUSEL }, (props) => (
                <Carousel {...R.omit(props, ['type'])} containerRef={containerRef} controlsRef={controlsRef} />
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
