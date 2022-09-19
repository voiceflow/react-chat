import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Bubble, Chat, SystemResponse, UserResponse } from '@/components';
import { RuntimeOptions, useRuntime } from '@/hooks';
import { TurnType } from '@/types';

import { Container } from './styled';

export interface ChatWidgetProps extends RuntimeOptions {
  assistant: {
    name: string;
    description: string;
    image: string;
  };
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistant, versionID, authorization }) => {
  const [isOpen, setOpen] = useState(false);
  const [isRunning, setRunning] = useState(true);
  const startTime = useMemo(() => new Date(), []);
  const runtime = useRuntime({ versionID, authorization });

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

  useEffect(() => {
    runtime.launch();
  }, []);

  return createPortal(
    <Container>
      {isOpen ? (
        <Chat
          title={assistant.name}
          description={assistant.description}
          image={assistant.image}
          startTime={startTime}
          isRunning={isRunning}
          isLoading={isRunning && !runtime.turns.length}
          onStart={handleStart}
          onEnd={handleEnd}
          onSend={runtime.sendMessage}
          onMinimize={handleMinimize}
        >
          {runtime.turns.map((turn, index) =>
            match(turn)
              .with({ type: TurnType.USER }, (props) => <UserResponse {...R.omit(props, ['type'])} key={index} />)
              .with({ type: TurnType.SYSTEM }, (props) => (
                <SystemResponse {...R.omit(props, ['type'])} image={assistant.image} animated key={index} />
              ))
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
