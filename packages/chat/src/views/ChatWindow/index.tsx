import '../../styles.css';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { NewChat, SystemResponse } from '@/components';
import { UserResponse } from '@/components/UserResponse';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { usePalette } from '@/hooks/usePalette';
import { PALETTE } from '@/styles/colors.css';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

import { chatWindow } from './styles.css';

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
    <div style={assignInlineVars(PALETTE, { colors: palette })} className={chatWindow({ mobile: isMobile })}>
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
        }}
        isMobile={isMobile}
      >
        {state.session.turns.map((turn, turnIndex) => {
          return match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => {
              return (
                <UserResponse
                  {...R.omit(props, ['type'])}
                  isFirst={turnIndex === 0}
                  hasAvatar={!!assistant.avatar}
                  key={id}
                />
              );
            })
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                avatar={assistant.avatar}
                isFirst={turnIndex === 0}
                feedback={
                  assistant.feedback
                    ? {
                        onClick: (feedback: FeedbackName) => {
                          runtime.feedback(feedback, props.messages, getPreviousUserTurn(turnIndex));
                        },
                      }
                    : undefined
                }
                isLast={turnIndex === state.session.turns.length - 1}
              />
            ))
            .exhaustive();
        })}
      </NewChat>
    </div>
  );
};
