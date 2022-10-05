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

export interface ChatWidgetProps extends Omit<RuntimeOptions, 'verify'> {
  projectID: string;
  assistant: {
    name: string;
    description: string;
    image: string;
  };
  messageDelay?: number;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistant, userID, versionID, projectID, messageDelay, url }) => {
  const [isOpen, setOpen] = useState(false);
  const hasEnded = useRef(false);
  const [session, setSession] = useState<Session | null>(null);
  const runtime = useRuntime({ versionID, verify: { projectID }, messageDelay, userID, url, hasEnded });
  const hasAnimated = useRef<Record<string, true>>({});

  const handleMinimize = (): void => setOpen(false);
  const handleStart = async (): Promise<void> => {
    hasEnded.current = false;
    setSession({ startTime: new Date() });
    await runtime.launch();
  };
  const handleOpen = async (): Promise<void> => {
    setOpen(true);
    if (!session) {
      await handleStart();
    }
  };
  const handleEnd = (): void => {
    hasEnded.current = true;
    handleMinimize();
  };
  const handleAnimationEnd = (id: string) => (): void => {
    hasAnimated.current[id] = true;
  };

  return createPortal(
    <Container withChat={isOpen}>
      <Bubble svg="launch" onClick={handleOpen} />
      <Chat
        title={assistant.name}
        description={assistant.description}
        image={assistant.image}
        startTime={session?.startTime}
        hasEnded={hasEnded.current}
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
                isLive={!hasEnded.current && !hasAnimated.current[id]}
                onAnimationEnd={handleAnimationEnd(id)}
                key={id}
              />
            ))
            .exhaustive()
        )}
      </Chat>
    </Container>,
    document.body
  );
};

export default Object.assign(ChatWidget, {
  Container,
});
