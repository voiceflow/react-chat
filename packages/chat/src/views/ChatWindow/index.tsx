/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../styles.css';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Header, NewChat, NewFooter, SystemResponse, UserMessage, WelcomeMessage } from '@/components';
import { UserResponse } from '@/components/UserResponse';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
import type { UserTurnProps } from '@/types';
import { SessionStatus, TurnType } from '@/types';

export interface ChatWindowProps {
  className?: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
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
    <div style={assignInlineVars(PALETTE, { colors: createPalette(assistant.color) })} className={className}>
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
        onEnd={closeAndEnd}
        onSend={runtime.reply}
        onMinimize={runtime.close}
        audioInterface={assistant.audioInterface}
        messageInputProps={{
          onSubmit: runtime.reply,
        }}
      >
        {state.session.turns.map((turn, turnIndex) =>
          match(turn)
            .with({ type: TurnType.USER }, ({ id, ...props }) => <UserResponse {...R.omit(props, ['type'])} key={id} />)
            .with({ type: TurnType.SYSTEM }, ({ id, ...props }) => (
              <SystemResponse
                key={id}
                {...R.omit(props, ['type'])}
                avatar={assistant.avatar}
                isLast={turnIndex === state.session.turns.length - 1}
              />
            ))
            .exhaustive()
        )}
      </NewChat>
    </div>
  );
};
