import React, { useEffect, useRef, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Chat, SystemResponse, UserResponse } from '@/components';
import { useRuntime } from '@/hooks';
import { createCustomTheme } from '@/styles';
import { TurnType } from '@/types';

import { useListenMessage } from './hooks';
import * as PostMessage from './PostMessage';
import { ChatConfig } from './types';

interface Session {
  startTime: Date;
}

interface ChatWidgetProps extends ChatConfig {
  close: VoidFunction;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ assistant, userID, versionID, projectID, messageDelay, url, color, close }) => {
  const hasEnded = useRef(false);
  const [session, setSession] = useState<Session | null>(null);
  const runtime = useRuntime({ versionID, verify: { projectID }, messageDelay, userID, url, hasEnded });
  const hasAnimated = useRef<Record<string, true>>({});
  const listen = useListenMessage();

  const handleStart = async (): Promise<void> => {
    hasEnded.current = false;
    setSession({ startTime: new Date() });
    await runtime.launch();
  };

  const handleEnd = (): void => {
    hasEnded.current = true;
    close();
  };

  const handleAnimationEnd = (id: string) => (): void => {
    hasAnimated.current[id] = true;
  };

  const [theme, setTheme] = useState<string>('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  useEffect(() => {
    listen(PostMessage.Type.OPEN, async (): Promise<void> => {
      if (!session) {
        await handleStart();
      }
    });
  }, []);

  return (
    <div className={theme}>
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
        onMinimize={close}
      >
        {runtime.turns.map((turn, turnIndex) =>
          match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                {...R.omit(props, ['type'])}
                image={assistant.image}
                isLive={!hasEnded.current && !hasAnimated.current[id]}
                onAnimationEnd={handleAnimationEnd(id)}
                key={id}
                isLast={turnIndex === runtime.turns.length - 1}
              />
            ))
            .exhaustive()
        )}
        {runtime.indicator && <SystemResponse.Indicator image={assistant.image} />}
      </Chat>
    </div>
  );
};

export default ChatWidget;
