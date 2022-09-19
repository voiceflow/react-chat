import { useEffect, useMemo, useRef, useState } from 'react';
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
  const hasAnimated = useRef<Record<string, true>>({});

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
  const handleAnimationEnd = (id: string) => (): void => {
    hasAnimated.current[id] = true;
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
          onSend={runtime.reply}
          onMinimize={handleMinimize}
        >
          {runtime.turns.map((turn) =>
            match(turn)
              .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
              .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
                <SystemResponse
                  {...R.omit(props, ['type'])}
                  image={assistant.image}
                  isAnimated={!hasAnimated.current[id]}
                  onAnimationEnd={handleAnimationEnd(id)}
                  key={id}
                />
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
