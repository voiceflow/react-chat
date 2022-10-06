import * as R from 'remeda';

import Button from '@/components/Button';
import { useAutoScroll } from '@/hooks';

import { MessageType } from './constants';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator';
import { Actions, Container, Controls, List } from './styled';
import SystemMessage from './SystemMessage';
import { MessageProps } from './types';

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
  isLive?: boolean;
  isLast?: boolean;
  onAnimationEnd?: VoidFunction;
}

const SystemResponse: React.FC<SystemResponseProps> = ({
  image,
  timestamp,
  messages,
  actions = [],
  isLive = false,
  isLast,
  onAnimationEnd = R.noop,
}) => {
  const { showIndicator, visibleMessages, complete } = useAnimatedMessages({
    messages,
    isLive,
    onAnimationEnd,
  });

  useAutoScroll([showIndicator, complete, visibleMessages.length]);

  if (!messages.length) return null;

  return (
    <>
      {visibleMessages.map((message, index) => (
        <SystemMessage
          message={message}
          withImage={!showIndicator && index === visibleMessages.length - 1}
          image={image}
          timestamp={timestamp}
          key={index}
        />
      ))}

      {isLast && complete && !!actions.length && (
        <Actions>
          {actions.map(({ label, onClick }, index) => (
            <Button variant="secondary" onClick={onClick} key={index}>
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
  Controls,
  List,
  Actions,
  Indicator,
  SystemMessage,
});
