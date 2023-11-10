import '../../styles.css';

import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { SessionStatus, useTheme } from '@/common';
import { Chat, SystemResponse, UserResponse } from '@/components';
import { RuntimeContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { TurnType, UserTurnProps } from '@/types';

import { ChatWindowContainer } from './styled';

const ChatWindow: React.FC = () => {
  const runtime = useContext(RuntimeContext);
  const { assistant } = runtime;

  // emitters
  const closeAndEnd = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.close();
  }, []);

  const theme = useTheme(assistant);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = runtime.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [runtime.session.turns]
  );

  return (
    <ChatWindowContainer className={theme}>
      <Chat
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        avatar={assistant.avatar}
        withWatermark={assistant.watermark}
        startTime={runtime.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={!runtime.session.turns.length}
        onStart={runtime.launch}
        onEnd={closeAndEnd}
        onSend={runtime.reply}
        onMinimize={runtime.close}
      >
        {runtime.session.turns.map((turn, turnIndex) =>
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

export default Object.assign(ChatWindow, { Container: ChatWindowContainer });
