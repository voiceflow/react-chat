import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Assistant, Listeners, PostMessage, RuntimeOptions, SessionOptions, SessionStatus, useTheme } from '@/common';
import { Chat, SystemResponse, UserResponse } from '@/components';
import { RuntimeContext, RuntimeProvider } from '@/contexts';
import { TurnType } from '@/types';

import { ChatWindowContainer } from './styled';
import { sendMessage } from './utils';

const ChatWindow: React.FC<{ assistant: Assistant }> = ({ assistant }) => {
  const runtime = useContext(RuntimeContext)!;

  // emitters
  const close = useCallback(() => sendMessage({ type: PostMessage.Type.CLOSE }), []);

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

  const closeAndEnd = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    close();
  }, []);

  const theme = useTheme(assistant);

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
        onEnd={closeAndEnd}
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
                avatar={assistant.avatar}
                isLast={turnIndex === runtime.session.turns.length - 1}
              />
            ))
            .exhaustive()
        )}
        {runtime.indicator && <SystemResponse.Indicator avatar={assistant.avatar} />}
      </Chat>
    </ChatWindowContainer>
  );
};

const ChatWindowContext: React.FC<RuntimeOptions & { session: SessionOptions; assistant: Assistant }> = ({ assistant, ...config }) => {
  const saveSession = useCallback((session: SessionOptions) => sendMessage({ type: PostMessage.Type.SAVE_SESSION, payload: session }), []);

  return (
    <RuntimeProvider {...config} saveSession={saveSession}>
      <ChatWindow assistant={assistant} />
    </RuntimeProvider>
  );
};

export default Object.assign(ChatWindowContext, { sendMessage });
