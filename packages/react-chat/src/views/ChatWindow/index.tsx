import React, { useCallback, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Assistant, ChatConfig, Listeners, PostMessage, SessionOptions, SessionStatus, useTheme } from '@/common';
import { Chat, SystemResponse, UserResponse } from '@/components';
import { useRuntime } from '@/hooks';
import { TurnType } from '@/types';

import { ChatWindowContainer } from './styled';
import { sendMessage } from './utils';

const ChatWindow: React.FC<ChatConfig & { assistant: Assistant; session: SessionOptions }> = (config) => {
  const { assistant, versionID, verify, url, session } = config;

  const [hasAnimated, setHasAnimated] = useState<Record<string, true>>(session.turns?.reduce((acc, turn) => ({ ...acc, [turn.id]: true }), {}) ?? {});

  // emitters
  const close = useCallback(() => sendMessage({ type: PostMessage.Type.CLOSE }), []);
  const saveSession = useCallback((session: SessionOptions) => sendMessage({ type: PostMessage.Type.SAVE_SESSION, payload: session }), []);

  const runtime = useRuntime({ versionID, verify, url, session, saveSession });

  // listeners
  Listeners.useListenMessage(PostMessage.Type.INTERACT, ({ payload }) => runtime.interact(payload));
  Listeners.useListenMessage(PostMessage.Type.OPEN, async (): Promise<void> => {
    if (runtime.isStatus(SessionStatus.IDLE)) {
      await handleStart();
    }
  });

  const handleStart = async (): Promise<void> => {
    await runtime.launch();
  };

  const handleEnd = (): void => {
    runtime.setStatus(SessionStatus.ENDED);
    close();
  };

  const handleAnimationEnd = (id: string) => (): void => {
    setHasAnimated((prev) => ({ ...prev, [id]: true }));
  };

  const theme = useTheme(config.assistant);

  return (
    <ChatWindowContainer className={theme}>
      <Chat
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        avatar={assistant.avatar}
        watermark={assistant.watermark}
        startTime={runtime.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={!runtime.session.turns.length}
        onStart={handleStart}
        onEnd={handleEnd}
        onSend={runtime.reply}
        onMinimize={close}
      >
        {runtime.session.turns.map((turn, turnIndex) =>
          match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                send={runtime.send}
                avatar={assistant.avatar}
                isLast={turnIndex === runtime.session.turns.length - 1}
                isLive={!runtime.isStatus(SessionStatus.ENDED) && !hasAnimated[id]}
                onAnimationEnd={handleAnimationEnd(id)}
              />
            ))
            .exhaustive()
        )}
        {runtime.indicator && <SystemResponse.Indicator avatar={assistant.avatar} />}
      </Chat>
    </ChatWindowContainer>
  );
};

export default Object.assign(ChatWindow, { sendMessage });
