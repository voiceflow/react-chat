import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Bubble from '@/components/Bubble';
import Chat from '@/components/Chat';
import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';

import { TurnType } from './constants';
import { Container } from './styled';
import { TurnProps } from './types';

export interface ChatWidgetProps {
  assistant: {
    name: string;
    description: string;
    image: string;
  };
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistant }) => {
  const [isOpen, setOpen] = useState(false);
  const [isRunning, setRunning] = useState(false);
  const [turns, setTurns] = useState<TurnProps[]>([]);
  const startTime = useMemo(() => new Date(), []);

  const handleOpen = (): void => setOpen(true);
  const handleMinimize = (): void => setOpen(false);
  const handleStart = (): void => setRunning(true);
  const handleEnd = (): void => {
    handleMinimize();
    setRunning(false);
  };
  const handleSend = (message: string): void =>
    setTurns([
      ...turns,
      { type: TurnType.USER, message },
      {
        type: TurnType.SYSTEM,
        image: assistant.image,
        timestamp: new Date().toISOString(),
        messages: [{ type: 'text', text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quisquam corrupti harum et, quos seq.' }],
      },
    ]);

  return createPortal(
    <Container>
      {isOpen ? (
        <Chat
          title={assistant.name}
          description={assistant.description}
          image={assistant.image}
          startTime={startTime}
          isRunning={isRunning}
          onStart={handleStart}
          onEnd={handleEnd}
          onSend={handleSend}
          onMinimize={handleMinimize}
        >
          {turns.map((turn, index) =>
            match(turn)
              .with({ type: TurnType.USER }, (props) => <UserResponse {...R.omit(props, ['type'])} key={index} />)
              .with({ type: TurnType.SYSTEM }, (props) => <SystemResponse {...R.omit(props, ['type'])} key={index} />)
              .exhaustive()
          )}
        </Chat>
      ) : (
        <Bubble svg="launch" onClick={handleOpen} />
      )}
    </Container>,
    document.body
  );
};

export default Object.assign(ChatWidget, {
  Turn: TurnType,

  Container,
});
