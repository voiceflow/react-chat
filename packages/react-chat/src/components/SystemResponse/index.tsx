import { useContext } from 'react';

import type { RuntimeAction } from '@/common';
import Button from '@/components/Button';
import { RuntimeAPIContext } from '@/contexts';
import { useAutoScroll } from '@/hooks';

import Feedback, { FeedbackProps } from '../Feedback';
import { MessageType } from './constants';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator';
import { Actions, Container, Controls, List } from './styled';
import SystemMessage, { SystemMessageProps } from './SystemMessage';
import { MessageProps } from './types';

export * from './types';

export interface ResponseActionProps {
  name: string;
  request: RuntimeAction;
}

export interface SystemResponseProps {
  /**
   * An image URL for an avatar to associate the messages with.
   */
  avatar: string;

  /**
   * A unix timestamp indicating when the messages were sent.
   */
  timestamp: number;

  /**
   * A list of messages that will be rendered as {@link SystemMessage} components.
   */
  messages: MessageProps[];

  /**
   * A list of actions that will be rendered as buttons.
   */
  actions?: ResponseActionProps[];

  /**
   * If true, allows actions to appear after this message.
   * Only the last system message in a row can show actions.
   */
  isLast?: boolean;

  /**
   * If provided, will display {@link Feedback} component under the last message.
   * @default false
   */
  feedback?: FeedbackProps | undefined;

  /**
   * Override the rendering of individual messages.
   */
  Message?: React.ComponentType<SystemMessageProps>;
}

const SystemResponse: React.FC<SystemResponseProps> = ({ feedback, avatar, timestamp, messages, actions = [], isLast, Message = SystemMessage }) => {
  const runtime = useContext(RuntimeAPIContext);

  const { showIndicator, visibleMessages, complete } = useAnimatedMessages({
    messages,
    isLast,
  });

  useAutoScroll([showIndicator, complete, visibleMessages.length]);

  if (!messages.length && !actions.length) return null;

  return (
    <>
      {visibleMessages.map((message, index) => (
        <Message
          message={message}
          withImage={!showIndicator && index === visibleMessages.length - 1}
          feedback={complete && !showIndicator && index === visibleMessages.length - 1 ? feedback : undefined}
          avatar={avatar}
          timestamp={timestamp}
          key={index}
        />
      ))}

      {isLast && complete && !!actions.length && (
        <Actions>
          {actions.map(({ name, request }, index) => (
            <Button variant="secondary" onClick={() => runtime?.send(name, request)} key={index}>
              {name}
            </Button>
          ))}
        </Actions>
      )}

      {showIndicator && <Indicator avatar={avatar} />}
    </>
  );
};

/**
 * A dynamic component capable of displaying all standard system responses.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-systemresponse--simple-text}
 */
export default Object.assign(SystemResponse, {
  Message: MessageType,

  Container,
  Controls,
  List,
  Actions,
  Indicator,
  SystemMessage,
});
