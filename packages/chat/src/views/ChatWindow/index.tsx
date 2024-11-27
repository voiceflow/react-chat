import '../../styles.css';

import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { NewChat, SystemResponse } from '@/components';
import { chatContentWrapper } from '@/components/NewChat/NewChat.css';
import Indicator from '@/components/SystemResponse/Indicator/Indicator';
import { UserResponse } from '@/components/UserResponse';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { usePalette } from '@/hooks/usePalette';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

export interface ChatWindowProps {
  className?: string;
  isMobile?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ isMobile }) => {
  const runtime = useContext(RuntimeStateAPIContext);
  const state = useContext(RuntimeStateContext);
  const { assistant, config } = runtime;
  const palette = usePalette(assistant);

  // emitters
  const restartChat = useCallback((): void => {
    runtime.setStatus(SessionStatus.ENDED);
    runtime.stopChat();
  }, []);

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  if (!palette) return null;

  return (
    <NewChat.Container isMobile={isMobile} palette={palette}>
      <NewChat
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        avatar={assistant.avatar}
        showPoweredBy={assistant.watermark}
        startTime={state.session.startTime}
        hasEnded={runtime.isStatus(SessionStatus.ENDED)}
        isLoading={runtime.isStatus(SessionStatus.IDLE) && state.session.turns.length === 0 && config.autostart}
        onStart={runtime.launch}
        onEnd={restartChat}
        onSend={runtime.reply}
        onMinimize={runtime.close}
        audioInterface={assistant.audioInterface}
        messageInputProps={{
          onSubmit: runtime.reply,
          audioInterface: assistant.audioInterface,
        }}
        isMobile={isMobile}
      >
        {state.session.turns.map((turn, turnIndex) => {
          return match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => {
              return (
                <UserResponse
                  {...R.omit(props, ['type'])}
                  key={id}
                  isLast={turnIndex === state.session.turns.length - 1}
                />
              );
            })
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                avatar={assistant.avatar}
                feedback={{
                  onClick: (feedback: FeedbackName) => {
                    runtime.feedback(feedback, props.messages, getPreviousUserTurn(turnIndex));
                  },
                }}
                isLast={turnIndex === state.session.turns.length - 1}
              />
            ))
            .exhaustive();
        })}
        {state.indicator && (
          <div className={chatContentWrapper}>
            <Indicator avatar={assistant.avatar} isLast={true} />
          </div>
        )}
      </NewChat>
    </NewChat.Container>
  );
};
