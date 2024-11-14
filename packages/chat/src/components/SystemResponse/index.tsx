import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import { useContext } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { useAutoScroll } from '@/hooks/useAutoScroll';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import { FeedbackButton } from '../FeedbackButton';
import { FeedbackButtonVariant, type IFeedbackButton } from '../FeedbackButton/FeedbackButton.interface';
import { MessageContainer } from '../MessageContainer';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator/Indicator';
import { actionsContainer, feedbackContainer } from './styles.css';
import type { SystemMessageProps } from './SystemMessage';
import { SystemMessage } from './SystemMessage';
import type { MessageProps } from './types';

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
   * If true, the system message is the first in a chat.
   */
  isFirst?: boolean;

  /**
   * If provided, will display {@link FeedbackButton} component under the last message.
   * @default false
   */
  feedback?: IFeedbackButton | undefined;

  /**
   * Override the rendering of individual messages.
   */
  Message?: React.ComponentType<SystemMessageProps>;
}

/**
 * A dynamic component capable of displaying all standard system responses.
 *
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-chat-systemresponse--simple-text}
 */
export const SystemResponse: React.FC<SystemResponseProps> = ({
  feedback,
  avatar,
  timestamp,
  messages,
  actions = [],
  isLast,
  isFirst,
  Message = SystemMessage,
}) => {
  const runtime = useContext(RuntimeStateAPIContext);

  const { showIndicator, visibleMessages, complete } = useAnimatedMessages({
    messages,
    isLast,
  });

  useAutoScroll([showIndicator, complete, visibleMessages.length]);

  if (!messages.length && !actions.length) return null;
  return (
    <MessageContainer>
      {visibleMessages.map((message, index) => (
        <Message
          message={message}
          withImage={!showIndicator && index === visibleMessages.length - 1}
          feedback={complete && !showIndicator && index === visibleMessages.length - 1 ? feedback : undefined}
          avatar={avatar}
          timestamp={timestamp}
          first={index === 0}
          isLast={isLast}
          key={index}
        />
      ))}
      {feedback && complete && isLast && (
        <div className={feedbackContainer({ isLast: true })}>
          <FeedbackButton {...feedback} variant={FeedbackButtonVariant.LAST_RESPONSE} />
        </div>
      )}
      {isLast && complete && !!actions.length && (
        <div className={actionsContainer}>
          {actions.map(({ request, name }, index) => (
            <Button variant={ButtonVariant.INLINE} onClick={() => runtime?.interact(request, name)} key={index}>
              {name}
            </Button>
          ))}
        </div>
      )}
      {showIndicator && <Indicator avatar={avatar} />}
    </MessageContainer>
  );
};
