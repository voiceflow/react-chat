import { useContext } from 'react';

import type { RuntimeAction, SendMessage } from '@/common';
import Button from '@/components/Button';
import { RuntimeContext } from '@/contexts';
import { useAutoScroll } from '@/hooks';

import { MessageType } from './constants';
import { useAnimatedMessages } from './hooks';
import Indicator from './Indicator';
import { Actions, Container, Controls, List } from './styled';
import SystemMessage from './SystemMessage';
import { MessageProps } from './types';

export * from './types';

export interface ResponseActionProps {
  name: string;
  request: RuntimeAction;
}

export interface SystemResponseProps {
  avatar: string;
  timestamp: number;
  messages: MessageProps[];
  actions?: ResponseActionProps[];
  isLast?: boolean;
}

const SystemResponse: React.FC<SystemResponseProps> = ({ avatar, timestamp, messages, actions = [], isLast }) => {
  const runtime = useContext(RuntimeContext);

  const { showIndicator, visibleMessages, complete } = useAnimatedMessages({
    messages,
    isLast,
  });

  useAutoScroll([showIndicator, complete, visibleMessages.length]);

  if (!messages.length && !actions.length) return null;

  return (
    <>
      {visibleMessages.map((message, index) => (
        <SystemMessage
          message={message}
          withImage={!showIndicator && index === visibleMessages.length - 1}
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

export default Object.assign(SystemResponse, {
  Message: MessageType,

  Container,
  Controls,
  List,
  Actions,
  Indicator,
  SystemMessage,
});
