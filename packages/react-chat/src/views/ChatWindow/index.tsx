import '../../styles.css';

import React, { useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { SessionStatus } from '@/common';
import { Chat, SystemResponse, UserResponse } from '@/components';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { TurnType, UserTurnProps } from '@/types';

import { ChatWindowContainer } from './styled';

export interface ChatWindowProps {
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant } = runtime;
  const { autostart } = state;

  const [initialRender, setInitialRender] = useState(true);

  // emitters
  const closeAndEnd = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.close();
  }, []);

  useLayoutEffect(() => {
    if (!initialRender) return;

    // on first render if autostart is true, start the conversation
    if (!autostart) {
      runtime.setStatus(SessionStatus.ENDED);
    } else {
      runtime.launch();
    }
    setInitialRender(false);
  }, [initialRender, runtime, autostart]);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  return (
    <ChatWindowContainer className={className}>
      <Chat
        autostart={initialRender && autostart}
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        avatar={assistant.avatar}
        withWatermark={assistant.watermark}
        startTime={state.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={!state.session.turns.length}
        onStart={runtime.launch}
        onEnd={closeAndEnd}
        onSend={runtime.reply}
        onMinimize={runtime.close}
      >
        {!(initialRender && autostart) &&
          state.session.turns.map((turn, turnIndex) =>
            match(turn)
              .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
              .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
                <SystemResponse
                  key={id}
                  {...R.omit(props, ['type'])}
                  feedback={
                    assistant.feedback
                      ? {
                          onClick: (feedback: FeedbackName) => {
                            runtime.feedback(feedback, props.messages, getPreviousUserTurn(turnIndex));
                          },
                        }
                      : undefined
                  }
                  avatar={assistant.avatar}
                  isLast={turnIndex === state.session.turns.length - 1}
                />
              ))
              .exhaustive()
          )}
        {state.indicator && <SystemResponse.Indicator avatar={assistant.avatar} />}
      </Chat>
    </ChatWindowContainer>
  );
};

export default Object.assign(ChatWindow, { Container: ChatWindowContainer });
