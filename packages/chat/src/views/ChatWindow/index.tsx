/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../styles.css';

import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { NewChat, SystemResponse, UserResponse } from '@/components';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

import { ChatWindowContainer } from './styled';

export interface ChatWindowProps {
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant, config } = runtime;

  // emitters
  const closeAndEnd = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.close();
  }, []);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  return (
    <ChatWindowContainer className={className}>
      <NewChat
        title={assistant.title}
        image={assistant.image}
        description={assistant.description}
        avatar={assistant.avatar}
        showPoweredBy={assistant.watermark}
        messageInputProps={{
          message: '',
          onValueChange: () => {},
          onSubmit: () => {},
        }}
        /*
        startTime={state.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={runtime.isStatus(SessionStatus.IDLE) && state.session.turns.length === 0 && config.autostart}
        onStart={runtime.launch}
        onEnd={closeAndEnd}
        onSend={runtime.reply}
        onMinimize={runtime.close}
        */
      >
        {/*
        {state.session.turns.map((turn, turnIndex) =>
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
        */}
        {/* state.indicator && <SystemResponse.Indicator avatar={assistant.avatar} /> */}
      </NewChat>
    </ChatWindowContainer>
  );
};

export default Object.assign(ChatWindow, { Container: ChatWindowContainer });
