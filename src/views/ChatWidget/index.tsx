import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import Bubble from '@/components/Bubble';
import Chat from '@/components/Chat';
import SystemResponse from '@/components/SystemResponse';
import UserResponse from '@/components/UserResponse';
import { useRuntime } from '@/hooks/useRuntime';
import { TurnType } from '@/types';

import { Container } from './styled';

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
  const startTime = useMemo(() => new Date(), []);

  const handleOpen = (): void => setOpen(true);
  const handleMinimize = (): void => setOpen(false);
  const handleStart = async (): Promise<void> => {
    setRunning(true);
    await runtime.launch();
  };
  const handleEnd = (): void => {
    handleMinimize();
    setRunning(false);
  };

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
          onSend={runtime.sendMessage}
          onMinimize={handleMinimize}
        >
          {runtime.turns.map((turn, index) =>
            match(turn)
              .with({ type: TurnType.USER }, (props) => <UserResponse {...R.omit(props, ['type'])} key={index} />)
              .with({ type: TurnType.SYSTEM }, (props) => <SystemResponse {...R.omit(props, ['type'])} image={assistant.image} key={index} />)
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
  Container,
});
