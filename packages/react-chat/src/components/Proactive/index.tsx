import { Trace } from '@voiceflow/base-types';
import React from 'react';
import { match } from 'ts-pattern';

import { ClassName } from '@/constants';
import { tagFactory } from '@/hocs';
import { animationStyles, styled } from '@/styles';
import { ChatPosition } from '@/types';

import Close, { CloseContainer } from './Close';
import Message, { MessageContainer } from './Message';

export const tag = tagFactory(ClassName.PROACTIVE);

export const ProactiveMessageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  margin: '$4 0',
  alignItems: 'inherit',

  [`& ${MessageContainer}`]: {
    ...animationStyles({ duration: 150, delay: 0 }),
  },
});

export const ProactiveContainer = styled(tag('div'), {
  position: 'absolute',
  bottom: '100%',
  width: 256,
  display: 'flex',
  flexDirection: 'column',

  [`& ${CloseContainer}`]: {
    opacity: 0,
  },

  '&:hover': {
    [`& ${CloseContainer}`]: {
      opacity: 1,
    },
  },
});

interface ProactiveQueueProps {
  side: ChatPosition;
  messages: Trace.AnyTrace[];
}

const ProactiveQueue: React.FC<ProactiveQueueProps> = ({ side, messages }) => {
  const [isClosed, setIsClosed] = React.useState(false);

  const queue = React.useMemo(
    () =>
      messages.map((message, index) =>
        match(message)
          .with({ type: Trace.TraceType.TEXT }, ({ payload }) => (
            <Message key={index}>{String(payload.message)}</Message>
          ))
          .otherwise(() => null)
      ),
    [messages]
  );

  React.useEffect(() => {
    if (!queue.length) return;
    setIsClosed(false);
  }, [queue]);

  if (isClosed || !queue.length) return null;

  return (
    <ProactiveContainer style={{ [side]: 0, alignItems: side === ChatPosition.LEFT ? 'start' : 'end' }}>
      <Close onClick={() => setIsClosed(true)} />
      <ProactiveMessageContainer>{queue}</ProactiveMessageContainer>
    </ProactiveContainer>
  );
};

export default Object.assign(ProactiveQueue, {
  Message,
  Close,
});
