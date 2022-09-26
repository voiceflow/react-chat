import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Bubble, Chat, SystemResponse, UserResponse } from '@/components';
import { RuntimeOptions, useRuntime } from '@/hooks';
import { TurnType } from '@/types';

import { Container } from './styled';

interface Session {
  startTime: Date;
}

export interface ChatWidgetProps extends RuntimeOptions {
  assistant: {
    name: string;
    description: string;
    image: string;
  };
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistant, versionID, authorization }) => {
  const [isOpen, setOpen] = useState(false);
  const [hasEnded, setEnded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const runtime = useRuntime({ versionID, authorization });
  const hasAnimated = useRef<Record<string, true>>({});

  const handleMinimize = (): void => setOpen(false);
  const handleStart = async (): Promise<void> => {
    setSession({ startTime: new Date() });
    setEnded(false);
    await runtime.launch();
  };
  const handleOpen = async (): Promise<void> => {
    setOpen(true);
    if (!session) {
      await handleStart();
    }
  };
  const handleEnd = (): void => {
    handleMinimize();
    setEnded(true);
  };
  const handleAnimationEnd = (id: string) => (): void => {
    hasAnimated.current[id] = true;
  };

  return createPortal(
    <Container>
      {isOpen && !!session ? (
        <Chat
          title={assistant.name}
          description={assistant.description}
          image={assistant.image}
          startTime={session.startTime}
          hasEnded={hasEnded}
          isLoading={!runtime.turns.length}
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
