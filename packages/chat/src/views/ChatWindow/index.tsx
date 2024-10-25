/* eslint-disable @typescript-eslint/no-unused-vars */
import '../../styles.css';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import React, { useCallback, useContext } from 'react';
import * as R from 'remeda';
import { match } from 'ts-pattern';

import { Header, NewChat, NewFooter, SystemResponse, UserMessage, UserResponse, WelcomeMessage } from '@/components';
import { RuntimeStateAPIContext, RuntimeStateContext } from '@/contexts/RuntimeContext';
import type { FeedbackName } from '@/contexts/RuntimeContext/useRuntimeAPI';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';
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

  const [newMessage, setNewMessage] = React.useState('');

  const getPreviousUserTurn = useCallback(
    (turnIndex: number): UserTurnProps | null => {
      const turn = state.session.turns[turnIndex - 1];
      return turn?.type === TurnType.USER ? turn : null;
    },
    [state.session.turns]
  );

  const handleUserReply = (): void => {
    runtime.reply(newMessage);
  };

  return (
    <div style={assignInlineVars(PALETTE, { colors: createPalette(assistant.color) })}>
      <NewChat
        title={assistant.title}
        description={assistant.description}
        image={assistant.image}
        turns={state.session.turns}
        avatar={assistant.avatar}
        messageInputProps={{
          message: newMessage,
          onValueChange: setNewMessage,
          onSubmit: handleUserReply,
        }}
      />
    </div>
  );
};

export default Object.assign(ChatWindow, { Container: ChatWindowContainer });

// {/* <NewChat
//   title={assistant.title}
//   image={assistant.image}
//   description={assistant.description}
//   avatar={assistant.avatar}
//   showPoweredBy={false}
//   messageInputProps={{
//     message: '',
//     onValueChange: () => {},
//     onSubmit: () => {},
//   }}
//   messages={state.session.turns}
//   /*
//   startTime={state.session.startTime}
//   hasEnded={runtime.isStatus(SessionStatus.ENDED)}
//   isLoading={runtime.isStatus(SessionStatus.IDLE) && state.session.turns.length === 0 && config.autostart}
//   onStart={runtime.launch}
//   onEnd={closeAndEnd}
//   onMinimize={runtime.close}
//   */
// // > */}
