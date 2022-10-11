import React, { useEffect, useRef, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { ChatConfig, Listeners, PostMessage } from '@/common';
import { Chat, SystemResponse, UserResponse } from '@/components';
import { useRuntime } from '@/hooks';
import { createCustomTheme } from '@/styles';
import { TurnType } from '@/types';

import { useForceUpdate, useSendMessage } from './hooks';
import { ChatWidgetContainer } from './styled';

interface Session {
  startTime: Date;
}

const ChatWidget: React.FC<ChatConfig> = ({ assistant, userID, versionID, projectID, messageDelay, url, color }) => {
  const hasEnded = useRef(false);
  const session = useRef<Session | null>(null);
  const hasAnimated = useRef<Record<string, true>>({});

  const [forceUpdate] = useForceUpdate();

  const runtime = useRuntime({ versionID, verify: { projectID }, messageDelay, userID, url, hasEnded });

  const close = useSendMessage({ type: PostMessage.Type.CLOSE });

  Listeners.useListenMessage(PostMessage.Type.OPEN, async (): Promise<void> => {
    if (!session.current) await handleStart();
  });

  const handleStart = async (): Promise<void> => {
    hasEnded.current = false;
    session.current = { startTime: new Date() };
    forceUpdate();
    await runtime.launch();
  };

  const handleEnd = (): void => {
    hasEnded.current = true;
    forceUpdate();
    close();
  };

  const handleAnimationEnd = (id: string) => (): void => {
    hasAnimated.current[id] = true;
  };

  const [theme, setTheme] = useState<string>('');
  useEffect(() => {
    setTheme(createCustomTheme({ color }));
  }, [color]);

  return (
    <ChatWidgetContainer className={theme}>
      <Chat
        title={assistant.name}
        description={assistant.description}
        image={assistant.image}
        startTime={session.current?.startTime}
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
    </ChatWidgetContainer>
  );
};

export default ChatWidget;
