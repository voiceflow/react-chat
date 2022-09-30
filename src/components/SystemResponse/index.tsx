import { useState } from 'react';
import * as R from 'remeda';

import Button from '@/components/Button';
import { useAutoScroll } from '@/hooks';
import { chain } from '@/utils/functional';

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
  messageDelay: number;
  actions?: ResponseActionProps[];
  isLive?: boolean;
  onAnimationEnd?: VoidFunction;
}

const SystemResponse: React.FC<SystemResponseProps> = ({
  image,
  timestamp,
  messages,
  messageDelay,
  actions = [],
  isLive = false,
  onAnimationEnd = R.noop,
}) => {
  const [actionUsed, setActionUsed] = useState(!isLive);
  const { showIndicator, showActions, visibleMessages } = useAnimatedMessages({
    messages,
    messageDelay,
    isLive,
    hasActions: !!actions.length,
    onAnimationEnd,
  });

  const hideActions = () => setActionUsed(true);

  useAutoScroll([showIndicator, showActions, visibleMessages.length]);

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

      {showActions && !actionUsed && (
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
  Controls,
  List,
  Actions,
  Indicator,
  SystemMessage,
});
