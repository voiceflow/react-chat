import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import { serializeToText } from '@voiceflow/slate-serializer/text';
import { useContext } from 'react';

import { RuntimeStateAPIContext } from '@/contexts';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { fadeInAndUp } from '@/styles/animation-utils.css';

import { Button } from '../Button';
import { ButtonVariant } from '../Button/constants';
import { FeedbackButton } from '../FeedbackButton';
import { FeedbackButtonVariant, type IFeedbackButton } from '../FeedbackButton/FeedbackButton.interface';
import { MessageContainer } from '../MessageContainer';
import { MessageType } from './constants';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator/Indicator';
import EndState from './state/end';
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
  Message = SystemMessage,
}) => {
  const runtime = useContext(RuntimeStateAPIContext);

  const { showIndicator, visibleMessages, complete } = useAnimatedMessages({
    messages,
    isLast,
  });

  useAutoScroll([showIndicator, complete, visibleMessages.length]);

  if (!messages.length && !actions.length) return null;

  const allTextContentForMessage = visibleMessages.reduce<string>((acc, message) => {
    if (message.type === MessageType.TEXT) {
      return (
        acc + (acc ? '\n' : '') + (typeof message.text !== 'string' ? serializeToText(message.text) : message.text)
      );
    }
    return acc;
  }, '');

  return (
    <MessageContainer isLast={isLast}>
      {visibleMessages.map((message, index) => {
        const endConversation = message?.type === MessageType.END;
        if (endConversation) {
          return <EndState />;
        }

        const lastMessageInGroup = index === visibleMessages.length - 1;
        const showFeedback = lastMessageInGroup && message.type === MessageType.TEXT;

        return (
          <>
            <Message
              message={message}
              withImage={!showIndicator && lastMessageInGroup}
              avatar={avatar}
              timestamp={timestamp}
              isLast={isLast}
              feedback={showFeedback ? feedback : undefined}
              textContent={allTextContentForMessage}
              key={index}
            />
            {feedback && isLast && complete && lastMessageInGroup && (
              <div className={feedbackContainer}>
                <FeedbackButton
                  {...feedback}
                  textContent={allTextContentForMessage}
                  variant={FeedbackButtonVariant.LAST_RESPONSE}
                />
              </div>
            )}
          </>
        );
      })}
      {isLast && complete && !!actions.length && (
        <div className={actionsContainer}>
          {actions.map(({ request, name }, index) => (
            <div
              className={fadeInAndUp}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Button variant={ButtonVariant.INLINE} onClick={() => runtime?.interact(request, name)} key={index}>
                {name}
              </Button>
            </div>
          ))}
        </div>
      )}
      {showIndicator && <Indicator avatar={avatar} isLast={isLast} />}
    </MessageContainer>
  );
};
